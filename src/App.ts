import * as express from 'express';
import { Settings } from '../settings';
import { ApiRoutes } from './routes/routes.main';
import * as  cors from 'cors';

class App {
    public express;
    private RoutesService: ApiRoutes = new ApiRoutes();
    
    constructor() {
        this.express = express();
        this.express.use(cors());
        this.mountRoutes();
    }

    mountRoutes(): void {
        const router = express.Router();
        router.get('/', (req, res)=> {
            res.send('TouhouMusicApi ver.' + Settings.version)
        });
        this.RoutesService.importRoutes(router);
        this.express.use('/', router);
    }   
}

export default new App().express