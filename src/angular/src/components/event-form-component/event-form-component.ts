import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as uuidv1 from 'uuid/v1';

import { AlbumFormPage } from '../../pages/album-form-page/album-form';
import { MusicApiService } from '../../services/musicApiService';
import * as moment from 'moment';
import { LocaleService } from '../../services/localeService';

@Component({
    selector: 'event-form-component',
    templateUrl: 'event-form-component.html',
    styleUrls: ['event-form-component.scss']
})
export class EventFormComponent {
    eventForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AlbumFormPage>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private musicService: MusicApiService,
        private localeService: LocaleService) {

        this.eventForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            date: new FormControl({value: null, disabled: true}, Validators.required)
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    post() {
        this.musicService.postEvent({ _id: uuidv1(), name: this.eventForm.value.name, date: this.localeService.formatDateToDB(this.eventForm.value.date) })
            .then(res => {
                this.dialogRef.close(true);
            })
            .catch(err => console.error('postEvent error', err));
    }
}