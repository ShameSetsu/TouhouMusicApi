import { MemberOutDto } from "./memberOutDto.model";

export type ArtistOutDto = {
    name: string,
    members: Array<MemberOutDto>,
    description: string,
    website?: string
}