import * as express from 'express';
import { Settings } from '../../settings';
import * as path from 'path';

const router = express.Router();

export class ApiRoutes {
    importRoutes(router): void {
        router.get('/test/music', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send({
                file: "http://localhost:3000/files/music/001.mp3"
            });
        });
        // router.get('/test/music/001.mp3', (req, res)=> {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     res.send({
        //         file: "localhost:3000/files/test/music/001.mp3"
        //     }, {root: Settings.rootDir})
        // });
    }
}