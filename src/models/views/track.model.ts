export class Track {
    originalTitle?: string;
    title: string;
    artistId: string;
    duration: string;
    release: Date;
    genreIds: Array<string>;
    url: string;
    vocalId?: string;
    arrangementId?: string;
    lyrics?: string;
}