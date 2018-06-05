import { MongoServer } from '../Mongo';
import * as express from 'express';

export class BaseController {
    dataAccess: MongoServer;
    socket: any;

    // Send an error message.
    sendErrorMessage = (res: express.Response, e?: Error) => {
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