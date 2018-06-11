import * as express from 'express';

import { Track } from '../models/dbModel/track.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';

export class TrackController extends BaseController {
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        this.initCollection('track');
        app.get('/test/track', this.getTrackTest());
        app.post('/test/track', this.postTrackTest());
    }

    getTracksByAlbum(_id: string): Promise<Array<Track>> {
        return new Promise<Array<Track>>((resolve, reject)=> {
            this.collection.find({"album": _id}).toArray((err, result) => {
                if(err) reject(err);
                else resolve(result);
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
                album: 'some-id',
                trackNumber: 1,
                duration: 233,
                genre: ['metal'],
                release: '2018-05-06',
                title: 'perverseness',
                file: '001.mp3'
            };
            this.collection.insertOne(JSON.stringify(track), (err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    return this.sendErrorMessage(res, { name: "Error", message: "User not found" });
                }
            });
        }
    }

    insertMany(inDto: Array<Track>) {
        return new Promise((resolve, reject) => {

        });
    }
}