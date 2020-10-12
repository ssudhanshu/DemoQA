import 'jasmine';
import { browser, element, by, Key, ExpectedConditions, protractor, $, WebElement } from 'protractor';
import { } from 'selenium-webdriver';
import { CommonPageObjects } from "../pageObjects/CommonPageObjects";
import { WaitUtils } from './WaitUtils';
import { BaseUtils } from './BaseUtils';
import * as path from "path";

let commonPO = new CommonPageObjects();

export class CommonUtils extends BaseUtils {

  public sleepInterval;
  public timeoutInterval;
  public EC;
  public isLoggingOkay: Boolean;

  /**
   * @description Use this method to go the home page of Demo QA application
   * @param url URL that needs to be launched
   */
  async navigateToHomepage(url: string) {
    await browser.get(url);
    browser.driver.manage().window().maximize();
    await WaitUtils.waitForElement(commonPO.pageTitle);
    expect(browser.getTitle()).toMatch('ToolsQA');
  }

  /**
   * @description Enter Text in InputBox
   * @param element WebElement that needs to be clicked 
   * @param value Value that needs to be entered in the text
   */
  async enterLongText(inputElement: WebElement, value: string) {
    await inputElement.clear();
    await inputElement.sendKeys(value);
    return await inputElement.getAttribute('value')
      .then(async insertedValue => {
        if (insertedValue !== value) {
          return await this.enterLongText(inputElement, value);
        } else {
          return null;
        }
      });
  }

  /**
   * @description Use this method to check the existence, clickable nature of element and then Click on it
   * @param element element which needs to be clicked
   * @param scroll Scrolls to the element if true. If scrolling not required you can pass false to the calling method
   */
  async elementCheckAndClick(element: WebElement, scroll = true) {
    await this.elementExistenceCheck(element, scroll);
    await this.elementClickableCheck(element, scroll);
    await this.clickElement(element, scroll);
    WaitUtils.wait(500);
  }

  /**
   * @description Use this method to Click on a button by passing the button text. Recommended when button text is unique on UI
   * @param btnTxt Text of the button which needs to be clicked
   * @param scroll Scrolls to the element if true. If scrolling not required you can pass false to the calling method
   */
  async clickBtnContainingTxt(btnTxt: string, scroll = true) {
    let btnElm = commonPO.getBtnByText(btnTxt);
    await this.elementExistenceCheck(btnElm, scroll);
    await this.elementClickableCheck(btnElm, scroll);
    await this.clickElement(btnElm, scroll);
    WaitUtils.wait(500);
  }

  /**
   * @description Use this method to validate the text of a webelement
   * @param element The element for which text needs to be validated
   * @param expectedText The expected text for comparision
   * @param exactmatch Matches the exact text. For matching a substring of text set this to false
   */
  async validateElementText(element: WebElement, expectedText: string, exactmatch = true) {
    await this.elementExistenceCheck(element);
    if (exactmatch) {
      console.log('Matching exact text: ' + expectedText);
      expect(await element.getText()).toEqual(expectedText);
    } else {
      console.log('Matching partial text: ' + expectedText);
      expect(await element.getText()).toContain(expectedText);
    }
  }

  /**
   * @description Use this method to enter values in Text Boxes
   * @param element Any input box element in which text can be entered
   * @param inputText Text that needs to be entered in the text bo
   */
  async textBoxInput(element: WebElement, inputText: string) {
    await this.elementExistenceCheck(element);
    await this.elementSendKeys(element, inputText);
  }

  /**
   * @description Used to clear a text box. This method uses protractor backspace key to clear the text
   * @param: element: The text box element of which text has to be cleared.
   */
  async smartClearTextBox(element: WebElement) {
    await this.clickElement(element);
    element.getAttribute('value').then(function (text) {
      var backspaceSeries = Array(text.length + 1).join(protractor.Key.BACK_SPACE);
      element.sendKeys(backspaceSeries);
    });
  }

  /**
   * @description Use this method to switch to an alert of any type
   * @param accept (Boolena) Specify if you need to accept-true(default) or dismiss-false alert
   * @param alertTxt (Optional) Specify the alert message if you want to validate its text
   * @param inputTxt (Optional) Use this in case of Prompt alert to specify the text that needs to be enetered
   */
  async switchToAlert(accept: boolean = true, alertTxt?: string, inputTxt?: string) {
    console.log('Switching to Alert');
    let alrt = await browser.switchTo().alert();
    if (alertTxt) {
      console.log('Validating Alert Text');
      expect(await alrt.getText()).toEqual(alertTxt);
    }
    if (inputTxt) {
      console.log('You are on Prompt Alert. Value to be entered in prompt text field: ' + inputTxt);
      await alrt.sendKeys(inputTxt);
    }
    if (accept) {
      await alrt.accept();
    } else {
      await alrt.dismiss();
    }

  }

  /**
   * @description Switch to the new tab or window
   */
  async switchToNewTabOrWindow() {
    var handlePromise = browser.driver.getAllWindowHandles();
    handlePromise.then(async (handles) => {
      var parentHandle = handles[0];
      var popUpHandle = handles[1];
      console.log(parentHandle);
      console.log(popUpHandle);
      // Change to new handle
      await browser.driver.switchTo().window(popUpHandle);
      var popUpHandleFinal = await browser.driver.getWindowHandle();
      WaitUtils.wait(1000);
      expect(popUpHandleFinal).toContain(popUpHandle);
    });

  }

  /**
  * @description  Close the current tab or window and switchTo the parent window
  */
  async closeCurrentTabOrWindow() {
    browser.getAllWindowHandles().then(async (handles) => {
      await browser.driver.switchTo().window(handles[1]);
      await browser.driver.close();
      await browser.driver.switchTo().window(handles[0]);
    });
  }

  /**
   * @description : Upload any file
   * @param fileToUpload : Relative path of the file to upload
   */
  async uploadFile(fileToUpload: string){
    var trimpath = fileToUpload.split('e2e'); 
    var newpath = '../../../e2e'+trimpath[1]; //Path from this file
    //Form the absolute path
    var absolutePath = path.resolve(__dirname, newpath);
    console.log('Absolute path: '+absolutePath);
    await $('input[type="file"]').sendKeys(absolutePath);
    WaitUtils.wait(500);
  }


}