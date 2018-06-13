import * as express from 'express';

import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { Event } from '../models/dbModel/event.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';

export class EventController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('event');
        app.get('/api/event/all', this.getAllEvent());
        app.post('/api/event', this.postOneEvent());
    }

    getAllEvent = () => {
        return (req, res) => {
            this.collection.find({}).toArray((err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                    throw (err);
                }
            });
        }
    }

    postOneEvent = () => {
        return (req, res) => {
            this.collection.insertOne(req.body, (err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                }
            });
        }
    }

    getEventById(_id: string): Promise<Event> {
        return new Promise<Event>((resolve, reject)=> {
            this.collection.findOne({"_id": _id}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }
}