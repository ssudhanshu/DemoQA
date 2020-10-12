import { browser } from "protractor";
import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {ElementsPages} from '../../pageObjects/Elements/ElementsPages';

describe('ELEMENTS -> CHECK BOX', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let checkboxObjects = ElementsPages.getAllPageObjects().checkBoxScreenObj;
  let dataJson = require('../../../../e2e/testData/Elements/checkbox.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Elements" section', async function () {
    await commonUtils.elementCheckAndClick(checkboxObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(checkboxObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(checkboxObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Check Box option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(checkboxObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(checkboxObjects.mainHeader, dataJson.pageHeader);
  });

  it('Expand checkboxes: Home->Documents->Workspace ', async function () {
    await commonUtils.elementCheckAndClick(checkboxObjects.expandIconByName(dataJson.checkBoxGroups.home));
    await commonUtils.elementCheckAndClick(checkboxObjects.expandIconByName(dataJson.checkBoxGroups.documents));
    await commonUtils.elementCheckAndClick(checkboxObjects.expandIconByName(dataJson.checkBoxGroups.workSpace));
  });

  it('Select checkboxes: '+dataJson.selectCheckboxes, async function () {
    await commonUtils.elementCheckAndClick(checkboxObjects.checkBoxByName(dataJson.selectCheckboxes[0]));
    await commonUtils.elementCheckAndClick(checkboxObjects.checkBoxByName(dataJson.selectCheckboxes[1]));
  });

  it('Validate the selected checkboxes ', async function () {
    await checkboxObjects.selectedNames.each(async function(element, index){
      await commonUtils.validateElementText(element, (dataJson.selectCheckboxes[index]).toLowerCase());
    })
  });


});
