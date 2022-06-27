import { IProfile } from "types/user";

export interface ClubMemberData {
  profile: IProfile;
  club?: ClubData;
  status?: 1 | 2;
  role?: 1 | 2;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}
export interface ClubData {
  id: string;
  title: string;
  description: string;
  cover: string;
  publish: boolean;
  admin: IProfile;
  members: ClubMemberData[];
  memberCount: number;
  isRequesting: boolean;
  isMember: boolean;
  isAdmin: boolean;
  isSubAdmin: boolean;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  color: string;
  start: string;
  end: string;
  isAdmin: boolean;
  address: string;
  addressLink: string;
  slot: number;
  status: number;
  show: boolean;
  club: ClubData;
  createdBy: ClubMemberData;
  createdAt: string;
  updatedAt: string;
  voteCount: number;
}
export interface VoteData {
  id: string;
  value: number;
  member: ClubMemberData;
  createdAt: string;
  status: number;
}
