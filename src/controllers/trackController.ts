import * as express from 'express';

import { Track } from '../models/dbModel/track.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { GenreController } from './genreController';
import { Settings } from '../settings';

type TrackQueryParameters = {
    page: number,
    album?: string,
    title?: string,
    artist?: string,
    genre?: string,
    sort: string
}

export class TrackController extends BaseController {

    genreCtrl: GenreController;
    
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.genreCtrl = new GenreController(app, mongo);
        this.dataAccess = mongo;
        this.initCollection('track');
        app.get('/test/track', this.getTrackTest());
        app.post('/test/track', this.postTrackTest());
    }

    getAllTracks(): Promise<Array<Track>> {
        return new Promise<Array<Track>>((resolve, reject)=> {
            this.collection.find().toArray((err, result) => {
                if(err) reject(err);
                else this.getTrackGenres(result)
                .then(res=>{
                    res.forEach(track => track.albumThumbnail = Settings.host + ':' + Settings.port + '/files/thumbnail/' + track.albumThumbnail + '.jpg');
                    resolve(res);
                })
                .catch(err=>reject(err));
            });
        });
    }

    getTracks(query: TrackQueryParameters): Promise<any> {
        return new Promise<any>((resolve, reject)=>{
            console.log(query.sort ? query.sort == 'release' ? {release: 1} : query.sort == 'title' ? {title: 1} : {$natural: 1} : {$natural: 1});
            this.collection.find(this.buildTrackQuery(query))
            .skip(query.page ? (query.page - 1) * Settings.trackPerPage : 0)
            .limit(query.page ? Settings.trackPerPage : 0)
            .sort(query.sort ? query.sort == 'release' ? {release: 1} : query.sort == 'title' ? {title: 1} : {$natural: 1} : {$natural: 1})
            .toArray((err, result) => {
                if(err) reject(err);
                else this.getTrackGenres(result)
                .then(res=>{
                    res.forEach(track => track.albumThumbnail = Settings.host + ':' + Settings.port + '/files/thumbnail/' + track.albumThumbnail + '.jpg');
                    resolve(res);
                })
                .catch(err=>reject(err));
            });
        })
    }

    getTracksByAlbum(_id: string): Promise<Array<Track>> {
        return new Promise<Array<Track>>((resolve, reject)=> {
            this.collection.find({"album": _id}).toArray((err, result) => {
                if(err) reject(err);
                else this.getTrackGenres(result)
                .then(res=>{
                    res.forEach(track => track.albumThumbnail = Settings.host + ':' + Settings.port + '/files/thumbnail/' + track.albumThumbnail + '.jpg');
                    resolve(res);
                })
                .catch(err=>reject(err));
            });
        });
    }

    getTrackTest = (): any => {
        return (req, res) => {
            this.collection.find({}).toArray((err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    return this.sendErrorMessage(res, { name: "Error", message: "User not found" });
                }
            });
        }
    }

    postTrackTest = () => {
        return (req, res) => {
            let track: Track = {
                artist: 'ankimo',
                albumThumbnail: '2a81eb96-6dac-11e8-adc0-fa7ae01bbebc',
                album: 'some-id',
                trackNumber: 1,
                duration: 233,
                genre: ['metal'],
                release: '2018-05-06',
                title: 'perverseness',
                format: 'mp3',
                file: '001.mp3'
            };
            this.collection.insertOne(track, (err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    return this.sendErrorMessage(res, { name: "Error", message: "User not found" });
                }
            });
        }
    }

    insertMany(tracks: Array<Track>) {
        return new Promise((resolve, reject) => {
            this.collection.insertMany(tracks, (err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        });
    }

    getTrackGenres(tracks): Promise<any> {
        const promises = tracks.map(track=>new Promise((resolve, reject)=>{
            this.genreCtrl.getGenresByIds(track.genre).then(genres=>{
                track.genre = genres;
                resolve(track);
            })
        }))
        return Promise.all(promises);
    }

    buildTrackQuery(query: TrackQueryParameters){
        let result = {};
        if(query.album) result['album'] = query.album
        if(query.artist) result['artist'] = query.artist;
        if(query.genre) result['genre'] = query.genre;
        if(query.title) result['title'] = new RegExp(query.title, 'gi'); // global + ignore case
        
        console.log(result);
        return result;
    }
}