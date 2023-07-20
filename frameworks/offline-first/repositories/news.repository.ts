import type { GetNewsRepositoryParams, NewsRepository } from '@fishprovider/application-rules';
import { FishApiNewsRepository } from '@fishprovider/framework-fish-api';
import { LocalNewsRepository } from '@fishprovider/framework-local';

async function getNews(params: GetNewsRepositoryParams) {
  let news = await LocalNewsRepository.getNews(params);
  if (!news) {
    news = await FishApiNewsRepository.getNews(params);
  } else {
    // non-blocking
    FishApiNewsRepository.getNews(params);
    // set Local
    // set Store
  }
  return news;
}

export const OfflineFirstNewsRepository: NewsRepository = {
  getNews,
};
