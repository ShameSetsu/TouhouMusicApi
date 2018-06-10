import { Injectable } from "@angular/core";
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class MusicApiService {
    constructor(private http: Http){ }

    postAlbum(albumArt, tracks, album): Promise<Response> {
        let picturePayload: FormData = new FormData();
        picturePayload.append('picture', albumArt);

        let tracksPayload: FormData = new FormData();
        tracks.forEach((track, index)=>{
            console.log('addTrackToPayload', track, index);
            tracksPayload.append('track' + index, track);    
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;

        return new Promise<Response>((resolve, reject)=>{
            forkJoin(
                this.http.post('localhost:3000/album/thumbnail', picturePayload, options),
                this.http.post('localhost:3000/album/tracks', tracksPayload, options)
            ).subscribe(res=>{
                console.log('forkJoin res', res);
            });
        });
    }
}