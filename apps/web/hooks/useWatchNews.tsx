import { getNewsController } from '@fishprovider/adapter-frontend';
import { getNewsUseCase } from '@fishprovider/application-rules';
import storeUser from '@fishprovider/cross/dist/stores/user';
import { OfflineFirstNewsRepository } from '@fishprovider/framework-offline-first';
import { StoreNewsRepository } from '@fishprovider/framework-store';
import _ from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';

const bannerIdBigNews = 'BigNews';
const bannerIdBigNewsNear = 'BigNewsNear';

const getNews = getNewsController(getNewsUseCase(OfflineFirstNewsRepository));
const storeGetNews = getNewsController(getNewsUseCase(StoreNewsRepository));

export default function useWatchNews() {
  const getBigNews = async () => {
    const news = await getNews({
      payload: {
        upcoming: true,
      },
    });
    if (news.length) {
      storeUser.mergeState({
        banners: {
          ...storeUser.getState().banners,
          [bannerIdBigNews]: true,
        },
      });
    }

    const allNews = await storeGetNews({
      payload: {},
    });
    const hasBigNews = _.some(
      allNews,
      ({ impact, datetime }) => ['high', 'medium'].includes(impact)
        && moment(datetime) > moment().subtract(1, 'hour')
        && moment(datetime) < moment().add(1, 'hour'),
    );
    if (hasBigNews) {
      storeUser.mergeState({
        banners: {
          ...storeUser.getState().banners,
          [bannerIdBigNewsNear]: true,
        },
      });
    }
  };

  useEffect(() => {
    getBigNews();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getBigNews();
    }, 1000 * 60 * 5); // 5 mins
    return () => {
      clearInterval(intervalId);
    };
  }, []);
}
