import * as MongoClient from 'mongodb';
//var MongoClient = require('mongodb').MongoClient;

export class MongoServer {
    static mongoUrl: string = 'mongodb://127.0.0.1:27017';
    dbConnection: any = null;

    public openDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.dbConnection == null) {
                MongoClient.connect(MongoServer.mongoUrl, (err, db) => {
                    console.log("Connected to MongoDB");
                    this.dbConnection = db;
                    resolve();
                }, err => reject(err));
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

    getDbConnection() {
        return this.dbConnection;
    }
}