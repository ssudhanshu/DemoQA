import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class BrowserWindowObjects extends CommonPageObjects{

    get newTabBtn(): ElementFinder{
        return element(by.css('#tabButton'));
    }

    get newWindowBtn(): ElementFinder{
        return element(by.css('#windowButton'));
    }

    get newWindowMsgBtn(): ElementFinder{
        return element(by.css('#messageWindowButton'));
    }

    get newTabOrWindowHeader(): ElementFinder{
        return element(by.css('h1#sampleHeading'));
    }

    get newWindowMessage(): ElementFinder{
        return element.all(by.xpath('//html/body')).last();
    }

}