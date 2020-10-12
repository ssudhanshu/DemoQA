import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';

export class CommonPageObjects{

    //Element for Home page title: TOOLSQA
    get pageTitle():ElementFinder{
        return element(by.css('header > a > img'));
    }

    //Header element for side table menu options
    get mainHeader(): ElementFinder{
        return element(by.css('div.main-header'));
    }
    
    //Element for category cards on home page by category label
    getCardByLabel(cardName: string): ElementFinder{
        return element(by.xpath('//div/h5[text()=\''+cardName+'\']'));
    }

    //Element for Menu items by its group header and item name
    getItemByGrpName(grpHeader: String, itemname: string): ElementFinder{
        return element(by.xpath('//div[text()=\''+grpHeader+'\']/ancestor::div[@class=\'element-group\']//span[text()=\''+itemname+'\']'));
    }

    //Element for any button on the page with tag='button' and button text
    getBtnByText(btnTxt: string): ElementFinder{
        return element.all(by.xpath('//button[text()=\''+btnTxt+'\']')).last();
    }

}