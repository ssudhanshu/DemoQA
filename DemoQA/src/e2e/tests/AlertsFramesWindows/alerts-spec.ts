import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {AlertFrameWindowPages} from '../../pageObjects/AlertsFramesWindows/AlertFrameWindowPages';
import { browser } from "protractor";
import { exec } from "child_process";

describe('ALERTS, FRAME & WINDOWS -> ALERTS', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let alertObjects = AlertFrameWindowPages.getAllPageObjects().alertScreenObj;
  let dataJson = require('../../../../e2e/testData/AlertsFramesWindows/alerts.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Alerts, Frame & Windows" section', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(alertObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(alertObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Alerts option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(alertObjects.mainHeader, dataJson.pageHeader);
  });

  it('Validate alert: "Click Button to see alert" ', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.alertButton);
    await commonUtils.switchToAlert(true, 'You clicked a button');
  });

  it('Validate alert: "On button click, alert will appear after 5 seconds" ', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.alertTimerButton);
    await WaitUtils.wait(5000);
    await commonUtils.switchToAlert(true, 'This alert appeared after 5 seconds');
  });

  it('Validate alert: "On button click, confirm box will appear" ', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.alertConfirmButton);
    await commonUtils.switchToAlert(false, 'Do you confirm action?');
    expect(await alertObjects.fetchConfirmationResult.getText()).toEqual('You selected Cancel');

  });

  it('Validate alert: "On button click, prompt box will appear" ', async function () {
    await commonUtils.elementCheckAndClick(alertObjects.alertPromptButton);
    let alrtTxt = 'Shekhar';
    await commonUtils.switchToAlert(true, 'Please enter your name', alrtTxt);
    expect(await alertObjects.fetchPromptTxt.getText()).toEqual('You entered '+alrtTxt);
  });

});
