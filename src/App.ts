import * as express from 'express';
import { Settings } from '../settings';
import { ApiRoutes } from './routes/routes.main';
import * as cors from 'cors';

class App {
    public express;
    private RoutesService: ApiRoutes = new ApiRoutes();
    
    constructor() {
        this.express = express();
        this.express.use(cors());
        this.express.use('/files', express.static(Settings.rootDir + '/public'));
        console.log('public', Settings.rootDir + '/public');
        this.express.use((req, res, next)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
        this.mountRoutes();
    }

    mountRoutes(): void {
        const router = express.Router();
        router.get('/', (req, res)=> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send('TouhouMusicApi ver.' + Settings.version)
        });
        this.RoutesService.importRoutes(router);
        this.express.use('/', router);
    }
}

export default new App().express