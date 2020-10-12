import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class WebTableObjects extends CommonPageObjects{

    get table(): ElementFinder{
        return element(by.css('div.ReactTable'));
    }

    get pagination(): ElementFinder{
        return element(by.css('div.pagination-bottom'));
    }

    addBtn(txt: string): ElementFinder{
        return element(by.cssContainingText('#addNewRecordButton',txt));
    }

    get registrationFormTitle(): ElementFinder{
        return element(by.css('div.modal-title'));
    }

    registrationFormInputByLabel(label: string): ElementFinder{
        return element(by.xpath('//label[text()=\''+label+'\']/parent::div/following-sibling::div/input'));
    }

    get searchBox(): ElementFinder{
        return element(by.css('input#searchBox'));
    }

    get tableFirstRowElements(): ElementArrayFinder{
        return element.all(by.xpath('//div[@class=\'rt-tr-group\'][1]//div[@class=\'rt-td\']'));
    }

    //To return an element from WebTable using Row Name and Column Name
    fetchTableDataByRowNameAndColName(rowName, columnName): ElementFinder{
        return element(by.xpath('//div[text()=\''+rowName+'\']/parent::div/div[count(//div[text()=\''+columnName+'\']/parent::div/preceding-sibling::div)+1]'));
    }

    editRowByUniqueVal(uniqueValFromRow: string): ElementFinder{
        return element(by.xpath('//div[text()=\''+uniqueValFromRow+'\']/following-sibling::div//span[@title=\'Edit\']'));
    }

    deleteRowByUniqueVal(uniqueValFromRow: string): ElementFinder{
        return element(by.xpath('//div[text()=\''+uniqueValFromRow+'\']/following-sibling::div//span[@title=\'Delete\']'));
    }

    //div[text()='45']/parent::div/div
//    count(//div[text()='Age']/parent::div/preceding-sibling::div)
}