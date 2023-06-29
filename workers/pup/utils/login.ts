import { gotoAttempt, newBrowser, newPage } from '~libs/pup';

const env = {
  nodeEnv: process.env.NODE_ENV,
  pupProduct: process.env.PUPPETEER_PRODUCT || 'chrome',
};

const login = async (config: {
  user: string,
  pass: string,
  headless?: boolean
}) => {
  const { user, pass, headless } = config;

  const browser = await newBrowser(
    env.nodeEnv === 'development' ? false : headless !== false,
    env.pupProduct,
  );
  try {
    const page = await newPage(browser);

    Logger.info(`[pup] Logging in with ${user}`);

    await gotoAttempt(async (isRetried) => {
      if (isRetried) await page.reload();
      else {
        await page.goto('https://ct.icmarkets.com/automate', {
          waitUntil: 'networkidle2',
          timeout: 0,
        });
      }
      await page.waitForSelector('[data-test-id=signin-tab]', { visible: true });
    });
    Logger.debug('[pup] Login page loaded');

    await page.click('[data-test-id=signin-tab]');
    await page.waitForSelector('[data-test-id=checkbox-label]', { visible: true });

    await page.type('input[type=text]', user);
    await page.type('input[type=password]', pass);
    await page.click('button[type=submit]');
    await page.waitForNavigation({ waitUntil: ['networkidle2'] });

    Logger.info(`[pup] Logged in with ${user}`);
    return { browser, page };
  } catch (error) {
    await browser.close();
    throw error;
  }
};

export default login;
