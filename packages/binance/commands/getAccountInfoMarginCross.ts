import type { ConnectionType } from '~types/Connection.model';
import { sendRequest } from '~utils/url';

async function getAccountInfoMarginCross(connection: ConnectionType) {
  const data = await sendRequest({
    url: 'https://api.binance.com/sapi/v1/margin/account?timestamp={{timestamp}}&signature={{signature}}',
    clientId: connection.clientId,
    clientSecret: connection.clientSecret,
  });
  /*
  {
    "borrowEnabled": true,
    "marginLevel": "11.64405625",
    "totalAssetOfBtc": "6.82728457",
    "totalLiabilityOfBtc": "0.58633215",
    "totalNetAssetOfBtc": "6.24095242",
    "tradeEnabled": true,
    "transferEnabled": true,
    "userAssets": [
      {
        "asset": "BTC",
        "borrowed": "0.00000000",
        "free": "0.00499500",
        "interest": "0.00000000",
        "locked": "0.00000000",
        "netAsset": "0.00499500"
      },
      {
        "asset": "BNB",
        "borrowed": "201.66666672",
        "free": "2346.50000000",
        "interest": "0.00000000",
        "locked": "0.00000000",
        "netAsset": "2144.83333328"
      },
      {
        "asset": "ETH",
        "borrowed": "0.00000000",
        "free": "0.00000000",
        "interest": "0.00000000",
        "locked": "0.00000000",
        "netAsset": "0.00000000"
      },
      {
        "asset": "USDT",
        "borrowed": "0.00000000",
        "free": "0.00000000",
        "interest": "0.00000000",
        "locked": "0.00000000",
        "netAsset": "0.00000000"
      }
    ]
  }
  */
  return {
    ...data,
    marginLevel: +data.marginLevel,
    totalAssetOfBtc: +data.totalAssetOfBtc,
    totalLiabilityOfBtc: +data.totalLiabilityOfBtc,
    totalNetAssetOfBtc: +data.totalNetAssetOfBtc,
    userAssets: data.userAssets?.filter((item: any) => +item.netAsset)
      .map((item: any) => ({
        ...item,
        borrowed: +item.borrowed,
        free: +item.free,
        interest: +item.interest,
        locked: +item.locked,
        netAsset: +item.netAsset,
      })),
  };
}

export default getAccountInfoMarginCross;
