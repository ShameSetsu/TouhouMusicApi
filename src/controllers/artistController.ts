import { BaseController } from './baseController';
import { Artist } from '../models/dbModel/artist.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';

export class ArtistController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('artist');
        app.get('/api/artist/all', this.getAllArtists());
    }

    getAllArtists = () => {
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

    getArtistById(_id: string): Promise<Artist> {
        return new Promise<Artist>((resolve, reject) => {
            this.collection.findOne({ "_id": _id }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}