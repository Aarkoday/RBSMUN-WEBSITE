import teamsData from "./teams.json";

export type MemberEntry = { name: string; role: string; img: string; desc?: string; img_position?: string; img_zoom?: number; card_position?: string; card_zoom?: number };

export const TEAMS = teamsData as Record<string, {
    id: string;
    title: string;
    desc: string;
    heads: MemberEntry[];
    core: MemberEntry[];
    group_position?: string;
    group_zoom?: number;
}>;
