import * as express from 'express';

import { TrackOutDto } from '../models/outDto/trackOutDto.model';
import { MongoServer } from '../Mongo';
import { BaseController } from './baseController';
import { EventOutDto } from '../models/outDto/eventOutDto.model';

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
            let event: EventOutDto = {
                name: '例大祭15'
            };
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