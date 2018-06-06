import * as express from 'express';

import { TrackOutDto } from '../models/outDto/trackOutDto.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { AlbumOutDto } from '../models/outDto/albumOutDto.model';
import { AlbumInDto, mapToAlbumInDto } from '../models/inDto/albumInDto.model';

export class AlbumController {
    collection;

    constructor(app: express.Express, mongo: MongoServer) {
        this.collection = mongo.dbConnection.collection('album');
        //this.initCollection('album');
        app.get('/test/album', this.getAlbumTest());
    }

    getAlbumTest = (): any => {
        return (req, res) => {
            this.collection.find({}).toArray((err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    throw(err);
                }
            });
        }
    }

    insertOne(inDto: AlbumInDto): Promise<any> {
        return new Promise((resolve, reject)=>{
            this.collection.insertOne(JSON.stringify(inDto), (err, result) => {
                if (result) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}