import { AlbumTrackInDto, mapToTrackInDto } from "./albumTrackInDto.model";

export type AlbumInDto = {
    name: string,
    release: Date,
    event: string,
    artist: string,
    tracks: Array<AlbumTrackInDto>
    website?: string
}

export function mapToAlbumInDto(album: AlbumInDto): AlbumInDto {
    return <AlbumInDto> {
        release: album.release,
        event: album.event,
        artist: album.artist,
        tracks: album.tracks.map(track => mapToTrackInDto(track)),
        website: album.website
    };
}