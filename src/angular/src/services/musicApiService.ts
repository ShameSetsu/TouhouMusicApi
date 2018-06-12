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
        headers.append('Content-Type', 'application/json');
        let options: RequestOptionsArgs = JSON.parse('{ "headers": "" }');
        options.headers = headers;

        console.log('picturePayload', picturePayload);
        console.log('tracksPayload', [...tracksPayload['entries']()]);
        
        return new Promise<Response>((resolve, reject)=>{
            forkJoin(
                this.http.post('http://localhost:3000/api/album/thumbnail', picturePayload),
                this.http.post('http://localhost:3000/api/album/tracks', tracksPayload)
            ).subscribe(res=>{
                console.log('forkJoin res', res);
                console.log('postAlbum');
                this.http.post('http://localhost:3000/api/album', album, options).subscribe(res=>{
                    console.log('postAlbumRes', res);
                    resolve(res);
                }, err=>{
                    console.error('postAlbumErr', res);
                    resolve(err);
                })
            });
        });
    }

    getAllArtists(): Promise<Array<{_id: string, name: string}>> {
        return new Promise<Array<{_id: string, name: string}>>((resolve, reject)=>{
            this.http.get('http://localhost:3000/api/artist/all').subscribe((res: any)=>{
                console.log('getAllArtist RES', JSON.parse(res._body));
                resolve(JSON.parse(res._body));
            }, err=>reject(err));
        })
    }
}