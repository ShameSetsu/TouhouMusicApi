import * as express from 'express';

import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';

export class EventController extends BaseController {
    constructor(app: express.Express, mongo: MongoServer) {
        super();
        this.dataAccess = mongo;
        this.initCollection('event');
        app.get('/test/event', this.getEventTest());
        app.post('/test/event', this.postEventTest());
    }

    getEventTest = (): any => {
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

    postEventTest = () => {
        return (req, res) => {
            let event: string = '例大祭15';

            this.collection.insertOne(JSON.stringify(event), (err, result) => {
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