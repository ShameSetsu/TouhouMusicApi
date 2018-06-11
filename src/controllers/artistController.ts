import { BaseController } from './baseController';
import { Artist } from '../models/dbModel/artist.model';

export class ArtistController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('artist');
    }

    getArtistById(_id: string): Promise<Artist> {
        return new Promise<Artist>((resolve, reject)=> {
            this.collection.findOne({"_id": _id}, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });
    }
}