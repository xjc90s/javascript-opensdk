// Copyright 2021 TestProject (https://testproject.io)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { assert } from 'chai';
import { Capabilities } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

import LoginPage from '../../pageobjects/web/loginPage';
import ProfilePage from '../../pageobjects/web/profilePage';

import ConfigHelper from '../../../src/sdk/internal/helpers/configHelper';
import ThenableBaseDriver from '../../../src/sdk/drivers/base/thenableBaseDriver';
import Builder from '../../../src/sdk/drivers/builder';

describe('Login and update profile', () => {
  let driver: ThenableBaseDriver;
  let login: LoginPage;
  let profilePage: ProfilePage;

  beforeEach(() => {
    const chromeOptions = new Options();
    chromeOptions.headless();
    driver = new Builder()
      .forBrowser('chrome')
      .withToken(ConfigHelper.developerToken())
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(chromeOptions)
      .withProjectName('CI - Nodejs')
      .build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should return success if update profile succeeds John Smith', async () => {
    login = new LoginPage(driver);
    await login.OpenUrl();
    await login.LoginAs('John Smith', '12345');
    profilePage = new ProfilePage(driver);
    await profilePage.UpdateProfile('Australia', 'Main Street 123', 'john@smith.org', '+1987654321');
    assert.equal(await profilePage.SavedMessageIsDisplayed(), true);
  });

  it('should return success if update profile succeeds Bob Jones', async () => {
    login = new LoginPage(driver);
    await login.OpenUrl();
    await login.LoginAs('Bob Jones', '12345');
    profilePage = new ProfilePage(driver);
    await profilePage.UpdateProfile('Canada', 'Maple Street 456', 'bob@jones.org', '+1123456789');
    assert.equal(await profilePage.SavedMessageIsDisplayed(), true);
  });
});
