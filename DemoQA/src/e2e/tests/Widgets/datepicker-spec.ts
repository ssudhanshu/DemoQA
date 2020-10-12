import { browser } from "protractor";
import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {WidgetsPages} from '../../pageObjects/Widgets/WidgetsPages';

describe('WIDGETS -> DATE PICKER', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let datepickerObjects = WidgetsPages.getAllPageObjects().datepickerScreenObj;
  let dataJson = require('../../../../e2e/testData/Widgets/datepicker.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Widgets" section', async function () {
    await commonUtils.elementCheckAndClick(datepickerObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(datepickerObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(datepickerObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Date Picker option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(datepickerObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(datepickerObjects.mainHeader, dataJson.pageHeader);
  });

  it('Select date using Javascript executer', async function () {
    await browser.executeScript("document.getElementById('datePickerMonthYearInput').value='"+dataJson.date+"'");
  });

  it('Select date and time using Javascript executer', async function () {
    await browser.executeScript("document.getElementById('dateAndTimePickerInput').value='"+dataJson.dateAndTime+"'");
  });

});
