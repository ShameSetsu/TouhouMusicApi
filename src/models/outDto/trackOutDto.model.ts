export type TrackOutDto = {
    originalTitle?: string,
    title: string,
    artist: string,
    duration: string,
    release: Date,
    genre: Array<string>,
    url: string,
    vocal?: string,
    arrangement?: string,
    lyrics?: string
}