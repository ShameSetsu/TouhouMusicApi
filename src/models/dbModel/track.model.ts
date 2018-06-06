export type Track = {
    originalTitle?: string,
    title: string,
    artist: string,
    duration: number,
    release: Date,
    genre: Array<string>,
    file: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}