import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as uuidv1 from 'uuid/v1';

import { AlbumFormPage } from '../../pages/album-form-page/album-form';
import { MusicApiService } from '../../services/musicApiService';

@Component({
    selector: 'genre-form-component',
    templateUrl: 'genre-form-component.html',
    styleUrls: ['genre-form-component.scss']
})
export class GenreFormComponent {
    genreForm: FormControl;

    constructor(
        public dialogRef: MatDialogRef<AlbumFormPage>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private musicService: MusicApiService) {

        this.genreForm = new FormControl(null, Validators.required);
    }

    close() {
        this.dialogRef.close(false);
    }

    post() {
        this.musicService.postGenre({ _id: uuidv1(), name: this.genreForm.value })
            .then(res => {
                this.dialogRef.close(true);
            })
            .catch(err => console.error('postGenre error', err));
    }
}