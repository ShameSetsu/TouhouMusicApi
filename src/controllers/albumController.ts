import * as express from 'express';

import { AlbumInDto } from '../models/inDto/albumInDto.model';
import { MongoServer } from '../Mongo';
import { Album } from '../models/dbModel/album.model';
import { BaseController } from './baseController';

export class AlbumController extends BaseController{
    collection;

    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        this.initCollection('album');
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

    getAllAlbum(): Promise<Array<Album>>{
        return new Promise<Array<Album>>((resolve, reject)=>{
            this.collection.find().toArray((err, result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    getAlbumById(_id: string): Promise<Album> {
        return new Promise<Album>((resolve, reject)=>{
            this.collection.findOne({"_id": _id}, (err, result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    insertOne(album: Album): Promise<any> {
        console.log('insert album', album);
        return new Promise((resolve, reject) => {
            this.collection.insertOne(album , (err, result) => {
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