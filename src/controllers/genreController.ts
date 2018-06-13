import { Genre } from '../models/dbModel/genre.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';
import { BaseController } from './baseController';

export class GenreController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('genre');
        app.get('/api/genre/all', this.getAllGenres());
    }

    getAllGenres = () => {
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

    getEventById(_id: string): Promise<Genre> {
        return new Promise<Genre>((resolve, reject) => {
            this.collection.findOne({ "_id": _id }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}