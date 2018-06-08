import * as express from 'express';
import { Settings } from '../settings';
import * as path from 'path';
import { HttpStatus } from '../models/misc/httpStatus.enum';

const router = express.Router();

export class ApiRoutes {
    importRoutes(app): void {
        app.get('/admin/add/album', (req, res)=>{
            res.render('album-form');
        })
        app.get('/test/music', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send({
                file: "http://localhost:3000/files/music/001.mp3"
            });
        });
        app.get('/angular', (req, res)=>{
            console.log('/angular');
            res.sendFile(path.join(Settings.rootDir + '/public/angular/index.html'));
        })
    }
}