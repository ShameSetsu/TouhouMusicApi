import * as express from 'express';

import { TrackOutDto } from '../models/outDto/trackOutDto.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { AlbumOutDto } from '../models/outDto/albumOutDto.model';
import { AlbumInDto, mapToAlbumInDto } from '../models/inDto/albumInDto.model';

export class TrackController extends BaseController {
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        this.initCollection('album');
        app.get('/test/album', this.getAlbumTest());
        app.post('/api/album', this.postAlbum());
    }

    getAlbumTest = (): any => {
        return (req, res) => {
            this.collection.find({}).toArray(function (err, result) {
                if (result) {
                    res.send(result);
                }
                else {
                    return this.sendErrorMessage(res, { name: "Error", message: "User not found" });
                }
            });
        }
    }

    postAlbum = () => {
        return (req, res) => {
            const payload: AlbumInDto = mapToAlbumInDto(req.body);
            
            this.collection.insertOne(JSON.stringify(album), (err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    return this.sendErrorMessage(res, { name: "Error", message: "User not found" });
                }
            });
        }
    }
}