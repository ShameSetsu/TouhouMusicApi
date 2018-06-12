import { AlbumTrackInDto, mapToTrackInDto } from "./albumTrackInDto.model";
import { release } from "os";

export type AlbumInDto = {
    name: string,
    release: string,
    event: string,
    artist: string,
    tracks: Array<AlbumTrackInDto>,
    thumbnail: string,
    website?: string
}

export function mapToAlbumInDto(album: AlbumInDto): AlbumInDto {
    return <AlbumInDto> {
        release: album.release,
        event: album.event,
        artist: album.artist,
        tracks: album.tracks.map(track => mapToTrackInDto(track)),
        thumbnail: album.thumbnail,
        website: album.website
    };
}