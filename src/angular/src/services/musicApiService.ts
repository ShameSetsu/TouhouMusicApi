import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, Response } from '@angular/http';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { ApiService } from './apiService';

@Injectable()
export class MusicApiService {
    constructor(private api: ApiService) { }

    postAlbum(albumArt, tracks: Array<any>, album): Promise<Response> {
        console.log('POST', album);
        let picturePayload: FormData = new FormData();
        picturePayload.append('picture', albumArt);

        let tracksPayload: FormData = new FormData();

        tracks.forEach((track, index) => {
            tracksPayload.append('track' + index, track);
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;

        return new Promise<Response>((resolve, reject) => {
            forkJoin(
                this.api.post('http://localhost:3000/api/album/thumbnail', picturePayload),
                this.api.post('http://localhost:3000/api/album/tracks', tracksPayload)
            ).subscribe(res => {
                console.log('forkJoin res', res);
                console.log('postAlbum');
                album.tracks.forEach((track, i) => {
                    console.log('TRACK', track, 'res[i]', res[1][i]);
                    track.file = res[1][i]
                });

                this.api.post('http://localhost:3000/api/album', album, options).subscribe(res => {
                    console.log('postAlbumRes', res);
                    resolve(res);
                }, err => {
                    console.error('postAlbumErr', res);
                    resolve(err);
                })
            });
        });
    }

    postArtist(artist) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;
        console.log('artist', artist);
        return new Promise<Response>((resolve, reject) => {
            this.api.post('http://localhost:3000/api/artist', artist).subscribe(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    postGenre(genre) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;
        console.log('genre', genre);
        return new Promise<Response>((resolve, reject) => {
            this.api.post('http://localhost:3000/api/genre', genre).subscribe(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    postEvent(event) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;
        console.log('event', event);
        return new Promise<Response>((resolve, reject) => {
            this.api.post('http://localhost:3000/api/event', event).subscribe(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    postOriginal(original) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;
        console.log('event', original);
        return new Promise<Response>((resolve, reject) => {
            this.api.post('http://localhost:3000/api/original', original).subscribe(
                res => resolve(res),
                err => reject(err)
            );
        });
    }

    getAllArtists(): Promise<Array<{ _id: string, name: string }>> {
        return new Promise<Array<{ _id: string, name: string }>>((resolve, reject) => {
            this.api.get('http://localhost:3000/api/artist/all').subscribe((res: any) => {
                resolve(res);
            }, err => reject(err));
        });
    }

    getAllGenres(): Promise<Array<{ _id: string, name: string }>> {
        return new Promise<Array<{ _id: string, name: string }>>((resolve, reject) => {
            this.api.get('http://localhost:3000/api/genre/all').subscribe((res: any) => {
                resolve(res);
            }, err => reject(err));
        });
    }

    getAllEvents(): Promise<Array<{ _id: string, name: string, date: string }>> {
        return new Promise<Array<{ _id: string, name: string, date: string }>>((resolve, reject) => {
            this.api.get('http://localhost:3000/api/event/all').subscribe((res: any) => {
                resolve(res);
            }, err => reject(err));
        });
    }
    //api/original/all
    getAllOriginals(): Promise<Array<{ _id: string, name: string, touhou: number }>> {
        return new Promise<Array<{ _id: string, name: string, touhou: number }>>((resolve, reject) => {
            this.api.get('http://localhost:3000/api/original/all').subscribe((res: any) => {
                resolve(res);
            }, err => reject(err));
        });
    }
}