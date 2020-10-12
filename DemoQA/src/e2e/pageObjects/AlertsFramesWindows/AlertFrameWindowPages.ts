import { AlertObjects } from './AlertObjects';
import { BrowserWindowObjects } from './BrowserWindowObjects';

interface AlertFrameWindowPageObjects {

    alertScreenObj: AlertObjects,
    browserWindowScreenObj: BrowserWindowObjects
}

export module AlertFrameWindowPages {

    export class AlertPage extends AlertObjects { }
    export class BrowserWindowPage extends BrowserWindowObjects { }
    export function getAllPageObjects(): AlertFrameWindowPageObjects {
        return {
            alertScreenObj: new AlertObjects(),
            browserWindowScreenObj: new BrowserWindowObjects()
        }
    }
}
