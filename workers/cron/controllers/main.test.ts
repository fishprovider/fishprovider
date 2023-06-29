import delay from '@fishbot/utils/helpers/delay';

import { destroy, start } from './main';

test('main', async () => {
  await start();
  await delay(1000);
  await destroy();
  await delay(1000);
});
