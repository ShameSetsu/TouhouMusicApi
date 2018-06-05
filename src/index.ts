import app from './App';
import { Settings } from '../settings';
import { MongoServer } from './Mongo';
import { TrackController } from './controllers/trackController';

var dataAccess = new MongoServer();
dataAccess.openDb().then(()=>{
    var studentController = new TrackController(app, dataAccess);

    app.listen(Settings.port, err=>{
        if(err) return console.error('app.listen', err);
    
        return console.log('listening on port', Settings.port);
    });
}, err=> console.error('could not open mongo', err));
