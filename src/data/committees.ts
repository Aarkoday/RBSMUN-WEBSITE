import committeesData from "./committees.json";
import committeesDaisData from "./committee-dais.json";

export const COMMITTEES = committeesData as {
    id: string;
    acronym: string;
    fullname: string;
    mandate: string;
    agenda?: string;
    email?: string;
    study_guide?: string;
}[];

export const COMMITTEE_DAIS_DATA = committeesDaisData as Record<
    string,
    { name: string; role: string; img: string; desc?: string; cabinet?: string }[]
>;

export const DEFAULT_DAIS = [
    { name: "To be announced", role: "Chairperson",      img: "chair.webp",      desc: "" },
    { name: "To be announced", role: "Vice Chairperson", img: "vice-chair.webp", desc: "" },
    { name: "To be announced", role: "Moderator",        img: "moderator.webp",  desc: "" },
];

export type Committee = (typeof COMMITTEES)[0];
