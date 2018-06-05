import * as MongoClient from 'mongodb';
//var MongoClient = require('mongodb').MongoClient;

export class MongoServer {
    static mongoUrl: string = 'mongodb://localhost:27017/db';
    dbConnection: any = null;

    public openDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            
            if (this.dbConnection == null) {
                MongoClient.connect(MongoServer.mongoUrl, (err, db) => {
                    if (err) {
                        console.error('MongoServer error', err);
                        throw err;
                    }
                    this.dbConnection = db.db("db");
                    resolve();
                });
            } else {
                reject('dbConnection not null' + JSON.parse(this.dbConnection));
            }
        })
    }

    public closeDbConnection() {
        if (this.dbConnection) {
            this.dbConnection.close();
            this.dbConnection = null;
        }
    }
}