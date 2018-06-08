import * as cors from 'cors';
import * as express from 'express';
import * as fileUpload from 'express-fileupload';

import { Settings } from './settings';
import { ApiRoutes } from './routes/routes.main';

class App {
    public express;
    private RoutesService: ApiRoutes = new ApiRoutes();

    constructor() {
        this.express = express();
        this.express.getRouter = () => { return express.Router() };
        this.express.use(cors());
        this.express.set('views', Settings.rootDir + '/views');
        this.express.set('view engine', 'ejs');
        this.express.use(fileUpload({ fileSize: 314572800 })); // limit = 300 Mo
        this.express.use('/files', express.static(Settings.rootDir + '/public'));
        this.express.use(express.static(Settings.rootDir + '/public/angular'));
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
        this.mountRoutes();
    }

    mountRoutes(): void {
        const app = express.Router();
        app.get('/', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send('TouhouMusicApi ver.' + Settings.version);
        });
        this.RoutesService.importRoutes(app);
        this.express.use('/', app);
    }
}
export default new App().express