import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class AlertObjects extends CommonPageObjects{

    get alertButton(): ElementFinder{
        return element(by.css('#alertButton'));
    }

    get alertTimerButton(): ElementFinder{
        return element(by.css('#timerAlertButton'));
    }

    get alertConfirmButton(): ElementFinder{
        return element(by.css('#confirmButton'));
    }

    get fetchConfirmationResult(): ElementFinder{
        return element(by.css('#confirmResult'));
    }

    get alertPromptButton(): ElementFinder{
        return element(by.css('#promtButton'));
    }

    get fetchPromptTxt(): ElementFinder{
        return element(by.css('#promptResult'));
    }

}