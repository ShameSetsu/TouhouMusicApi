import * as express from 'express';
import { Settings } from '../../settings';
import * as path from 'path';

const router = express.Router();

export class ApiRoutes {
    importRoutes(router): void {
        router.get('/test/music', (req, res) => res.send('MUSIC GOT'));
        router.get('/test/music/001.mp3', (req, res)=> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.sendFile('/public/music/001.mp3', {root: Settings.rootDir})
        });
    }
}