import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AlbumFormPage } from '../pages/album-form-page/album-form';
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
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
