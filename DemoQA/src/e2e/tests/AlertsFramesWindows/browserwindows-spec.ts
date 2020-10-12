import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {AlertFrameWindowPages} from '../../pageObjects/AlertsFramesWindows/AlertFrameWindowPages';
import { browser } from "protractor";
import { exec } from "child_process";

describe('ALERTS, FRAME & WINDOWS -> ALERTS', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let windowObjects = AlertFrameWindowPages.getAllPageObjects().browserWindowScreenObj;
  let dataJson = require('../../../../e2e/testData/AlertsFramesWindows/browserwindows.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Alerts, Frame & Windows" section', async function () {
    await commonUtils.elementCheckAndClick(windowObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(windowObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(windowObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Browser Window option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(windowObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(windowObjects.mainHeader, dataJson.pageHeader);
  });

  it('Navigate to new tab by clicking New Tab button', async function () {
    await commonUtils.elementCheckAndClick(windowObjects.newTabBtn);
    await commonUtils.switchToNewTabOrWindow();
  });

  it('Validate new tab page header', async function () {
    await commonUtils.validateElementText(windowObjects.newTabOrWindowHeader, dataJson.newTabHeader)
  });

  it('Close New Tab and get back to parent tab', async function () {
    await commonUtils.closeCurrentTabOrWindow();
  });

  it('Navigate to new window by clicking New Window button', async function () {
    await commonUtils.elementCheckAndClick(windowObjects.newWindowBtn);
    await commonUtils.switchToNewTabOrWindow();
  });

  it('Validate new window page header', async function () {
    await commonUtils.validateElementText(windowObjects.newTabOrWindowHeader, dataJson.newWindowHeader)
  });

  it('Close New Window and get back to parent tab', async function () {
    await commonUtils.closeCurrentTabOrWindow();
  });

  it('Navigate to new window by clicking New Window Message button', async function () {
    await commonUtils.elementCheckAndClick(windowObjects.newWindowMsgBtn);
    await commonUtils.switchToNewTabOrWindow();
  });

  xit('Validate new window text message ', async function () {
    await commonUtils.validateElementText(windowObjects.newWindowMessage, dataJson.newWindowMsgText)
  });

  it('Close New Window Message and get back to parent tab', async function () {
    await commonUtils.closeCurrentTabOrWindow();
  });

});
