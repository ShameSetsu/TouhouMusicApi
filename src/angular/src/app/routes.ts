import { AppComponent } from "./app.component";
import { Routes } from "@angular/router";
import { AlbumFormPage } from "../pages/album-form-page/album-form";

export const AppRoutes: Routes = [
    {
        path: 'album-form',
        component: AlbumFormPage
    }
]