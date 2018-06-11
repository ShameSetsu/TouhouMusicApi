export type Track = {
    _id?: string,
    album: string,
    trackNumber: number,
    originalTitle?: string,
    title: string,
    artist: string,
    duration: number,
    release: string,
    genre: Array<string>,
    file: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}