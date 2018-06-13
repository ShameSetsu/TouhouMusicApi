import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as uuidv1 from 'uuid/v1';

import { AlbumFormPage } from '../../pages/album-form-page/album-form';
import { MusicApiService } from '../../services/musicApiService';

@Component({
    selector: 'artist-form-component',
    templateUrl: 'artist-form-component.html',
    styleUrls:  ['artist-form-component.scss']
})
export class ArtistFormComponent {
    artistForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AlbumFormPage>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private musicService: MusicApiService) {
            
        this.artistForm = new FormGroup({
            _id: new FormControl(uuidv1(), Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            website: new FormControl(null, Validators.required)
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    post() {
        this.musicService.postArtist(this.artistForm.value)
            .then(res => {
                this.dialogRef.close(true);
            })
    }
}