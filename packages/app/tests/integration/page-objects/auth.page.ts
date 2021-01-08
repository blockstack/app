import { Page, BrowserContext } from 'playwright-core';
import { createTestSelector, wait } from '../utils';

export class AuthPage {
  static url = 'http://localhost:8081';
  page: Page;
  $buttonCopySecretKey = createTestSelector('button-copy-secret-key');
  $buttonHasSavedSeedPhrase = createTestSelector('button-has-saved-seed-phrase');
  $inputUsername = createTestSelector('input-username');
  $buttonUsernameContinue = createTestSelector('button-username-continue');
  $textareaReadOnlySeedPhrase = createTestSelector('textarea-seed-phrase');
  $buttonConfirmReenterSeedPhrase = createTestSelector('button-confirm-reenter-seed-phrase');
  $textareaSeedPhraseInput = createTestSelector('textarea-reinput-seed-phrase');
  $buttonConnectFlowFinished = createTestSelector('button-connect-flow-finished');
  $buttonSignInKeyContinue = createTestSelector('sign-in-key-continue');
  $signInKeyError = createTestSelector('sign-in-seed-error');
  $firstAccount = createTestSelector('account-index-0');
  onboardingSignIn = '#onboarding-sign-in';
  eightCharactersErrMsg =
    'text="Your username should be at least 8 characters, with a maximum of 37 characters."';
  lowerCharactersErrMsg =
    'text="You can only use lowercase letters (a–z), numbers (0–9), and underscores (_)."';
  iHaveSavedIt = 'text="I\'ve saved it"';
  passwordInput = '//input[@type="password"]';
  addNewAccountLink = '//span[text()="Add a new account"]';
  invalidSecretKey = 'text="The Secret Key you\'ve entered is invalid"';
  incorrectPassword = 'text="Incorrect password"';
  confirmContinue = createTestSelector('confirm-continue-app');
  passwordField = createTestSelector('onboarding-password');
  confirmPasswordButton = createTestSelector('button-has-set-password');

  continueBtn = 'text="Continue"';

  constructor(page: Page) {
    this.page = page;
  }

  static async getAuthPage(context: BrowserContext, signUp = true) {
    const page = await this.recursiveGetAuthPage(context);
    if (!page) {
      await context.pages()[0].screenshot({ path: `tests/screenshots/no-auth-page-found.png` });
      throw new Error('Unable to get auth page popup');
    }
    const authPage = new this(page);
    await page.waitForSelector(createTestSelector('screen'));
    if (signUp) {
      await page.waitForSelector(authPage.$textareaReadOnlySeedPhrase, { timeout: 15000 });
    }
    return authPage;
  }

  /**
   * Due to flakiness of getting the pop-up page, this has some 'retry' logic
   */
  static async recursiveGetAuthPage(context: BrowserContext, attempt = 1): Promise<Page> {
    const pages = context.pages();
    const page = pages.find(p => p.url().includes(this.url));
    if (!page) {
      if (attempt > 3) {
        throw new Error('Unable to get auth page popup');
      }
      await wait(50);
      return this.recursiveGetAuthPage(context, attempt + 1);
    }
    return page;
  }

  async saveSecretPhrase() {
    await this.page.waitForSelector(this.$textareaReadOnlySeedPhrase);
    await wait(3000);
    await this.screenshot(`save-secret-phrase-${new Date().getTime()}`);
    const $secretKeyEl = await this.page.$(this.$textareaReadOnlySeedPhrase);
    if (!$secretKeyEl) {
      throw 'Could not find secret key field';
    }
    const secretKey = (await this.page.$eval(
      this.$textareaReadOnlySeedPhrase,
      (el: HTMLTextAreaElement) => el.value
    )) as string;
    if (!secretKey) throw 'Unable to get secret key';
    // const secretKey = (await this.page.$eval(this.$textareaReadOnlySeedPhrase, element => element.value)) as string;
    await this.page.click(this.$buttonCopySecretKey);
    await this.page.waitForSelector(this.$buttonHasSavedSeedPhrase);
    await this.page.click(this.$buttonHasSavedSeedPhrase);
    return secretKey;
  }

  async setUserName(text: string) {
    await this.page.waitForSelector(this.$inputUsername);
    await this.page.type(this.$inputUsername, text);
    await this.page.click(this.$buttonUsernameContinue);
  }

  async screenshot(name = 'screenshot') {
    await this.page.screenshot({ path: `tests/screenshots/${name}.png` });
  }

  async loginWithPreviousCreatedUser(text: string) {
    await this.page.click(`//span[text()="${text}"]`);
  }

  // async createNewAccount(username: string) {
  //   await this.page.click(this.addNewAccountLink);
  //   await this.setUserName(username);
  // }

  async loginWithPreviousSecretKey(secretKey: string) {
    await this.page.type('textarea', secretKey);
    await this.page.click(this.$buttonSignInKeyContinue);
  }

  async setPassword(password: string) {
    await this.page.type(this.passwordInput, password);
    await this.page.click(this.continueBtn);
  }

  async confirmContinueToApp() {
    await this.page.click(this.confirmContinue, { force: true });
  }

  chooseAccount(username: string) {
    return this.page.click(`[data-test="account-${username}"]`);
  }

  async clickIHaveSavedIt() {
    let error;
    await this.page.waitForSelector(this.iHaveSavedIt, { timeout: 3000 }).catch(e => (error = e));
    if (error == null) {
      await this.page.click(this.iHaveSavedIt);
    }
  }

  async enterPassword() {
    await this.page.fill(this.passwordField, 'mysecretpassword');
    await this.page.click(this.confirmPasswordButton);
  }
}
