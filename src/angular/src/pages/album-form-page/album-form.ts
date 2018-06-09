import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlbumInDto, mapToAlbumInDto } from "../../models/albumInDto.model";
import { AlbumTrackInDto, mapToTrackInDto } from "../../models/albumTrackInDto.model";

@Component({
    templateUrl: './album-form.html',
    styleUrls: ['./album-form.scss'],
    selector: 'album-form'
})
export class AlbumFormPage {

    albumForm: FormGroup;
    trackForms: Array<FormGroup> = [];
    files: Array<any>;

    constructor() {
        this.albumForm = new FormGroup({
            artist: new FormControl(null, Validators.required),
            event: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            release: new FormControl(null, Validators.required),
            website: new FormControl(null),
        });
    }

    ngOnInit() {
        this.albumForm.valueChanges.subscribe(value => {
            console.log('albumForm value', value);
        });
    }

    postAlbum() {
        const album: AlbumInDto = mapToAlbumInDto({
            artist: this.albumForm.controls.artist.value,
            event: this.albumForm.controls.event.value,
            name: this.albumForm.controls.name.value,
            release: this.albumForm.controls.release.value,
            tracks: this.trackForms.map(trackForm => trackForm.value),
            website: this.albumForm.controls.website.value
        });
    }

    dragFilesDropped(files) {
        console.log('droped files', files);
    }

    filesChange(files) {
        console.log('fileChange event', files);
        console.log('fileChange files', files.srcElement.files);
    }

    allowDrop(ev) {
        ev.preventDefault();
        return true;
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        console.log('dragev', ev);
    }

    drop(ev) {
        ev.preventDefault();
        this.files = ev.dataTransfer.files;
        console.log('this.files', this.files);
        Object.values(this.files).forEach(file=>{
            this.trackForms.push(new FormGroup({
                title: new FormControl(file.name.substr(0, file.name.lastIndexOf(".")), Validators.required),
                artist: new FormControl(this.albumForm.controls.artist.value, Validators.required),
                duration: new FormControl(0, Validators.required),
                genre: new FormControl(null, Validators.required),
                release: new FormControl(this.albumForm.controls.release.value, Validators.required),
                arrangement: new FormControl(this.albumForm.controls.release.value),
                lyrics: new FormControl(null),
                originalTitle: new FormControl(null),
                vocal: new FormControl(null)
            }))
        });
    }
}