import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatButtonModule, MatInputModule, MatOptionModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AlbumFormPage } from '../pages/album-form-page/album-form';
import { MusicApiService } from '../services/musicApiService';
import { AppComponent } from './app.component';
import { AppRoutes } from './routes';

@NgModule({
    declarations: [
        AppComponent,
        AlbumFormPage
    ],
    imports: [
        RouterModule.forRoot(AppRoutes),
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        MatInputModule,
        MatButtonModule,
        MatOptionModule,
        MatCardModule,
        MatToolbarModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [
        MusicApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
