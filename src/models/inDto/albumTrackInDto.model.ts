export type AlbumTrackInDto = {
    duration: number,
    title: string,
    artist: string,
    release: Date,
    genre: Array<string>,
    file: string,
    originalTitle?: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}

export function mapToTrackInDto(track: AlbumTrackInDto): AlbumTrackInDto {
    return <AlbumTrackInDto> {
        title: track.title,
        artist: track.artist,
        genre: track.genre,
        release: track.release,
        duration: track.duration,
        file: track.file,
        originalTitle: track.originalTitle,
        vocal: track.vocal,
        arrangement: track.arrangement,
        lyrics: track.lyrics
    }
}