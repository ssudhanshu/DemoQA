import { browser } from "protractor";
import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {WidgetsPages} from '../../pageObjects/Widgets/WidgetsPages';

describe('WIDGETS -> PROGRESS BAR', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let progressBarObjects = WidgetsPages.getAllPageObjects().progressbarScreenObj;
  let dataJson = require('../../../../e2e/testData/Widgets/progressbar.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Widgets" section', async function () {
    await commonUtils.elementCheckAndClick(progressBarObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(progressBarObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(progressBarObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Progress Bar option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(progressBarObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(progressBarObjects.mainHeader, dataJson.pageHeader);
  });

  it('Validate the presence of progress bar', async function () {
    await commonUtils.elementExistenceCheck(progressBarObjects.progressBar);
  });

  it('Validate current value, minimum value and maximum value in the progress bar- should all be 0 by default', async function () {
    expect(await progressBarObjects.progress.getAttribute('aria-valuenow')).toEqual(dataJson.initialProgressVal);
    expect(await progressBarObjects.progress.getAttribute('aria-valuemin')).toEqual(dataJson.initialProgressVal);
    expect(await progressBarObjects.progress.getAttribute('aria-valuemax')).toEqual(dataJson.maxProgressVal);
  });

  it('Click Start button', async function () {
    await commonUtils.clickBtnContainingTxt(dataJson.startBtnTxt);
  });

  it('Click Reset button once Progress Bar reaches 100%', async function(){
    for(;;){
      if (await progressBarObjects.progress.getText() == '100%'){
        await commonUtils.clickBtnContainingTxt(dataJson.resetBtnTxt);
        break;
      }
    }
  });

  it('Validate current value after Reset- should be 0', async function () {
    expect(await progressBarObjects.progress.getAttribute('aria-valuenow')).toEqual(dataJson.initialProgressVal);
  });

  xit('Click Start button', async function () {
    await commonUtils.clickBtnContainingTxt(dataJson.startBtnTxt);
  });

  xit('Stop progress bar at '+dataJson.stopProgressAt+' %', async function(){
    for(;;){
      if (await progressBarObjects.progress.getText() == dataJson.stopProgressAt+'%'){
        await commonUtils.clickBtnContainingTxt(dataJson.stopBtnTxt);
        break;
      }
    }
  });

});
