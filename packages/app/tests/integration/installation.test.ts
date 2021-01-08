import { environments, Browser, SECRET_KEY } from './utils';
import { InstallPage } from './page-objects/install.page';
import { BrowserContext } from 'playwright-core';
import { setupMocks } from './mocks';

jest.setTimeout(20_000);
environments.forEach(([browserType, deviceType]) => {
  const deviceLabel = deviceType
    ? ` - ${deviceType.viewport.height}x${deviceType.viewport.width}`
    : '';
  describe(`Installation integration tests - ${browserType.name()}${deviceLabel}`, () => {
    let browser: Browser;
    let context: BrowserContext;
    let installPage: InstallPage;
    let consoleLogs: string[];

    beforeAll(async () => {
      const launchArgs: string[] = [];
      if (browserType.name() === 'chromium') {
        launchArgs.push('--no-sandbox');
      }
      browser = await browserType.launch({
        args: launchArgs,
      });
      console.log('[DEBUG]: Launched puppeteer browser');
    });

    beforeEach(async () => {
      console.log('[DEBUG]: Starting new browser context.');
      if (deviceType) {
        context = await browser.newContext({
          viewport: deviceType.viewport,
          userAgent: deviceType.userAgent,
        });
      } else {
        context = await browser.newContext();
      }
      await setupMocks(context);
      consoleLogs = [];
      installPage = await InstallPage.init(context);
      installPage.page.on('console', event => {
        consoleLogs = consoleLogs.concat(event.text());
      });
    }, 10000);

    afterEach(async () => {
      try {
        if (context) await context.close();
      } catch (error) {}
    });

    afterAll(async () => {
      try {
        await browser.close();
      } catch (error) {}
    });

    it('should be able to sign up from installation page', async () => {
      await installPage.clickSignUp();
      await installPage.waitForFinishedPage();
      await installPage.goToSecretKey();
      await installPage.saveKey();
      const secretKey = await installPage.getSecretKey();
      expect(secretKey).not.toBeFalsy();
      expect(secretKey.split(' ').length).toEqual(12);
    });

    it('should be able to login from installation page', async () => {
      await installPage.clickSignIn();
      await installPage.loginWithPreviousSecretKey(SECRET_KEY);
      const secretKey = await installPage.getSecretKey();
      expect(secretKey).toEqual(SECRET_KEY);
    });
  });
});
