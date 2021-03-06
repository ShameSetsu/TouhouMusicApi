import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, startWith } from 'rxjs/operators';

import { ArtistFormComponent } from '../../components/artist-form-component/artist-form-component';
import { EventFormComponent } from '../../components/event-form-component/event-form-component';
import { GenreFormComponent } from '../../components/genre-form-component/genre-form-component';
import { OriginalFormComponent } from '../../components/original-form-component/original-form-component';
import { MusicApiService } from '../../services/musicApiService';
import { AlbumTrackInDto } from '../../models/albumTrackInDto.model';


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
    loading: boolean = true;

    artists: Array<{ _id: string, name: string }> = [];
    filteredArtists: Observable<Array<{ _id: string, name: string }>>;

    events: Array<{ _id: string, name: string, date: string }> = [];
    filteredEvents: Observable<Array<{ _id: string, name: string }>>;

    genres: Array<{ _id: string, name: string }> = [];

    originals: Array<{ touhou: number, tracks: Array<{ _id: string, name: string }> }> = [];

    constructor(private musicApi: MusicApiService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router) {
        this.albumForm = new FormGroup({
            artist: new FormControl(null, [Validators.required]),
            event: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            release: new FormControl(null, Validators.required),
            website: new FormControl(null),
        });
        forkJoin(
            this.musicApi.getAllArtists(),
            this.musicApi.getAllGenres(),
            this.musicApi.getAllEvents(),
            this.musicApi.getAllOriginals()
        )
            .subscribe(res => {
                this.artists = res[0];
                this.genres = res[1];
                this.events = res[2];
                this.originals = this.formatOriginalSong(res[3]);
                this.loading = false;
                console.log('artists', this.artists);
                console.log('genres', this.genres);
                console.log('events', this.events);
                console.log('originals', this.originals);
            }, err => {
                console.error('GET_ALL_DATA Error', err);
                alert('GET_ALL_DATA Error: ' + err);
                this.router.navigate(['/']);
                this.loading = false;
            });
    }

    ngOnInit() {
        this.albumForm.controls.artist.valueChanges
            .subscribe(val => {
                if (!val || !val._id || !val.name || typeof !val._id == 'string' || typeof !val.name == 'string' || !(val._id.length > 0) || typeof !val.name == 'string' || !(val.name.length > 0)) {
                    this.albumForm.controls.artist.setErrors(<ValidationErrors>{
                        error: 'invalidObject'
                    });
                }
            });
        this.albumForm.controls.event.valueChanges
            .distinctUntilChanged()
            .subscribe((val: { _id: string, name: string, date: string }) => {
                if (!val || !val._id || !val.name || !val.date
                    || typeof val._id != 'string' || typeof val.name != 'string' || typeof val.date != 'string'
                    || !(val._id.length > 0) || !(val.name.length > 0) || !(val.date.length > 0)) {
                    this.albumForm.controls.event.setErrors(<ValidationErrors>{
                        error: 'invalidObject'
                    });
                } else {
                    this.albumForm.controls.release.setValue(val.date);
                    console.log(this.albumForm.value);
                }
            });

        this.filteredArtists = this.albumForm.controls.artist.valueChanges
            .pipe(
                startWith(''),
                map(val => this.filterArtists(val))
            );
        this.filteredEvents = this.albumForm.controls.event.valueChanges
            .pipe(
                startWith(''),
                map(val => this.filterEvents(val))
            );
    }

    displayName(object: any) {
        return object ? object.name : null;
    }

    postAlbum() {
        this.loading = true;
        const album = {
            artist: this.albumForm.controls.artist.value._id,
            event: this.albumForm.controls.event.value._id,
            name: this.albumForm.controls.name.value,
            release: this.albumForm.controls.event.value.date,
            tracks: this.trackForms.map(trackForm => {
                return {
                    title: trackForm.value.title,
                    artist: trackForm.value.artist,
                    genre: trackForm.value.genre.map(genre => genre._id),
                    release: trackForm.value.release,
                    arrangement: trackForm.value.arrangement,
                    lyrics: trackForm.value.lyrics,
                    originalTitle: trackForm.value.originalTitle._id,
                    vocal: trackForm.value.vocal,
                    format: trackForm.value.format
                }
            }),
            website: this.albumForm.controls.website.value,
        };
        this.musicApi.postAlbum(this.picture, this.tracks, album)
            .then(res => {
                console.log('POST SUCCESS', res);
                this.resetForms();
                this.openSnackBar('アップロードに成功しました');
                this.loading = false;
            })
            .catch(err => {
                console.error('POST ERROR', err);
                alert('POST ERROR: ' + err);
            })
    }

    applyGenreToAll(){
        this.trackForms.forEach((trackForm, i)=>{
            if(i != 0) trackForm.controls.genre.setValue(this.trackForms[0].controls.genre.value)
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
        if (Object.values(ev.dataTransfer.files).length == 1 && ev.dataTransfer.files[0].type.split('/')[0] == 'image') {
            this.picture = ev.dataTransfer.files[0];
        }
    }

    dropTracks(ev) {
        ev.preventDefault();
        console.log('event', ev);
        let tpmForms = [];
        let forbidden = false;
        Object.values(ev.dataTransfer.files).forEach((file: any) => {
            console.log('file', file);
            if (file.type.split('/')[0] != 'audio') {
                forbidden = true;
            }
            let tmpForm = new FormGroup({
                title: new FormControl(file.name.substr(0, file.name.lastIndexOf(".")), Validators.required),
                artist: new FormControl(this.albumForm.controls.artist.value.name, Validators.required),
                genre: new FormControl(null, Validators.required),
                release: new FormControl(this.albumForm.controls.release.value),
                arrangement: new FormControl(null),
                lyrics: new FormControl(null),
                originalTitle: new FormControl(null, Validators.required),
                vocal: new FormControl(null),
                format: new FormControl(file.type.split('/')[1])
            });
            console.log('tmpForm', tmpForm.value);
            tpmForms.push(tmpForm);
        });
        if (forbidden) return;
        console.log('after return');
        this.tracks = Object.values(ev.dataTransfer.files);
        this.trackForms = tpmForms;
    }

    showArtistForm() {
        let dialogRef = this.dialog.open(ArtistFormComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.musicApi.getAllArtists()
                    .then(res => this.artists = res)
                    .catch(err => console.error('getAllArtists error', err));
            }
        });
    }

    showEventForm() {
        let dialogRef = this.dialog.open(EventFormComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.musicApi.getAllEvents()
                    .then(res => this.events = res)
                    .catch(err => console.error('getAllEvents error', err));
            }
        });
    }

    showGenreForm() {
        let dialogRef = this.dialog.open(GenreFormComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.musicApi.getAllGenres()
                    .then(res => this.genres = res)
                    .catch(err => console.error('getAllGenres error', err));
            }
        });
    }

    showOriginalForm() {
        let dialogRef = this.dialog.open(OriginalFormComponent);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.musicApi.getAllOriginals()
                    .then(res => this.originals = this.formatOriginalSong(res))
                    .catch(err => console.error('getAllGenres error', err));
            }
        });
    }

    formatOriginalSong(originals: Array<{ _id: string, name: string, touhou: number }>) {
        let result: Array<{ touhou: number, tracks: Array<{ _id: string, name: string }> }> = [];
        originals.forEach(original => {
            if (result.find(group => group.touhou == original.touhou) != null)
                result.find(group => group.touhou == original.touhou)
                    .tracks.push({ _id: original._id, name: original.name });
            else result.push({ touhou: original.touhou, tracks: [{ _id: original._id, name: original.name }] });

        });
        console.log('result', result);
        return result;
    }

    filterArtists(val: string): Array<{ _id: string, name: string }> {
        return (typeof val == 'string') ? this.artists.filter(artist => artist.name.toLowerCase().includes(val.toLowerCase())) : null;
    }

    filterEvents(val: string): Array<{ _id: string, name: string }> {
        return (typeof val == 'string') ? this.events.filter(event => event.name.toLowerCase().includes(val.toLowerCase())) : null;
    }

    checkForm(): boolean {
        let valid = false;
        if (!this.albumForm.valid || !this.picture || !this.tracks) return valid;
        valid = true;
        this.trackForms.forEach(form => {
            if (!form.valid) valid = false;
        });
        return valid;
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, null, {
            duration: 2000,
        });
    }

    resetForms() {
        this.picture = null;
        this.tracks = null;
        this.trackForms = [];
        this.albumForm.reset();
    }
}