import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class ProgressBarObjects extends CommonPageObjects{

    get progressBar(): ElementFinder{
        return element(by.css('div#progressBar'));
    }

    get progress(): ElementFinder{
        return element(by.css('div#progressBar > div'));
    }

}