export type Track = {
    _id?: string,
    album: string,
    albumThumbnail: string,
    trackNumber: number,
    originalTitle?: string,
    title: string,
    artist: string,
    duration: number,
    release: string,
    genre: Array<string>,
    file: string,
    format: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}