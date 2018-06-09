export type AlbumTrackInDto = {
    duration: number,
    title: string,
    artist: string,
    release: Date,
    genre: Array<string>,
    originalTitle?: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string,
    file: string
}

export function mapToTrackInDto(track: any): AlbumTrackInDto {
    return <AlbumTrackInDto> {
        title: track.title,
        artist: track.artist,
        genre: track.genre,
        release: track.release,
        duration: track.duration,
        originalTitle: track.originalTitle,
        vocal: track.vocal,
        arrangement: track.arrangement,
        lyrics: track.lyrics,
        file: track.file
    }
}