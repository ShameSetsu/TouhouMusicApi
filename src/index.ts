import app from './App';
import { Settings } from '../settings';

app.listen(Settings.port, err=>{
    if(err) return console.error('app.listen', err);

    return console.log('listening on port', Settings.port);
});