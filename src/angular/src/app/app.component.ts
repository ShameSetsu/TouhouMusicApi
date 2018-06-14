import { Component, LOCALE_ID } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        { provide: LOCALE_ID, useValue: 'ja-JP' }
    ]
})
export class AppComponent {
    title = 'app';
    constructor(adapter: DateAdapter<any>, language: TranslateService) {
        adapter.setLocale('ja');
        language.setDefaultLang('ja');
    }
}