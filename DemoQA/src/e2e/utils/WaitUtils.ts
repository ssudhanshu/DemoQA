import { element, by, browser, Key, ExpectedConditions } from 'protractor';
import * as retry from 'webdriverjs-retry';
import * as webdriver from 'selenium-webdriver';

export class WaitUtils {

    static async waitForElement(currentElement) {
        await browser.wait(ExpectedConditions.visibilityOf(currentElement), 10000);
    }

    static async waitForElementToDisappear(currentElement) {
        await browser.wait(ExpectedConditions.invisibilityOf(currentElement), 10000);
    }

    static async wait(millis) {
        await browser.sleep(millis);
    }

    static async scrollElemToBottomOfView(elem, active?) {
        if (active)
            await elem.scrollIntoView(false);
        else
            await elem.scrollIntoView(true);
    }

    static scrollElemFinderIntoView = async function (elemFinder, active?) {
        var promise = await browser.executeScript(WaitUtils.scrollElemToBottomOfView, elemFinder);
        return promise;
    };

    static async waitClick(currentElement) {
        browser.sleep(1000);
        await WaitUtils.waitForElement(currentElement);
        browser.wait(ExpectedConditions.elementToBeClickable(currentElement), 10000);
        currentElement.click();
    };

}




