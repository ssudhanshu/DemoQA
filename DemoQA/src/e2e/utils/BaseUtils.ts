import { CommonPageObjects } from '../pageObjects/CommonPageObjects';
import { WaitUtils } from './WaitUtils';
import { element, browser, promise, ElementFinder, WebElement } from 'protractor';
import {CommonUtils} from "../utils/CommonFunctionsUtils";


export class BaseUtils {

    /**
     * @description Check the existence of a WebElement
     * @param element WebElement that needs to be clicked 
     * @param scroll Scrolls to the element if set to true
     */
    async elementExistenceCheck(element: WebElement, scroll: boolean = true) {

        let deferred = promise.defer();
        
        if (scroll) {
            await browser.executeScript('window.scrollTo(\' ' + (await element.getLocation()).x + ' \', \'' + (await element.getLocation()).y + ' \')');
            browser.sleep(300);
        }
        await element.getAttribute('class').then(
            (val) => {
                console.log('ELEMENT CLASS NAME IS ' + val)
            }
        );

        element.isDisplayed().then(
            (boolean) => {
                deferred.fulfill(boolean);
            },
            () => {
                console.log('ERROR FINDING ELEMENT - elementExistenceCheck');
                deferred.fulfill(false);
            }
        );
        return deferred.promise;
    }

    /**
     * @description Check whether a WebElement is clickable or not
     * @param element WebElement that needs to be clicked 
     * @param scroll Scrolls to the element if set to true
     */
    async elementClickableCheck(element: WebElement, scroll: boolean = true) {

        let deferred = promise.defer();

        if (scroll) {
            await browser.executeScript('window.scrollTo(\' ' + (await element.getLocation()).x + ' \', \'' + (await element.getLocation()).y + ' \')');
            browser.sleep(300);
        }
        element.isEnabled().then(
            (boolean) => {
                deferred.fulfill(boolean);
            },
            () => {
                console.log('ERROR FINDING ELEMENT - elementClickableCheck');
                deferred.fulfill(false);
            }
        );
        return deferred.promise;

    }

    /**
     * @description Click on any WebElement
     * @param element WebElement that needs to be clicked 
     * @param scroll Scrolls to the element if set to true
     */
    async clickElement(element: WebElement, scroll: boolean = true) {

        if (scroll) {
            await browser.executeScript('window.scrollTo(\' ' + (await element.getLocation()).x + ' \', \'' + (await element.getLocation()).y + ' \')');
            browser.sleep(300);
        }
        await element.click()
            .then(null, function (err) {
                console.log('Error occurred ' + err.name);
            });
    }

    /**
     * @description Use this method to enter value in any input box
     * @param element WebElement which can receive an input box
     * @param scroll Scrolls to the element if set to True. Set this to true if your element is in the non-visible area of the screen
     */
    async elementSendKeys(element, dataToSend, scroll: boolean = false) {
        if (scroll) {
            await browser.executeScript('window.scrollTo(\' ' + element.getLocation().x + ' \', \'' + element.getLocation().y + ' \')');
        }
        let commonUtil = new CommonUtils();
        commonUtil.enterLongText(element, dataToSend);
    }


}