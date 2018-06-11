export type Album = {
    _id?: string,
    name: string,
    release: string,
    nbTracks: number,
    event: string,
    artist: string,
    duration?: number,
    thumbnail: string,
    website?: string
}