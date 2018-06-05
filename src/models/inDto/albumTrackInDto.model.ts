export type AlbumTrackInDto = {
    originalTitle?: string,
    title: string,
    artist: string,
    release: Date,
    genre: Array<string>,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}

export function mapToTrackInDto(track: AlbumTrackInDto): AlbumTrackInDto {
    return <AlbumTrackInDto> {
        originalTitle: track.originalTitle,
        title: track.title,
        artist: track.artist,
        release: track.release,
        genre: track.genre,
        vocal: track.vocal,
        arrangement: track.arrangement,
        lyrics: track.lyrics
    }
}