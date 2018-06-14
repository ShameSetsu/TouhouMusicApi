import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as uuidv1 from 'uuid/v1';

import { AlbumFormPage } from '../../pages/album-form-page/album-form';
import { MusicApiService } from '../../services/musicApiService';

@Component({
    selector: 'original-form-component',
    templateUrl: 'original-form-component.html',
    styleUrls: ['original-form-component.scss']
})
export class OriginalFormComponent {
    originalForm: FormGroup;
    touhou: Array<number> = [1,2,3,4,5,6,7,7.5,8,9,9.5,10,10.5,11,12,12.3,12.5,12.8,13,13.5,14,14.3,14.5,15,15.5,16];

    constructor(
        public dialogRef: MatDialogRef<AlbumFormPage>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private musicService: MusicApiService) {

        this.originalForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            touhou: new FormControl(null, Validators.required)
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    post() {
        this.musicService.postOriginal({ _id: uuidv1(), name: this.originalForm.value.name, touhou: this.originalForm.value.touhou })
            .then(res => {
                this.dialogRef.close(true);
            })
            .catch(err => console.error('postOriginal error', err));
    }
}