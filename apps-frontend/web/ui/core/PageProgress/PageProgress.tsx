import {
  completeNavigationProgress, NavigationProgress, startNavigationProgress,
} from '@mantine/nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getUserInfoController } from '~controllers/user.controller';
import { pageView } from '~libs/analytics';

function PageProgress() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      startNavigationProgress();
    };

    const handleRouteChangeEnd = (url: string) => {
      const user = getUserInfoController().activeUser;
      pageView(url, user);
      completeNavigationProgress();
    };

    const handleRouteChangeError = (err: any) => {
      Logger.warn('Route change error', err);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return <NavigationProgress autoReset />;
}

export default PageProgress;
