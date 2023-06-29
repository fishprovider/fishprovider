import { TrendbarPeriod } from '@fishbot/ctrader/constants/openApi';
import type { ProviderType } from '@fishbot/utils/constants/account';
import type { Bar } from '@fishbot/utils/types/Bar.model';
import _ from 'lodash';

import type { BarCTrader } from '~types/Bar.model';

import { periods } from './tasks';

const periodTexts = _.invert(TrendbarPeriod);

const updateBar = async (
  providerType: ProviderType,
  symbol: string,
  bar: BarCTrader,
) => {
  const {
    period, startAt, timestamp,
    volume,
    low,
    high,
    open,
    close,
  } = bar;
  if (!period) {
    Logger.debug('Invalid bar', period);
    return;
  }

  const periodText = periodTexts[period];
  if (!periodText || !periods.includes(periodText)) {
    Logger.debug('Invalid period', periodText);
    return;
  }

  const _id = `${providerType}_${symbol}_${periodText}_${timestamp}`;

  const barToUpdate = {
    providerType,
    symbol,
    period: periodText,
    periodId: period,
    startAt: startAt || new Date(),
    volume,
    low,
    high,
    open,
    close,
  };

  await Mongo.collection<Bar>('bars').updateOne(
    { _id },
    {
      $set: {
        ...barToUpdate,
        'providerData.source.Spot': new Date(),
      },
    },
    { upsert: true },
  );
};

export {
  updateBar,
};
