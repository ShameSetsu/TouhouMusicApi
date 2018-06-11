import * as express from 'express';

import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { Event } from '_debugger';

export class EventController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('event');
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