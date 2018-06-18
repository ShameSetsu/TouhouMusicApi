import { BaseController } from './baseController';
import { Artist } from '../models/dbModel/artist.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';
import { Settings } from '../settings';
import * as uuidv1 from 'uuid/v1';

export class ArtistController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('artist');
        app.get('/api/artist/all', this.getAllArtists());
        app.post('/api/artist/thumbnail', this.postArtistThumbnail());
        app.post('/api/artist', this.postOneArtist());
    }

    getAllArtists = () => {
        return (req, res) => {
            this.collection.find({}, {_id: 1, name: 1}).toArray((err, result) => {
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

    postArtistThumbnail = () =>{
        return (req, res) => {
            if (!req.files)
                return res.status(HttpStatus.BAD_REQUEST).send('No files were uploaded.');
            this.copyFile(Object.values(req.files)[0], 'thumbnail')
                .then(fileId=>res.send([fileId]))
                .catch(err=>res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
        }
    }

    postOneArtist = () => {
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

    getArtistById(_id: string): Promise<Artist> {
        return new Promise<Artist>((resolve, reject) => {
            this.collection.findOne({ "_id": _id }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }

    copyFile(file, folder): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            let uid = uuidv1();
            file.mv(Settings.rootDir + '/public/' + folder + '/' + uid + '.' + file.name.split('.').pop(), (err) => {
                if (err) reject(err);
                resolve(uid);
            });
        });
        
    }
}