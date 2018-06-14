import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ArtistFormComponent } from '../components/artist-form-component/artist-form-component';
import { EventFormComponent } from '../components/event-form-component/event-form-component';
import { GenreFormComponent } from '../components/genre-form-component/genre-form-component';
import { AlbumFormPage } from '../pages/album-form-page/album-form';
import { LocaleService } from '../services/localeService';
import { MusicApiService } from '../services/musicApiService';
import { AppComponent } from './app.component';
import { AppRoutes } from './routes';
import { OriginalFormComponent } from '../components/original-form-component/original-form-component';

function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        AlbumFormPage,
        ArtistFormComponent,
        EventFormComponent,
        GenreFormComponent,
        OriginalFormComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule.forRoot(AppRoutes),
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatCardModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        MusicApiService,
        LocaleService,
        TranslateService
    ],
    entryComponents: [
        ArtistFormComponent,
        EventFormComponent,
        GenreFormComponent,
        OriginalFormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }