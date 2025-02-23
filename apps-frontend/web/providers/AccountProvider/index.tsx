import { getRoleProvider } from '@fishprovider/core';

import { watchUserInfoController } from '~controllers/user.controller';
import StrategyProvider from '~providers/StrategyProvider';
import UserProvider from '~providers/UserProvider';

import AccountWatch from './AccountWatch';
import ActivityWatch from './ActivityWatch';

interface Props {
  providerId: string;
  children: React.ReactNode;
}

function AccountProvider({ providerId, children }: Props) {
  const roles = watchUserInfoController((state) => state.activeUser?.roles);

  const { isViewerAccount } = getRoleProvider(roles, providerId);

  Logger.debug('[render] AccountProvider', providerId);
  return (
    <UserProvider title="Account">
      {isViewerAccount && (
        <StrategyProvider providerId={providerId}>
          <AccountWatch providerId={providerId} />
          <ActivityWatch />
          {children}
        </StrategyProvider>
      )}
    </UserProvider>
  );
}

export default AccountProvider;
