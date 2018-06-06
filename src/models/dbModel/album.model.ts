export type Album = {
    name: string,
    release: Date,
    nbTracks: number,
    event: string,
    artist: string,
    duration?: number,
    website?: string
}