import teamsData from "./teams.json";

export type MemberEntry = { name: string; role: string; img: string; desc?: string };

export const TEAMS = teamsData as Record<string, {
    id: string;
    title: string;
    desc: string;
    heads: MemberEntry[];
    core: MemberEntry[];
}>;
