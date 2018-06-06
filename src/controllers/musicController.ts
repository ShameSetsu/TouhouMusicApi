import { TrackController } from "./trackController";
import { BaseController } from "./baseController";
import { mapToAlbumInDto, AlbumInDto } from "../models/inDto/albumInDto.model";
import { AlbumController } from "./albumController";

export class MusicController extends BaseController {
    trackCtrl: TrackController;
    albumCtrl: AlbumController;

    constructor(app, mongo) {
        super();
        this.trackCtrl = new TrackController(app, mongo);
        this.albumCtrl = new AlbumController(app, mongo);
        app.post('/api/album', this.postAlbum());
    }

    postAlbum = () => {
        return (req, res) => {
            const payload: AlbumInDto = mapToAlbumInDto(req.body);

            // CONVERT TO MONGO OBJECTS
            //
            // const tracks = ;
            // const album = ;

            this.trackCtrl.insertMany(payload.tracks).then(trackInsertRes=>{
                this.albumCtrl.insertOne(payload).then(AlbumInsertRes=>{
                    res.send('success');
                }, err=>{throw('albumCtrl.insertOne' + err)})
            }, err=>{throw('trackCtrl.insertMany' + err)});
        }
    }
}