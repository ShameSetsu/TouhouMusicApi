import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatButtonModule, MatInputModule, MatOptionModule, MatCardModule, MatToolbarModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AlbumFormPage } from '../pages/album-form-page/album-form';
import { MusicApiService } from '../services/musicApiService';
import { AppComponent } from './app.component';
import { AppRoutes } from './routes';
import { ArtistFormComponent } from '../components/artist-form-component/artist-form-component';

@NgModule({
    declarations: [
        AppComponent,
        AlbumFormPage,
        ArtistFormComponent
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
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [
        MusicApiService
    ],
    entryComponents: [
        ArtistFormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
