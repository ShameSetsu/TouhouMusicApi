import * as express from 'express';

import { TrackOutDto } from '../models/outDto/trackOutDto.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { AlbumTrackInDto } from '../models/inDto/albumTrackInDto.model';

export class TrackController extends BaseController {
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        this.initCollection('track');
        app.get('/test/track', this.getTrackTest());
        app.post('/test/track', this.postTrackTest());
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
            let track: TrackOutDto = {
                artist: 'ankimo',
                duration: '4.23',
                genre: ['metal'],
                release: new Date(Date.now()),
                title: 'perverseness',
                url: 'localhost:3000/files/music/001.mp3'
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

    insertMany(inDto: Array<AlbumTrackInDto>) {
        return new Promise((resolve, reject)=>{

        });
    }
}