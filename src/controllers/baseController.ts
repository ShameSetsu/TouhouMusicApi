import * as express from 'express';

import { MongoServer } from '../Mongo';

export class BaseController {
    dataAccess: MongoServer;
    socket: any;
    collection: any;

    initCollection(collection: string) {
        this.collection = this.dataAccess.dbConnection.collection(collection);
    }

    // Send an error message.
    sendErrorMessage = (res, e?) => {
        if (e) {
            var ex = JSON.stringify(e);
            return res.status(400).json({ Message: e.message, ExceptionMessage: ex });
        }
        else {
            res.sendStatus(400);
        }
    }

    // Set the socket.
    public setSocket = (socket: any) => {
        this.socket = socket;
    }
}