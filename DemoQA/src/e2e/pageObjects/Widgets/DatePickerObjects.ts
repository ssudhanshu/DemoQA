import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class DatePickerObjects extends CommonPageObjects{

    get selectDateElm(): ElementFinder{
        return element(by.css('#alertButton'));
    }

}