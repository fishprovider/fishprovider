import type { CallbackPayload } from '@fishprovider/ctrader/dist/types/Event.model';
import { getSymbols, savePrice } from '@fishprovider/swap/dist/utils/price';
import type { ProviderType } from '@fishprovider/utils/dist/constants/account';
import { isLastRunExpired } from '@fishprovider/utils/dist/helpers/lastRunChecks';

import { setLastUpdated } from '~services/checkCTrader';

const runs = {};

const handleEventPrice = async (
  providerType: ProviderType,
  payload: CallbackPayload,
) => {
  const { symbolId, bid, ask } = payload;
  try {
    if (
      !isLastRunExpired({
        runs,
        runId: symbolId,
        timeUnit: 'seconds',
        timeAmt: 5,
        checkIds: [],
      })
    ) return 1;

    const { symbolIds } = await getSymbols(providerType);
    const symbol = symbolIds[symbolId]?.symbol;
    if (!symbol) {
      // Logger.warn(`[event-price] Symbol not found ${symbolId}`);
      return 3;
    }

    const bidPrice = +bid || +ask;
    const askPrice = +ask || +bid;
    const last = (bidPrice + askPrice) / 2;

    const price = {
      _id: `${providerType}-${symbol}`,
      last,
      time: Date.now(),
      bid: bidPrice || last,
      ask: askPrice || last,
    };

    await savePrice(providerType, symbol, price);

    setLastUpdated();
    return 1;
  } catch (err) {
    Logger.error('Failed to handleEventPrice', err);
    return 2;
  }
};

export default handleEventPrice;
