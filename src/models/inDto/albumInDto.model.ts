import { AlbumTrackInDto, mapToTrackInDto } from "./albumTrackInDto.model";
import { release } from "os";
import { Album } from "../dbModel/album.model";

export type AlbumInDto = {
    _id?: string,
    name: string,
    release: string,
    event: string,
    artist: string,
    tracks: Array<AlbumTrackInDto>,
    thumbnail: string,
    website?: string
}

export function mapToAlbumInDto(album: AlbumInDto): AlbumInDto {
    console.log('map', album);
    return <AlbumInDto> {
        name: album.name,
        release: album.release,
        event: album.event,
        artist: album.artist,
        tracks: album.tracks.map(track => mapToTrackInDto(track)),
        thumbnail: album.thumbnail,
        website: album.website
    };
}