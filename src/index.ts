import app from './App';
import { Settings } from '../settings';
import { MongoServer } from './Mongo';
import { TrackController } from './controllers/trackController';
import { AlbumController } from './controllers/albumController';

const dataAccess = new MongoServer();
dataAccess.openDb().then(()=>{
    
    const trackController = new TrackController(app, dataAccess);
    const albumController = new AlbumController(app, dataAccess);

    app.listen(Settings.port, err=>{
        if(err) return console.error('app.listen', err);
    
        return console.log('listening on port', Settings.port);
    });
}, err=> console.error('could not open mongo', err));