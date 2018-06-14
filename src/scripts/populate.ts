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
    mongo.collection('album')
        .insert(albums, null, (err, records) => {
            if (err) throw ('albums' + err);
            if (records) console.log('albums', records);
        });

    // POPULATE ARTISTS
    mongo.collection('artist')
        .insert(artists, null, (err, records) => {
            if (err) throw ('artists' + err);
            if (records) console.log('artists', records);
        });

    // POPULATE EVENTS
    mongo.collection('event')
        .insert(events, null, (err, records) => {
            if (err) throw ('events' + err);
            if (records) console.log('events', records);
        });

    // POPULATE GENRES
    mongo.collection('genre')
        .insert(genres, null, (err, records) => {
            if (err) throw ('genres' + err);
            if (records) console.log('genres', records);
        });

    // POPULATE MEMBERS
    mongo.collection('member')
        .insert(members, null, (err, records) => {
            if (err) throw ('members' + err);
            if (records) console.log('members', records);
        });

    // POPULATE TRACKS
    mongo.collection('track')
        .insert(tracks, null, (err, records) => {
            if (err) throw ('track' + err);
            if (records) console.log('track', records);
        });

    // POPULATE ORIGINALS
    mongo.collection('original')
        .insert(originals, null, (err, records) => {
            if (err) throw ('original' + err);
            if (records) console.log('original', records);
        });
});