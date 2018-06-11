import * as express from 'express';

import { AlbumInDto } from '../models/inDto/albumInDto.model';
import { MongoServer } from '../Mongo';
import { Album } from '../models/dbModel/album.model';

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
                    throw (err);
                }
            });
        }
    }

    getAlbumById(_id: string): Promise<Album> {
        return new Promise<Album>((resolve, reject)=>{
            this.collection.findOne({"_id": _id}, (err, result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    insertOne(inDto: AlbumInDto): Promise<any> {
        return new Promise((resolve, reject) => {
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