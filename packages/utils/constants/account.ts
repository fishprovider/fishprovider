enum ProviderType {
  myfxbook = 'myfxbook',
  icmarkets = 'icmarkets',
  exness = 'exness',
  roboforex = 'roboforex',
  alpari = 'alpari',
}

enum ProviderPlatform {
  ctrader = 'ctrader',
  metatrader = 'metatrader',
  fishct = 'fishct',
}

enum ProviderTradeType {
  demo = 'demo',
  live = 'live',
}

enum ProviderViewType {
  private = 'private',
  public = 'public',
}

enum PlanType {
  pairs = 'pairs',

  maxLotTotal = 'maxLotTotal',
  maxLotOrder = 'maxLotOrder', // for each order, e.g. 0.1 lot
  maxLotPair = 'maxLotPair', // for all orders of a pair, e.g. 0.5 AUDUSD
  maxLotPairs = 'maxLotPairs',

  stopLoss = 'stopLoss',
  takeProfit = 'takeProfit',
  minTakeProfit = 'minTakeProfit',
  stepTakeProfit = 'stepTakeProfit',
  limitOnly = 'limitOnly',

  dayMaxBddLock = 'dayMaxBddLock',
  dayMaxEddLock = 'dayMaxEddLock',
  lostSeriesPairLock = 'lostSeriesPairLock',

  monthTargetLock = 'monthTargetLock',
  levelTargetsLock = 'levelTargetsLock', // { level: number, target: number, resetOnPass: bool } => activeLevelTarget
  parentLevelTargetLock = 'parentLevelTargetLock',

  profitOffset = 'profitOffset',
}

enum CopyVolumeMode {
  auto = 'auto',
  fixedRatio = 'fixedRatio',
  fixedLot = 'fixedLot',
  autoWithRatio = 'autoWithRatio',
}

enum LockType {
  open = 'open',
  update = 'update',
  close = 'close',
  pairs = 'pairs',
}

export {
  CopyVolumeMode,
  LockType,
  PlanType,
  ProviderPlatform,
  ProviderTradeType,
  ProviderType,
  ProviderViewType,
};
