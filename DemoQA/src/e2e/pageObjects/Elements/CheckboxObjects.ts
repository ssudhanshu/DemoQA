import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class CheckboxObjects extends CommonPageObjects{

    expandIconByName(name: string): ElementFinder{
        return element(by.xpath('//span[text()=\''+name+'\']/parent::label/preceding-sibling::button'));
    }

    checkBoxByName(name: string): ElementFinder{
        return element(by.xpath('//span[text()=\''+name+'\']/parent::label/span[@class=\'rct-checkbox\']'));
    }

    get selectedNames(): ElementArrayFinder{
        return element.all(by.xpath('//span[text()=\'You have selected :\']/following-sibling::span'));
    }

}