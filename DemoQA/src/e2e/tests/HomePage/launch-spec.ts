import { browser } from "protractor";
import { W } from "protractor-beautiful-reporter";
import { CommonPageObjects } from "../../pageObjects/CommonPageObjects";
import { CommonUtils } from "../../utils/CommonFunctionsUtils"
import { WaitUtils } from '../../utils/WaitUtils';

describe('DEMO QA App Launch', function () {

  let originalTimeout;
  let commonPO = new CommonPageObjects();
  let commonUtils = new CommonUtils();

  beforeAll(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('Environment data', async function(){
    console.log('Application URL is: '+process.env.URL);
    console.log('Random number generated is: '+browser.params.randomNumData.randomNum);
  })

  it('Launch the application', async function () {
    commonUtils.navigateToHomepage(process.env.URL);
    await browser.driver.manage().window().maximize();
    browser.sleep(500);
  });

  // it('Go to Elements section', async function () {
  //   await commonUtils.clickElement(commonPO.getCardByLabel("Elements"));
  // });

  // it('Test Wait', async function () {
  //   await browser.sleep(5000);
  // });

  // it('Test Wait', async function () {
  //   await browser.sleep(5000);
  // });

});