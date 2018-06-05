import { TrackOutDto } from "../outDto/trackOutDto.model";

export class Album {
    release: Date;
    nbTracks: number;
    length: string;
    eventId: string;
    artistId: string;
    website?: string;

    getAlbumTracks(): Array<TrackOutDto> {
        return [];
    }
}