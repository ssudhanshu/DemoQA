import { element, by, ElementArrayFinder, ElementFinder, $$, $ } from 'protractor';
import { By, promise, WebDriver } from 'selenium-webdriver';
import { CommonPageObjects } from '../CommonPageObjects';

export class UploadAndDownloadObjects extends CommonPageObjects{

    get downloadBtn(): ElementFinder{
        return element(by.css('#downloadButton'));
    }

}