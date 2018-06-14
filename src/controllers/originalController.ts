import { Genre } from '../models/dbModel/genre.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';
import { BaseController } from './baseController';
import { Original } from '../models/dbModel/original.model';

export class OriginalController extends BaseController {
    constructor(app, mongo) {
        super();
        this.dataAccess = mongo;
        this.initCollection('original');
        app.get('/api/original/all', this.getAllOriginals());
        app.post('/api/original', this.postOneOriginal());
    }

    getAllOriginals = () => {
        return (req, res) => {
            this.collection.find().sort({touhou: 1}).toArray((err, result) => {
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

    postOneOriginal = () => {
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

    getOriginalById(_id: string): Promise<Original> {
        return new Promise<Original>((resolve, reject) => {
            this.collection.findOne({ "_id": _id }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}