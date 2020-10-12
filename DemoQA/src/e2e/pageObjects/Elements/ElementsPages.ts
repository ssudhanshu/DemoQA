import { CheckboxObjects } from './CheckboxObjects';
import { WebTableObjects } from './WebTableObjects';
import {UploadAndDownloadObjects} from './UploadAndDownloadObjects';

interface ElementsPageObjects {

    checkBoxScreenObj: CheckboxObjects,
    webTableScreenObj: WebTableObjects,
    uploadAndDownloadScreenObj: UploadAndDownloadObjects
}

export module ElementsPages {

    export class CheckBoxPage extends CheckboxObjects { }
    export class WebTablePage extends WebTableObjects { }
    export class UploadAndDownloadPage extends UploadAndDownloadObjects { }
    export function getAllPageObjects(): ElementsPageObjects {
        return {
            checkBoxScreenObj: new CheckboxObjects(),
            webTableScreenObj: new WebTableObjects(),
            uploadAndDownloadScreenObj: new UploadAndDownloadObjects()
        }
    }
}
