import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlbumInDto, mapToAlbumInDto } from "../../models/albumInDto.model";
import { AlbumTrackInDto, mapToTrackInDto } from "../../models/albumTrackInDto.model";
import { MusicApiService } from "../../services/musicApiService";

const allowedPictureFile = [
    ''
]

@Component({
    templateUrl: './album-form.html',
    styleUrls: ['./album-form.scss'],
    selector: 'album-form'
})
export class AlbumFormPage {

    albumForm: FormGroup;
    trackForms: Array<FormGroup> = [];
    tracks: Array<any>;
    allowedFile = ['audio/mp3'];
    picture;

    constructor(private musicApi: MusicApiService) {
        console.log('album-form');
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
        const album = {
            artist: this.albumForm.controls.artist.value,
            event: this.albumForm.controls.event.value,
            name: this.albumForm.controls.name.value,
            release: this.albumForm.controls.release.value,
            tracks: this.trackForms.map(trackForm => trackForm.value),
            website: this.albumForm.controls.website.value,
        };
        console.log('album', album);
        this.musicApi.postAlbum(this.picture, this.tracks, album)
            .then(res => {
                console.log('POST SUCCESS', res);
            })
            .catch(err => {
                console.log('POST ERROR', err);
            })
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

    dropPicture(ev) {
        ev.preventDefault();
        console.log('pic', ev.dataTransfer.files[0].type);
        if (Object.values(ev.dataTransfer.files).length == 1 && ev.dataTransfer.files[0].type.split('/')[0] == 'image') {
            this.picture = ev.dataTransfer.files[0];
        }
    }

    dropTracks(ev) {
        ev.preventDefault();
        console.log('this.files', this.tracks);
        let tpmForms = [];
        let forbidden = false;
        Object.values(ev.dataTransfer.files).forEach((file: any) => {
            if (file.type.split('/')[0] != 'audio') {
                forbidden = true;
            }
            tpmForms.push(new FormGroup({
                title: new FormControl(file.name.substr(0, file.name.lastIndexOf(".")), Validators.required),
                artist: new FormControl(this.albumForm.controls.artist.value, Validators.required),
                duration: new FormControl(0, Validators.required),
                genre: new FormControl(null, Validators.required),
                release: new FormControl(this.albumForm.controls.release.value, Validators.required),
                arrangement: new FormControl(null),
                lyrics: new FormControl(null),
                originalTitle: new FormControl(null),
                vocal: new FormControl(null)
            }))
        });
        if (forbidden) return;
        console.log('after return');
        this.tracks = Object.values(ev.dataTransfer.files);
        this.trackForms = tpmForms;

    }
}