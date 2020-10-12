import { DatePickerObjects } from './DatePickerObjects';
import { ProgressBarObjects } from './ProgressBarObjects';

interface WidgetsPageObjects {

    datepickerScreenObj: DatePickerObjects,
    progressbarScreenObj: ProgressBarObjects
}

export module WidgetsPages {

    export class DatePickerPage extends DatePickerObjects { }
    export class ProgressBarPage extends ProgressBarObjects { }
    export function getAllPageObjects(): WidgetsPageObjects {
        return {
            datepickerScreenObj: new DatePickerObjects(),
            progressbarScreenObj: new ProgressBarObjects()
        }
    }
}
