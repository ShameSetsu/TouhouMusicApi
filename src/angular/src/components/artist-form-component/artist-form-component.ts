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
    thumbnail: any;

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

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    dropPicture(ev) {
        ev.preventDefault();
        console.log('pic', ev.dataTransfer.files[0].type);
        console.log('picLength', Object.values(ev.dataTransfer.files));
        if (Object.values(ev.dataTransfer.files).length == 1 && ev.dataTransfer.files[0].type.split('/')[0] == 'image') {
            console.log('setThumbnail');
            this.thumbnail = ev.dataTransfer.files[0];
        }
    }

    close() {
        this.dialogRef.close(false);
    }

    post() {
        this.musicService.postArtist({thumbnail: this.thumbnail, artist: this.artistForm.value})
            .then(res => {
                this.dialogRef.close(true);
            })
            .catch(err=>console.error('postArtist error', err));
    }
}