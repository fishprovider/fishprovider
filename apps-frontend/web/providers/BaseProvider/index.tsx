import dynamic from 'next/dynamic';

import { initialize as initServices } from './baseServices';

const ErrorBoundary = dynamic(() => import('./ErrorBoundary'));
const QueryProvider = dynamic(() => import('@fishprovider/cross/libs/query'));
const UserSetup = dynamic(() => import('./UserSetup'));
const BaseThemeProvider = dynamic(() => import('~ui/themes/BaseThemeProvider'));
const NotifProvider = dynamic(() => import('~ui/notif/NotifProvider'));
const ModalProvider = dynamic(() => import('~ui/modals/ModalProvider'));
const BaseLayout = dynamic(() => import('~layouts/BaseLayout'));

initServices();

interface Props {
  children: React.ReactNode;
}

function BaseProvider({ children }: Props) {
  Logger.debug('[render] BaseProvider');
  return (
    <ErrorBoundary>
      <QueryProvider>
        <BaseThemeProvider>
          <NotifProvider />
          <ModalProvider>
            <BaseLayout>
              {children}
            </BaseLayout>
          </ModalProvider>
          <UserSetup />
        </BaseThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default BaseProvider;
