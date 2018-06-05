import { BaseController } from "./baseController";
import * as express from 'express';
import { TrackOutDto } from "../models/outDto/trackOutDto.model";
import { MongoServer } from "../Mongo";

export class TrackController extends BaseController {
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        app.get('/test/track', this.getTrackTest());
        app.post('/test/track', this.postTrackTest());
    }

    getTrackTest() {
        return () => { return 'string'; };
    }

    postTrackTest() {
        return () => {
            return new Promise<any>((resolve, reject) => {
                let track: TrackOutDto = {
                    artist: 'ankimo',
                    duration: '4.23',
                    genre: ['metal'],
                    release: new Date(Date.now()),
                    title: 'perverseness',
                    url: 'localhost:3000/files/music/001.mp3'
                };
                console.log('inset track', track);
                let dbConnection = this.dataAccess.getDbConnection();
                dbConnection.collection('track').insertOne(track, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            });
        }
    }
}