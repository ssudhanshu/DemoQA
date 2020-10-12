import { browser } from "protractor";
import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import {ElementsPages} from '../../pageObjects/Elements/ElementsPages';
import { ProtractorDownloadHelper } from './download-helper';

describe('ELEMENTS -> UPLOAD AND DOWNLOAD', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let uploadDwnlodObjects = ElementsPages.getAllPageObjects().uploadAndDownloadScreenObj;
  let dataJson = require('../../../../e2e/testData/Elements/uploadanddownload.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Elements" section', async function () {
    await commonUtils.elementCheckAndClick(uploadDwnlodObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(uploadDwnlodObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(uploadDwnlodObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Upload and Download option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(uploadDwnlodObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(uploadDwnlodObjects.mainHeader, dataJson.pageHeader);
  });

  it('Should download proper file', async function () {
    // const downloadedFileName = 'sampleFile.jpeg';
    // const expectedDownloadFileName = 'sampleFile.jpeg';
    // // Remove the existing download file, if any (so browser doesn't rename the file)
    // const downloadHelper: ProtractorDownloadHelper = new ProtractorDownloadHelper();
    // downloadHelper.removeFile(downloadedFileName);

    // Click the download button
    await commonUtils.elementCheckAndClick(uploadDwnlodObjects.downloadBtn);  //File will be downloaded at 'e2e/downloads'. Configuration in conf file

    /*// Verify file contents
    try {
      const actualFileContents: string = await downloadHelper.getFileContents(downloadedFileName);
      const expectedFileContents: string = await downloadHelper.getFileContents(expectedDownloadFileName);
      expect(actualFileContents).toBe(expectedFileContents, 'Downloaded file differs from expected download file');
    } catch (err) {
      fail(`ERROR: Exception thrown: ${err.message}`);
    }*/
    // Remove file
    // downloadHelper.removeFile(downloadedFileName);
  });

  it('Should be able to upload a file', async function(){
    let filepath = 'DemoQA/src/e2e/testData/Elements/Planner.pdf';
    await commonUtils.uploadFile(filepath);
  });

});
