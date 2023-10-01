export interface IProfile {
  id: string;
  displayName: string;
  avatar: string;
  cover: string;
  gender: string;
  dob: string;
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
  friend: number;
  phoneNumber: string;
  about: string;
  isFollowing?: boolean;
  isFollower?: boolean;
  isFriendRequest?: boolean;
  isFriend?: boolean;
  isFriendSending?: boolean;
  status?: string;
  lastActivity?: string;
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
  hasClub?: boolean;
}
