import { Settings } from '../settings';
import app from './App';
import { AlbumController } from './controllers/albumController';
import { TrackController } from './controllers/trackController';
import { MongoServer } from './Mongo';
import { MusicController } from './controllers/musicController';
require("babel-core").transform("code");

const dataAccess = new MongoServer();
dataAccess.openDb().then(() => {

    const musicController = new MusicController(app, dataAccess);
    // const trackController = new TrackController(app, dataAccess);
    // const albumController = new AlbumController(app, dataAccess);

    app.listen(Settings.port, err => {
        if (err) return console.error('app.listen', err);

        return console.log('listening on port', Settings.port);
    });
}, err => console.error('could not open mongo', err));