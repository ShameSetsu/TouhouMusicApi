import { resolve } from 'dns';
import * as mm from 'music-metadata';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as uuidv1 from 'uuid/v1';

import { Album } from '../models/dbModel/album.model';
import { Track } from '../models/dbModel/track.model';
import { AlbumInDto, mapToAlbumInDto } from '../models/inDto/albumInDto.model';
import { AlbumTrackInDto } from '../models/inDto/albumTrackInDto.model';
import { HttpStatus } from '../models/misc/httpStatus.enum';
import { Settings } from '../settings';
import { AlbumController } from './albumController';
import { ArtistController } from './artistController';
import { BaseController } from './baseController';
import { EventController } from './eventController';
import { GenreController } from './genreController';
import { OriginalController } from './originalController';
import { TrackController } from './trackController';
import { AlbumTrackOutDto } from '../models/outDto/albumTrackOutDto';

export class MusicController extends BaseController {
    trackCtrl: TrackController;
    albumCtrl: AlbumController;
    artistCtrl: ArtistController;
    eventCtrl: EventController;
    originalCtrl: OriginalController;

    constructor(app, mongo) {
        super();
        this.trackCtrl = new TrackController(app, mongo);
        this.albumCtrl = new AlbumController(app, mongo);
        this.artistCtrl = new ArtistController(app, mongo);
        this.eventCtrl = new EventController(app, mongo);
        this.originalCtrl = new OriginalController(app, mongo);
        app.post('/api/album/tracks', this.postAlbumFiles());
        app.post('/api/album/thumbnail', this.postAlbumThumbnail());
        app.post('/api/album', this.postAlbum());
        app.get('/api/album/test', this.getTestAlbum());
        app.get('/api/album/all', this.getAllAlbum());
        app.get('/api/track/all', this.getAllTracks());
        app.get('/api/track', this.getTracks());
    }

    getAllTracks = () => {
        return (req, res)=>{
            console.log('req.body', req.body);
            this.trackCtrl.getAllTracks().then(tracksFound=>{
                this.getTracksInfo(tracksFound).then(tracks=>{
                    res.send(tracks);
                })
            })
        }
    }

    getTracks = () =>{
        return (req, res)=>{
            this.trackCtrl.getTracks(req.query).then(tracksFound=>{
                res.send(tracksFound)
                // this.getTracksInfo(tracksFound).then(tracks=>{
                //     res.send(tracks);
                // })
            })
        }
    }

    getTestAlbum = () => {
        return (req, res) => {
            this.albumCtrl.getAlbumById('0f717066-6dab-11e8-adc0-fa7ae01bbebc').then((album: any) => {
                forkJoin(
                    this.trackCtrl.getTracksByAlbum('0f717066-6dab-11e8-adc0-fa7ae01bbebc'),
                    this.artistCtrl.getArtistById(album.artist),
                    this.eventCtrl.getEventById(album.event)
                ).subscribe((response: any) => {
                    this.getTracksInfo(response[0]).then(tracks => {
                        console.log('TRACK ', tracks)
                        album.tracks = tracks;
                        album.artist = { _id: album.artist, name: response[1].name };
                        album.event = { _id: album.event, name: response[2].name };
                        album.thumbnail = Settings.host + ':' + Settings.port + '/files/thumbnail/' + album.thumbnail + '.jpg';
                        res.send(album);
                    });
                });
            }).catch(err => { throw ('getAlbumById' + err) });
        }
    }

    getAllAlbum = () => {
        return (req, res) => {
            this.albumCtrl.getAllAlbum().then((albums: Array<any>) => {
                const promises: Array<Promise<any>> = albums.map(album => {
                    return new Promise((resolve, reject) => {
                        forkJoin(
                            this.trackCtrl.getTracksByAlbum('0f717066-6dab-11e8-adc0-fa7ae01bbebc'),
                            this.artistCtrl.getArtistById(album.artist),
                            this.eventCtrl.getEventById(album.event)
                        ).subscribe((response: any) => {
                            this.getTracksInfo(response[0]).then(tracks => {
                                album.tracks = tracks;
                                album.artist = { _id: album.artist, name: response[1].name };
                                album.event = { _id: album.event, name: response[2].name };
                                album.thumbnail = Settings.host + ':' + Settings.port + '/files/thumbnail/' + album.thumbnail + '.jpg';
                                tracks.forEach(track=>track.albumThumbnail = album.thumbnail);
                                resolve();
                            })
                            .catch(err=>reject(err));
                        }, err => reject(err));
                    });
                });
                Promise.all(promises).then(() => {
                    res.send(albums);
                }).catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
            });
        }
    }

    postAlbumFiles = () => {
        return (req, res) => {
            if (!req.files)
                return res.status(HttpStatus.BAD_REQUEST).send('No files were uploaded.');

            this.copyFiles(Object.values(req.files), 'music')
                .then(files => res.send(files))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
        }
    }

    postAlbumThumbnail = () => {
        return (req, res) => {
            if (!req.files)
                return res.status(HttpStatus.BAD_REQUEST).send('No files were uploaded.');

            this.copyFiles(Object.values(req.files), 'thumbnail')
                .then(files => res.send(files))
                .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err));
        }
    }

    postAlbum = () => {
        return (req, res) => {
            const payload: AlbumInDto = mapToAlbumInDto(req.body);
            const albumId = uuidv1();

            // CONVERT TO MONGO OBJECTS

            this.setDuration(payload.tracks).then(tracksWithDuration => {
                let albumDuration = 0;

                console.log('setDurationRES', tracksWithDuration);
                payload.tracks = tracksWithDuration;

                const tracks: Array<Track> = payload.tracks.map(track => {
                    return <Track>{
                        title: track.title,
                        album: albumId,
                        artist: payload.artist,
                        duration: track.duration,
                        genre: track.genre,
                        release: payload.release,
                        file: track.file,
                        arrangement: track.arrangement,
                        lyrics: track.lyrics,
                        originalTitle: track.originalTitle,
                        vocal: track.vocal,
                        format: track.format
                    }
                });
                payload.tracks.forEach(track => albumDuration += track.duration);

                const album: Album = <Album>{
                    _id: albumId,
                    name: payload.name,
                    artist: payload.artist,
                    event: payload.event,
                    duration: albumDuration,
                    nbTracks: payload.tracks.length,
                    release: payload.release,
                    website: payload.website
                };

                console.log('insert');
                this.albumCtrl.insertOne(album).then(AlbumInsertRes => {
                    console.log('insertOne res', AlbumInsertRes);
                    this.trackCtrl.insertMany(tracks).then(trackInsertRes => {
                        console.log('insertmany res', trackInsertRes);
                        res.send({ album: AlbumInsertRes, tracks: trackInsertRes });
                    }).catch(err => {
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                        console.error('insertMany ERROR', err);
                        throw ('albumCtrl.insertOne' + err);
                    });
                }).catch(err => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                    console.error('insert ERROR', err);
                    throw ('albumCtrl.insertOne' + err);
                });
            });
        }
    }

    setDuration(tracks: Array<AlbumTrackInDto>): Promise<Array<AlbumTrackInDto>> {
        const promises: Array<Promise<AlbumTrackInDto>> = tracks.map(track =>
            new Promise<AlbumTrackInDto>((resolve, reject) => {
                mm.parseFile(Settings.rootDir + '/public/music/' + track.file + '.' + track.format, { native: true })
                    .then(metadata => {
                        console.log('metadata', metadata);
                        track.duration = Math.round(metadata.format.duration);
                        console.log('track', track);
                        resolve(track);
                    })
            })
        );
        return Promise.all(promises);
    }

    copyFiles(files, folder): Promise<Array<string>> {
        const promises: Array<Promise<string>> = files.map(file => new Promise((resolve, reject) => {
            let uid = uuidv1();
            file.mv(Settings.rootDir + '/public/' + folder + '/' + uid + '.' + file.name.split('.').pop(), (err) => {
                if (err) reject(err);
                resolve(uid);
            });
        }));
        return Promise.all(promises);
    }

    getTracksInfo(tracks: Array<any>) {
        const promises: Array<Promise<AlbumTrackOutDto>> = tracks.map(track => {
            return new Promise<AlbumTrackOutDto>((resolve, reject) => {
                forkJoin(
                    this.artistCtrl.getArtistById(track.artist),
                    this.originalCtrl.getOriginalById(track.originalTitle)
                ).subscribe(res => {
                    track.artist = {
                        _id: res[0]._id,
                        name: res[0].name
                    }
                    track.originalTitle = {
                        _id: res[1]._id,
                        name: res[1].name
                    }
                    resolve(track);
                }, err => reject(err));
            });
        });
        return Promise.all(promises);
    }
}