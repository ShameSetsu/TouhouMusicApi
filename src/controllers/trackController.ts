import * as express from 'express';

import { Track } from '../models/dbModel/track.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { GenreController } from './genreController';
import { Settings } from '../settings';

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
}