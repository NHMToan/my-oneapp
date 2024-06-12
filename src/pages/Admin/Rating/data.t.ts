import { IUser } from "types/user";

export interface RatingData {
  name: string;
  description: string;
  start: string;
  id: string;
  end: string;
  votedFor?: RatingCandidateData;
  status: number;
  hidden: boolean;
}
export interface RatingCandidateData {
  id: string;
  name: string;
  createdAt: string;
  bio: string;
  photo1: string;
  photo2: string;
  photo3: string;
  order: number;
  video: string;
}
export interface RatingCandidateData {
  id: string;
  voter: IUser;
  createdAt: string;
  votedFor: RatingCandidateData;
  rating: RatingData;
  votedCount: number;
}
