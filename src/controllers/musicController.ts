import { Album } from '../models/dbModel/album.model';
import { Track } from '../models/dbModel/track.model';
import { AlbumInDto, mapToAlbumInDto } from '../models/inDto/albumInDto.model';
import { AlbumController } from './albumController';
import { BaseController } from './baseController';
import { TrackController } from './trackController';
import { HttpStatus } from '../models/misc/httpStatus.enum';
import { Settings } from '../../settings';
import * as uuidv1 from 'uuid/v1';

export class MusicController extends BaseController {
    trackCtrl: TrackController;
    albumCtrl: AlbumController;

    constructor(app, mongo) {
        super();
        //this.trackCtrl = new TrackController(app, mongo);
        //this.albumCtrl = new AlbumController(app, mongo);
        app.post('/api/album/files', this.postAlbumFiles());
        app.post('/api/album', this.postAlbum());
    }

    postAlbumFiles = () => {
        return (req, res) => {
            if (!req.files)
                return res.status(HttpStatus.BAD_REQUEST).send('No files were uploaded.');

            let thing: string = 'some.file.mp3';
            let fileIds: Array<string> = [];

            this.copyFiles(Object.values(req.files))
                .then(files => res.send(files))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
        }
    }

    copyFile(file): Promise<string> {
        return new Promise((resolve, reject) => {
            let uid = uuidv1() + '.' + file.name.split('.').pop();
            file.mv(Settings.rootDir + '/public/music/' + uid, (err) => {
                if (err) reject(err);
                resolve(uid);
            });
        })
    }

    copyFiles(files): Promise<Array<string>> {
        const promises: Array<Promise<string>> = files.map(file => new Promise((resolve, reject) => {
            let uid = uuidv1() + '.' + file.name.split('.').pop();
            file.mv(Settings.rootDir + '/public/music/' + uid, (err) => {
                if (err) reject(err);
                resolve(uid);
            });
        }));
        return Promise.all(promises);
    }

    postAlbum = () => {
        return (req, res) => {
            const payload: AlbumInDto = mapToAlbumInDto(req.body);

            // CONVERT TO MONGO OBJECTS
            //
            const tracks = payload.tracks.map(track => {
                return <Track>{
                    title: track.title,
                    artist: payload.artist,
                    duration: track.duration,
                    genre: track.genre,
                    release: payload.release,
                    file: track.file,
                    arrangement: track.arrangement,
                    lyrics: track.lyrics,
                    originalTitle: track.originalTitle,
                    vocal: track.vocal
                }
            });
            let albumDuration = 0;
            payload.tracks.forEach(track => albumDuration += track.duration);

            const album = <Album>{
                name: payload.name,
                artist: payload.artist,
                event: payload.event,
                duration: albumDuration,
                nbTracks: payload.tracks.length,
                release: payload.release,
                website: payload.website
            }
            // const album = ;
            this.albumCtrl.insertOne(payload).then(AlbumInsertRes => {
                this.trackCtrl.insertMany(tracks).then(trackInsertRes => {

                    res.send('success');
                }, err => { throw ('trackCtrl.insertMany' + err) })
            }, err => { throw ('albumCtrl.insertOne' + err) });
        }
    }
}