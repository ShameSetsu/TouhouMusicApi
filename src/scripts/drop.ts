import * as MongoClient from 'mongodb';

import { MongoServer } from '../Mongo';
import { albums } from '../objects/albums.object';
import { artists } from '../objects/artists.object';
import { events } from '../objects/events.object';
import { genres } from '../objects/genres.object';
import { members } from '../objects/members.object';
import { tracks } from '../objects/tracks.objects';
import { originals } from '../objects/original.object';

MongoClient.connect(MongoServer.mongoUrl, (err, db) => {
    if (err) {
        console.error('MongoServer error', err);
        throw err;
    }
    const mongo = db.db("db");

    // POPULATE ALBUMS
    mongo.collection('album').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP album');
    });

    // POPULATE ARTISTS
    mongo.collection('artist').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP artist');
    });

    // POPULATE EVENTS
    mongo.collection('event').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP event');
    });

    // POPULATE GENRES
    mongo.collection('genre').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP genre');
    });

    // POPULATE MEMBERS
    mongo.collection('member').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP member');
    });


    // POPULATE TRACKS
    mongo.collection('track').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP track');
    });

    // POPULATE ORIGINALS
    mongo.collection('original').drop(dropErr=>{
        if(dropErr) throw dropErr;
        else console.log('DROP original');
    });
});