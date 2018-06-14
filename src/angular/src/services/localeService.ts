import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class LocaleService {

    constructor(private translate: TranslateService) { }

    formatDate(date: Date) {
        console.log(this.translate.getLangs());
        console.log(this.translate.getDefaultLang());
        switch (this.translate.getDefaultLang()) {
            case 'ja':
                return moment(date).format('YYYY-MM-DD');
            case 'en-gb':
                return moment(date).format('MM-DD-YYYY');
            case 'fr-fr':
                return moment(date).format('DD-MM-YYYY');
            default:
                return moment(date).format('YYYY-MM-DD');
        }
    }

    formatDateToDB(date: Date){
        return moment(date).format('YYYY-MM-DD');
    }
}