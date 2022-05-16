export interface IProfile {
  id: number;
  displayName: string;
  avatar: string;
  cover: string;
  gender: string;
  country: string;
  role: string;
  company: string;
  position: string;
  email: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
  portfolioLink: string;
  school: string;
  follower: number;
  following: number;
  phoneNumber: string;
  about: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName: string;
  isPublic: boolean;
  role: string;
  profile: IProfile;
  avatar: string;
  displayName: string;
}
