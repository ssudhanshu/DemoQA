import { browser } from "protractor";
import { CommonUtils } from "../../utils/CommonFunctionsUtils";
import { WaitUtils } from '../../utils/WaitUtils';
import { ElementsPages } from '../../pageObjects/Elements/ElementsPages';
import * as using from 'jasmine-data-provider';
import { protractor } from "protractor/built/ptor";
import { W } from "protractor-beautiful-reporter";

describe('ELEMENTS -> WEB TABLES', function () {

  let originalTimeout;
  let commonUtils = new CommonUtils();
  let webtableObjects = ElementsPages.getAllPageObjects().webTableScreenObj;
  let dataJson = require('../../../../e2e/testData/Elements/webtables.json');

  beforeAll(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    await commonUtils.navigateToHomepage(process.env.URL);
  });

  afterAll(async()=>{
    await WaitUtils.wait(2000);
  });

  it('Go to "Elements" section', async function () {
    await commonUtils.elementCheckAndClick(webtableObjects.getCardByLabel(dataJson.grpName));
    await WaitUtils.waitForElement(webtableObjects.mainHeader);
  });

  it('Validate section page header', async function () {
    await commonUtils.validateElementText(webtableObjects.mainHeader, dataJson.grpNameHeader);
  });

  it('Click Web Tables option from left-pannel menu', async function () {
    await commonUtils.elementCheckAndClick(webtableObjects.getItemByGrpName(dataJson.grpName, dataJson.itemName));
  });

  it('Validate Page header', async function () {
    await commonUtils.validateElementText(webtableObjects.mainHeader, dataJson.pageHeader);
  });

  it('Validate the presence of Web table', async function () {
    await commonUtils.elementExistenceCheck(webtableObjects.table);
  });

  it('Validate and click on Add button', async function () {
    await commonUtils.elementCheckAndClick(webtableObjects.addBtn(dataJson.addBtnText));
  });

  describe('Registration Form', function () {

    function configurationDataProvider() {

      let randomNum = browser.params.randomNumData.randomNum;
      return ([
        {
          //Appending random number to create data to avoid duplicacy
          firstname: 'UI-' + randomNum,
          lastname: 'Automation-' + randomNum,
          email: 'UI-' + randomNum + '@automation.com',
          age: '28',
          salary: '999' + randomNum,
          department: 'Testing' + randomNum
        }
      ])
    }

    using(configurationDataProvider, function (configData) {

      describe('Create Registration Form', function () {

        it('Validate modal title', async function () {
          await commonUtils.validateElementText(webtableObjects.registrationFormTitle, dataJson.registrationFormHeader);
        });

        it('Enter First Name and validate Maximum length', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.firstName), configData.firstname);
          expect(await webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.firstName).getAttribute('maxlength')).toEqual(dataJson.firstNameMaxLength);
        });

        it('Enter Last Name', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.lastName), configData.lastname);
        });

        it('Enter Email and validate its Pattern', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.email), configData.email);
          expect(await webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.email).getAttribute('pattern')).toEqual(dataJson.emailPattern);
        });

        it('Enter Age and validate Maximum length', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.age), configData.age);
          expect(await webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.age).getAttribute('maxlength')).toEqual(dataJson.ageMaxLength);
        });

        it('Enter Salary', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.salary), configData.salary);
        });

        it('Enter Department', async function () {
          await commonUtils.textBoxInput(webtableObjects.registrationFormInputByLabel(dataJson.registrationFormLabels.department), configData.department);
        });

        it('Click Submit button', async function () {
          await commonUtils.elementCheckAndClick(webtableObjects.getBtnByText(dataJson.submitBtnTxt));
        });

      }); //end of Creating Registration Form describe block

      describe('Validate Table data', function(){

        it('Filter by first name using Search box', async function () {
          await commonUtils.textBoxInput(webtableObjects.searchBox, configData.firstname);
          await webtableObjects.searchBox.sendKeys(protractor.Key.ENTER);
          await WaitUtils.wait(500);
        });

        it('Validate each created data from the filtered row', async function(){
          var data: string[];
          data = [configData.firstname, configData.lastname, configData.age, configData.email, configData.salary, configData.department, ''];
          await webtableObjects.tableFirstRowElements.each(async function (element, index) {
            await commonUtils.validateElementText(element, data[index]);
          })
        });

        it('Clear filter', async function(){
          //Created this method as the below commented code does not load the WebTable after clear
          commonUtils.smartClearTextBox(webtableObjects.searchBox); 
          // await commonUtils.clickElement(webtableObjects.searchBox);
          // await webtableObjects.searchBox.clear();
          // await webtableObjects.searchBox.sendKeys(protractor.Key.ENTER);
        });

        it('FETCH ANY VALUE FROM TABLE BY PROVIDING ANY VALUE FROM ROW AND COLUMN NAME', async function(){
          await commonUtils.validateElementText
            (webtableObjects.fetchTableDataByRowNameAndColName('Kierra', 'Department')
            , 'Legal');
        });

        it('Validate Edit button presence', async function(){
          await commonUtils.elementExistenceCheck(webtableObjects.editRowByUniqueVal(configData.firstname));
        });

        it('Validate Delete button functionality', async function(){
          await commonUtils.elementCheckAndClick(webtableObjects.deleteRowByUniqueVal(configData.firstname));
        });

      });
    }); //end of 'configurationDataProvider' block
  }); //end of 'Registration Form' describe block

  it('Validate the presence of Pagination bar', async function () {
    await commonUtils.elementExistenceCheck(webtableObjects.pagination);
  });

}); //end of first describe block
