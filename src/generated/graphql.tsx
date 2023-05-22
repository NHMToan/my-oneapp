import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Admin = {
  __typename?: 'Admin';
  account: Scalars['String'];
  id: Scalars['ID'];
};

export type AdminLoginInput = {
  account: Scalars['String'];
  password: Scalars['String'];
};

export type AdminMutationResponse = IMutationResponse & {
  __typename?: 'AdminMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<Admin>;
};

export type AdminRegisterInput = {
  account: Scalars['String'];
  key: Scalars['String'];
  password: Scalars['String'];
};

export type Candidates = {
  __typename?: 'Candidates';
  hasMore: Scalars['Boolean'];
  results: Array<RatingCandidate>;
  totalCount: Scalars['Float'];
};

export type Club = {
  __typename?: 'Club';
  admin: Profile;
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isMember: Scalars['Boolean'];
  isRequesting: Scalars['Boolean'];
  isSubAdmin: Scalars['Boolean'];
  memberCount: Scalars['Float'];
  members: Array<ClubMember>;
  publish: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ClubEvent = {
  __typename?: 'ClubEvent';
  address?: Maybe<Scalars['String']>;
  addressLink?: Maybe<Scalars['String']>;
  club: Club;
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: ClubMember;
  description: Scalars['String'];
  end: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isVoted: Scalars['Boolean'];
  maxVote?: Maybe<Scalars['Float']>;
  myConfirmedCount: Scalars['Float'];
  price?: Maybe<Scalars['Float']>;
  show: Scalars['Boolean'];
  slot: Scalars['Float'];
  start: Scalars['String'];
  status: Scalars['Float'];
  time?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  vote?: Maybe<Vote>;
  voteCount: Scalars['Float'];
  votes: Array<Vote>;
  waitingCount: Scalars['Float'];
};

export type ClubMember = {
  __typename?: 'ClubMember';
  club: Club;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isAdvanced: Scalars['Boolean'];
  isKicked?: Maybe<Scalars['Boolean']>;
  profile: Profile;
  role?: Maybe<Scalars['Float']>;
  status: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ClubMemberMutationResponse = IMutationResponse & {
  __typename?: 'ClubMemberMutationResponse';
  clubMember?: Maybe<ClubMember>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ClubMutationResponse = IMutationResponse & {
  __typename?: 'ClubMutationResponse';
  club?: Maybe<Club>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type ClubNote = {
  __typename?: 'ClubNote';
  club: Club;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images?: Maybe<Array<Scalars['String']>>;
  isPublic: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type ClubNoteMutationResponse = IMutationResponse & {
  __typename?: 'ClubNoteMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  note?: Maybe<ClubNote>;
  success: Scalars['Boolean'];
};

export type ClubNotes = {
  __typename?: 'ClubNotes';
  hasMore: Scalars['Boolean'];
  results: Array<ClubNote>;
  totalCount: Scalars['Float'];
};

export type Clubmembers = {
  __typename?: 'Clubmembers';
  hasMore: Scalars['Boolean'];
  results: Array<ClubMember>;
  totalCount: Scalars['Float'];
};

export type Clubs = {
  __typename?: 'Clubs';
  hasMore: Scalars['Boolean'];
  results: Array<Club>;
  totalCount: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  comment: Comment;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  replyComments?: Maybe<Array<Comment>>;
  updatedAt: Scalars['DateTime'];
};

export type CommentInput = {
  content: Scalars['String'];
  postId: Scalars['ID'];
};

export type CommentMutationResponse = IMutationResponse & {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Comments = {
  __typename?: 'Comments';
  hasMore: Scalars['Boolean'];
  results: Array<Comment>;
  totalCount: Scalars['Float'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  members: Array<Profile>;
  messages: Array<Message>;
  type: Scalars['String'];
  unreadCount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ConversationInput = {
  content: Scalars['String'];
  members: Array<Scalars['String']>;
};

export type ConversationMutationResponse = IMutationResponse & {
  __typename?: 'ConversationMutationResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Conversations = {
  __typename?: 'Conversations';
  error: Scalars['Boolean'];
  hasMore: Scalars['Boolean'];
  results: Array<Conversation>;
  totalCount: Scalars['Float'];
};

export type CreateClubInput = {
  coverFile: Scalars['Upload'];
  description: Scalars['String'];
  key: Scalars['String'];
  publish: Scalars['Boolean'];
  title: Scalars['String'];
};

export type CreateClubNoteInput = {
  clubId: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['Upload']>;
  isPublic: Scalars['Boolean'];
};

export type CreateEventInput = {
  address?: InputMaybe<Scalars['String']>;
  addressLink?: InputMaybe<Scalars['String']>;
  clubId: Scalars['String'];
  color: Scalars['String'];
  description: Scalars['String'];
  end: Scalars['String'];
  isInstant?: InputMaybe<Scalars['Boolean']>;
  maxVote: Scalars['Float'];
  price?: InputMaybe<Scalars['Float']>;
  slot: Scalars['Float'];
  start: Scalars['String'];
  time: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostInput = {
  allowComments: Scalars['Boolean'];
  content: Scalars['String'];
  coverFile: Scalars['Upload'];
  description?: InputMaybe<Scalars['String']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaKeywords?: InputMaybe<Array<Scalars['String']>>;
  metaTitle?: InputMaybe<Scalars['String']>;
  publish: Scalars['Boolean'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateRatingCandidateInput = {
  bio: Scalars['String'];
  name: Scalars['String'];
  photo1?: InputMaybe<Scalars['Upload']>;
  photo2?: InputMaybe<Scalars['Upload']>;
  photo3?: InputMaybe<Scalars['Upload']>;
};

export type CreateRatingInput = {
  description: Scalars['String'];
  end: Scalars['String'];
  name: Scalars['String'];
  start: Scalars['String'];
  status?: InputMaybe<Scalars['Float']>;
};

export type CreateVoteInput = {
  eventId: Scalars['String'];
  status: Scalars['Float'];
  value: Scalars['Float'];
};

export type EventMutationResponse = IMutationResponse & {
  __typename?: 'EventMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  event?: Maybe<ClubEvent>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EventVoteMutationResponse = IMutationResponse & {
  __typename?: 'EventVoteMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  vote?: Maybe<Vote>;
};

export type Events = {
  __typename?: 'Events';
  hasMore: Scalars['Boolean'];
  results: Array<ClubEvent>;
  totalCount: Scalars['Float'];
};

export type FbLoginInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Following = {
  __typename?: 'Following';
  createdAt: Scalars['DateTime'];
  followedTo: Profile;
  follower: Profile;
  id: Scalars['ID'];
};

export type FollowingMutaionResponse = IMutationResponse & {
  __typename?: 'FollowingMutaionResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  following?: Maybe<Following>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type FriendMutaionResponse = IMutationResponse & {
  __typename?: 'FriendMutaionResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  friendship?: Maybe<Friendship>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Friendship = {
  __typename?: 'Friendship';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  sendTo: Profile;
  sender: Profile;
  status: Scalars['Float'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  attachments?: Maybe<Array<Scalars['String']>>;
  content: Scalars['String'];
  contentType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isRead?: Maybe<Scalars['Boolean']>;
  sender: Profile;
};

export type MessageInput = {
  content?: InputMaybe<Scalars['String']>;
  conversationId: Scalars['ID'];
  image?: InputMaybe<Scalars['Upload']>;
};

export type Messages = {
  __typename?: 'Messages';
  error?: Maybe<Scalars['Boolean']>;
  hasMore: Scalars['Boolean'];
  results: Array<Message>;
  totalCount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoin: ClubMutationResponse;
  addFriend: FriendMutaionResponse;
  addNewConversation: ConversationMutationResponse;
  addNewMessage: Scalars['Boolean'];
  adminChangePassUser: UserMutationResponse;
  adminLogin: AdminMutationResponse;
  adminLogout: AdminMutationResponse;
  adminRegister: AdminMutationResponse;
  adminSetAvatar: UserMutationResponse;
  adminSetEmail: UserMutationResponse;
  adminSetRole: UserMutationResponse;
  adminSetStatus: UserMutationResponse;
  cancelRequest: ClubMutationResponse;
  cancelRequestClub: ClubMutationResponse;
  changeAdmin: ClubMutationResponse;
  changeClubNoteStatus: ClubNoteMutationResponse;
  changeEventStatus: EventMutationResponse;
  changeEventVote: EventMutationResponse;
  changePassword: UserMutationResponse;
  changeSlots: EventMutationResponse;
  commentPost: CommentMutationResponse;
  createCandidate: RatingMutationResponse;
  createClub: ClubMutationResponse;
  createClubNote: ClubNoteMutationResponse;
  createEvent: EventMutationResponse;
  createPost: PostMutationResponse;
  createRating: RatingMutationResponse;
  deleteCandidate: RatingMutationResponse;
  deleteClub: ClubMutationResponse;
  deleteClubMember: ClubMutationResponse;
  deleteClubNote: ClubNoteMutationResponse;
  deleteComment: CommentMutationResponse;
  deleteEvent: EventMutationResponse;
  deleteFriendShip: FriendMutaionResponse;
  deletePost: PostMutationResponse;
  deleteRating: RatingMutationResponse;
  fbLogin: UserMutationResponse;
  follow: FollowingMutaionResponse;
  forgotPassword: UserMutationResponse;
  like: MutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
  noteVote: EventVoteMutationResponse;
  readAllNotis: Scalars['Boolean'];
  register: UserMutationResponse;
  replyComment: CommentMutationResponse;
  requestJoinClub: ClubMutationResponse;
  setConversationRead: ConversationMutationResponse;
  setIsAdvanced: ClubMemberMutationResponse;
  setRole: ClubMutationResponse;
  unFollow: FollowingMutaionResponse;
  unVoteEvent: EventMutationResponse;
  updateCandidate: RatingMutationResponse;
  updateClub: ClubMutationResponse;
  updateClubNote: ClubNoteMutationResponse;
  updateEvent: EventMutationResponse;
  updatePost: PostMutationResponse;
  updateProfile: ProfileMutationResponse;
  updateRating: RatingMutationResponse;
  updateUser: UserMutationResponse;
  voteCandidate: RatingMutationResponse;
  voteChangePaid: EventVoteMutationResponse;
  voteEvent: EventMutationResponse;
};


export type MutationAcceptJoinArgs = {
  id: Scalars['ID'];
};


export type MutationAddFriendArgs = {
  toId: Scalars['ID'];
};


export type MutationAddNewConversationArgs = {
  converInput: ConversationInput;
};


export type MutationAddNewMessageArgs = {
  messageInput: MessageInput;
};


export type MutationAdminChangePassUserArgs = {
  newPassword: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationAdminLoginArgs = {
  adminLoginInput: AdminLoginInput;
};


export type MutationAdminLogoutArgs = {
  userId: Scalars['ID'];
};


export type MutationAdminRegisterArgs = {
  adminRegisterInput: AdminRegisterInput;
};


export type MutationAdminSetAvatarArgs = {
  profileId: Scalars['ID'];
  updateProfileInput: UpdateProfileInput;
};


export type MutationAdminSetEmailArgs = {
  email: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationAdminSetRoleArgs = {
  newRole: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationAdminSetStatusArgs = {
  status?: InputMaybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type MutationCancelRequestArgs = {
  memId: Scalars['ID'];
};


export type MutationCancelRequestClubArgs = {
  clubId: Scalars['ID'];
};


export type MutationChangeAdminArgs = {
  clubId: Scalars['ID'];
  memberId: Scalars['ID'];
};


export type MutationChangeClubNoteStatusArgs = {
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
};


export type MutationChangeEventStatusArgs = {
  id: Scalars['ID'];
  status: Scalars['Int'];
};


export type MutationChangeEventVoteArgs = {
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
  voteId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  code: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationChangeSlotsArgs = {
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
  status: Scalars['Int'];
};


export type MutationCommentPostArgs = {
  commentInput: CommentInput;
};


export type MutationCreateCandidateArgs = {
  createCandidateInput: CreateRatingCandidateInput;
  ratingId: Scalars['ID'];
};


export type MutationCreateClubArgs = {
  createClubInput: CreateClubInput;
};


export type MutationCreateClubNoteArgs = {
  createClubNoteInput: CreateClubNoteInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationCreateRatingArgs = {
  createRatingInput: CreateRatingInput;
};


export type MutationDeleteCandidateArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubMemberArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubNoteArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFriendShipArgs = {
  toId: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRatingArgs = {
  id: Scalars['ID'];
};


export type MutationFbLoginArgs = {
  fbLoginInput: FbLoginInput;
};


export type MutationFollowArgs = {
  followId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLikeArgs = {
  postId: Scalars['ID'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLogoutArgs = {
  userId: Scalars['ID'];
};


export type MutationNoteVoteArgs = {
  note: Scalars['String'];
  voteId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationReplyCommentArgs = {
  replyCommentInput: ReplyCommentInput;
};


export type MutationRequestJoinClubArgs = {
  id: Scalars['ID'];
};


export type MutationSetConversationReadArgs = {
  converId: Scalars['ID'];
};


export type MutationSetIsAdvancedArgs = {
  isAdvanced: Scalars['Boolean'];
  memberId: Scalars['ID'];
};


export type MutationSetRoleArgs = {
  id: Scalars['ID'];
  role: Scalars['Int'];
};


export type MutationUnFollowArgs = {
  followId: Scalars['ID'];
};


export type MutationUnVoteEventArgs = {
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  voteId: Scalars['ID'];
};


export type MutationUpdateCandidateArgs = {
  id: Scalars['String'];
  updateCandidateInput: CreateRatingCandidateInput;
};


export type MutationUpdateClubArgs = {
  id: Scalars['String'];
  updateClubInput: UpdateClubInput;
};


export type MutationUpdateClubNoteArgs = {
  id: Scalars['ID'];
  updateClubNoteInput: UpdateClubNoteInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID'];
  updateEventInput: UpdateEventInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdateRatingArgs = {
  id: Scalars['ID'];
  updateRatingInput: CreateRatingInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVoteCandidateArgs = {
  candidateId: Scalars['ID'];
  ratingId: Scalars['ID'];
};


export type MutationVoteChangePaidArgs = {
  payStatus: Scalars['String'];
  voteId: Scalars['ID'];
};


export type MutationVoteEventArgs = {
  createVoteInput: CreateVoteInput;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type NewNotiSubscriptionData = {
  __typename?: 'NewNotiSubscriptionData';
  notification: UserNotification;
  profileId: Scalars['String'];
};

export type NewVoteSubscriptionData = {
  __typename?: 'NewVoteSubscriptionData';
  eventId: Scalars['String'];
  status: Scalars['Float'];
  voteCount?: Maybe<Scalars['Float']>;
  waitingCount?: Maybe<Scalars['Float']>;
};

export type Notification = {
  __typename?: 'Notification';
  action_object?: Maybe<Scalars['String']>;
  actor_avatar?: Maybe<Scalars['String']>;
  actor_name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  messageKey: Scalars['String'];
};

export type Notifications = {
  __typename?: 'Notifications';
  results: Array<UserNotification>;
  totalCount: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  allowComments: Scalars['Boolean'];
  author: User;
  comment: Scalars['Float'];
  comments: Array<Comment>;
  content: Scalars['String'];
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  favorite: Scalars['Float'];
  favoritePerson?: Maybe<Array<User>>;
  id: Scalars['ID'];
  metaDescription?: Maybe<Scalars['String']>;
  metaKeywords?: Maybe<Array<Scalars['String']>>;
  metaTitle?: Maybe<Scalars['String']>;
  publish: Scalars['Boolean'];
  tags?: Maybe<Array<Scalars['String']>>;
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PostMutationResponse = IMutationResponse & {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Posts = {
  __typename?: 'Posts';
  hasMore: Scalars['Boolean'];
  results: Array<Post>;
  totalCount: Scalars['Float'];
};

export type Profile = {
  __typename?: 'Profile';
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  conversations: Array<Conversation>;
  country?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebookLink?: Maybe<Scalars['String']>;
  follower: Scalars['Float'];
  followers: Array<Following>;
  following: Scalars['Float'];
  followings: Array<Following>;
  friend: Scalars['Float'];
  friends: Array<Friendship>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instagramLink?: Maybe<Scalars['String']>;
  isFollowing: Scalars['Boolean'];
  isFriend: Scalars['Boolean'];
  isFriendRequest: Scalars['Boolean'];
  isFriendSending: Scalars['Boolean'];
  linkedinLink?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  portfolioLink?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  school?: Maybe<Scalars['String']>;
  status: Scalars['Float'];
  twitterLink?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProfileMutationResponse = IMutationResponse & {
  __typename?: 'ProfileMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  success: Scalars['Boolean'];
};

export type Profiles = {
  __typename?: 'Profiles';
  hasMore: Scalars['Boolean'];
  results: Array<Profile>;
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  club?: Maybe<Club>;
  clubNotes?: Maybe<ClubNotes>;
  clubmembers?: Maybe<Clubmembers>;
  clubs?: Maybe<Clubs>;
  comments?: Maybe<Comments>;
  getCandidates?: Maybe<Candidates>;
  getClubRequestingNumber?: Maybe<Scalars['Float']>;
  getConversation?: Maybe<Conversation>;
  getConversations?: Maybe<Conversations>;
  getEvent?: Maybe<ClubEvent>;
  getEventIsVoted: Scalars['Boolean'];
  getEvents?: Maybe<Events>;
  getFollowers?: Maybe<Profiles>;
  getFriends?: Maybe<Profiles>;
  getMemberVotes?: Maybe<Votes>;
  getMessages?: Maybe<Messages>;
  getMyHistoryVotes?: Maybe<Votes>;
  getMyVotes?: Maybe<Votes>;
  getNotifications?: Maybe<Notifications>;
  getProfile?: Maybe<Profile>;
  getProfiles?: Maybe<Profiles>;
  getRatingVotes?: Maybe<RatingVotes>;
  getUnreadCount?: Maybe<Scalars['Float']>;
  getUsers?: Maybe<Users>;
  getVoteCount: Scalars['Float'];
  getVoteStats?: Maybe<VotCount>;
  getVotes?: Maybe<Votes>;
  getWaitingVote: Scalars['Float'];
  hello: Scalars['Float'];
  me?: Maybe<User>;
  myClubNotes?: Maybe<ClubNotes>;
  myConfirmedEvents?: Maybe<Events>;
  myEvents?: Maybe<Events>;
  myEventsCount?: Maybe<Scalars['Float']>;
  myProfile?: Maybe<Profile>;
  myRatings?: Maybe<Ratings>;
  post?: Maybe<Post>;
  posts?: Maybe<Posts>;
  rating?: Maybe<Rating>;
  ratings?: Maybe<Ratings>;
  users: Array<User>;
};


export type QueryClubArgs = {
  id: Scalars['ID'];
};


export type QueryClubNotesArgs = {
  clubId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
};


export type QueryClubmembersArgs = {
  clubId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['Int']>;
  searchName?: InputMaybe<Scalars['String']>;
  status: Scalars['Int'];
};


export type QueryClubsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
};


export type QueryCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
};


export type QueryGetCandidatesArgs = {
  ratingId: Scalars['ID'];
};


export type QueryGetClubRequestingNumberArgs = {
  clubId: Scalars['ID'];
};


export type QueryGetConversationArgs = {
  id: Scalars['ID'];
};


export type QueryGetConversationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetEventArgs = {
  id: Scalars['ID'];
};


export type QueryGetEventIsVotedArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetEventsArgs = {
  clubId: Scalars['String'];
  dateAfter?: InputMaybe<Scalars['String']>;
  dateBefore?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetFollowersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  profileId: Scalars['String'];
};


export type QueryGetFriendsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  profileId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetMemberVotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  memberId: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMessagesArgs = {
  conversationId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMyHistoryVotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMyVotesArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetProfileArgs = {
  id: Scalars['ID'];
};


export type QueryGetProfilesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRatingVotesArgs = {
  candidateId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetVoteCountArgs = {
  id: Scalars['ID'];
};


export type QueryGetVoteStatsArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetVotesArgs = {
  eventId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['Int']>;
};


export type QueryGetWaitingVoteArgs = {
  id: Scalars['ID'];
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
};


export type QueryRatingArgs = {
  id: Scalars['ID'];
};


export type QueryRatingsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  candidates: Array<RatingCandidate>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  end: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  start: Scalars['String'];
  status: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  votedFor?: Maybe<RatingCandidate>;
};

export type RatingCandidate = {
  __typename?: 'RatingCandidate';
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  order?: Maybe<Scalars['Float']>;
  photo1: Scalars['String'];
  photo2?: Maybe<Scalars['String']>;
  photo3?: Maybe<Scalars['String']>;
  votes: Array<RatingVote>;
};

export type RatingMutationResponse = IMutationResponse & {
  __typename?: 'RatingMutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type RatingVote = {
  __typename?: 'RatingVote';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  rating: Rating;
  votedFor: RatingCandidate;
  voter: User;
};

export type RatingVotes = {
  __typename?: 'RatingVotes';
  hasMore: Scalars['Boolean'];
  results: Array<RatingVote>;
  totalCount: Scalars['Float'];
};

export type Ratings = {
  __typename?: 'Ratings';
  hasMore: Scalars['Boolean'];
  results: Array<Rating>;
  totalCount: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type ReplyCommentInput = {
  commentId: Scalars['ID'];
  content: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationChanged: Conversation;
  newConversation: Conversation;
  newMessageSent: Message;
  newNotification: NewNotiSubscriptionData;
  voteChanged: NewVoteSubscriptionData;
};


export type SubscriptionConversationChangedArgs = {
  profileId: Scalars['ID'];
};


export type SubscriptionNewMessageSentArgs = {
  conversationId: Scalars['ID'];
};


export type SubscriptionNewNotificationArgs = {
  profileId: Scalars['ID'];
};


export type SubscriptionVoteChangedArgs = {
  eventId: Scalars['ID'];
  status: Scalars['Int'];
};

export type UpdateClubInput = {
  coverFile?: InputMaybe<Scalars['Upload']>;
  description: Scalars['String'];
  publish: Scalars['Boolean'];
  title: Scalars['String'];
};

export type UpdateClubNoteInput = {
  description: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type UpdateEventInput = {
  address?: InputMaybe<Scalars['String']>;
  addressLink?: InputMaybe<Scalars['String']>;
  color: Scalars['String'];
  description: Scalars['String'];
  end: Scalars['String'];
  maxVote: Scalars['Float'];
  price?: InputMaybe<Scalars['Float']>;
  slot: Scalars['Float'];
  start: Scalars['String'];
  time?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdatePostInput = {
  allowComments: Scalars['Boolean'];
  content: Scalars['String'];
  coverFile?: InputMaybe<Scalars['Upload']>;
  description?: InputMaybe<Scalars['String']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaKeywords?: InputMaybe<Array<Scalars['String']>>;
  metaTitle?: InputMaybe<Scalars['String']>;
  publish: Scalars['Boolean'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  avatarFile?: InputMaybe<Scalars['Upload']>;
  category?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  coverFile?: InputMaybe<Scalars['Upload']>;
  displayName?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  facebookLink?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  instagramLink?: InputMaybe<Scalars['String']>;
  linkedinLink?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  portfolioLink?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<Scalars['String']>;
  twitterLink?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  favoritePosts: Array<Post>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  lastName: Scalars['String'];
  profile: Profile;
  provider?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  status: Scalars['Float'];
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserNotification = {
  __typename?: 'UserNotification';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  is_read: Scalars['Boolean'];
  is_seen: Scalars['Boolean'];
  notification: Notification;
  profile: Profile;
  read_at: Scalars['DateTime'];
};

export type Users = {
  __typename?: 'Users';
  hasMore: Scalars['Boolean'];
  results: Array<User>;
  totalCount: Scalars['Float'];
};

export type VotCount = {
  __typename?: 'VotCount';
  confirmed: Scalars['Float'];
  total: Scalars['Float'];
  waiting: Scalars['Float'];
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['DateTime'];
  event: ClubEvent;
  id: Scalars['ID'];
  member: ClubMember;
  note?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['String']>;
  status: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['Int'];
};

export type Votes = {
  __typename?: 'Votes';
  hasMore: Scalars['Boolean'];
  results: Array<Vote>;
  totalCount: Scalars['Float'];
};

export type MessageInfoFragment = { __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } };

export type ConversationInfoFragment = { __typename?: 'Conversation', id: string, type: string, updatedAt: any, isRead: boolean, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null, instagramLink?: string | null, portfolioLink?: string | null, twitterLink?: string | null, linkedinLink?: string | null, facebookLink?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> };

export type ConversationMutationResponseFragment = { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null, conversation?: { __typename?: 'Conversation', id: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubMutationResponseFragment = { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubMemberMutationResponseFragment = { __typename?: 'ClubMemberMutationResponse', code: number, success: boolean, message?: string | null, clubMember?: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubInfoFragment = { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } };

export type ClubMemberInfoFragment = { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } };

export type ClubNoteMutationResponseFragment = { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null, note?: { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubNoteInfoFragment = { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null };

export type CommentInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null };

export type CommentMutationResponseFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CommentWithUserInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type EventMutationResponseFragment = { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type EventVoteMutationResponseFragment = { __typename?: 'EventVoteMutationResponse', code: number, success: boolean, message?: string | null, vote?: { __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type EventInfoFragment = { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } };

export type VoteInfoFragment = { __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

type MutationStatuses_AdminMutationResponse_Fragment = { __typename?: 'AdminMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ClubMemberMutationResponse_Fragment = { __typename?: 'ClubMemberMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ClubMutationResponse_Fragment = { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ClubNoteMutationResponse_Fragment = { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_CommentMutationResponse_Fragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ConversationMutationResponse_Fragment = { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_EventMutationResponse_Fragment = { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_EventVoteMutationResponse_Fragment = { __typename?: 'EventVoteMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_FollowingMutaionResponse_Fragment = { __typename?: 'FollowingMutaionResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_FriendMutaionResponse_Fragment = { __typename?: 'FriendMutaionResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_MutationResponse_Fragment = { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ProfileMutationResponse_Fragment = { __typename?: 'ProfileMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_RatingMutationResponse_Fragment = { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type MutationStatusesFragment = MutationStatuses_AdminMutationResponse_Fragment | MutationStatuses_ClubMemberMutationResponse_Fragment | MutationStatuses_ClubMutationResponse_Fragment | MutationStatuses_ClubNoteMutationResponse_Fragment | MutationStatuses_CommentMutationResponse_Fragment | MutationStatuses_ConversationMutationResponse_Fragment | MutationStatuses_EventMutationResponse_Fragment | MutationStatuses_EventVoteMutationResponse_Fragment | MutationStatuses_FollowingMutaionResponse_Fragment | MutationStatuses_FriendMutaionResponse_Fragment | MutationStatuses_MutationResponse_Fragment | MutationStatuses_PostMutationResponse_Fragment | MutationStatuses_ProfileMutationResponse_Fragment | MutationStatuses_RatingMutationResponse_Fragment | MutationStatuses_UserMutationResponse_Fragment;

export type UserMutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type PostMutationStatusesFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

export type CommentMutationStatusesFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

export type NotificationInfoFragment = { __typename?: 'Notification', id: string, createdAt: any, messageKey: string, amount?: number | null, action_object?: string | null, actor_name?: string | null, actor_avatar?: string | null };

export type UserNotificationInfoFragment = { __typename?: 'UserNotification', id: string, createdAt: any, is_read: boolean, is_seen: boolean, notification: { __typename?: 'Notification', id: string, createdAt: any, messageKey: string, amount?: number | null, action_object?: string | null, actor_name?: string | null, actor_avatar?: string | null }, profile: { __typename?: 'Profile', id: string } };

export type PostMutationResponseFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type PostWithUserInfoFragment = { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type ProfileInfoFragment = { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null };

export type RatingMutationResponseFragment = { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type RatingInfoFragment = { __typename?: 'Rating', id: string, name: string, description?: string | null, start: string, end: string, createdAt: any, updatedAt: any, status: number };

export type RatingCandidateInfoFragment = { __typename?: 'RatingCandidate', id: string, name: string, bio?: string | null, createdAt: any, order?: number | null, photo1: string, photo2?: string | null };

export type RatingVoteInfoFragment = { __typename?: 'RatingVote', id: string, createdAt: any, voter: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } };

export type ChangePasswordMutationVariables = Exact<{
  code: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type AddConversationMutationVariables = Exact<{
  input: ConversationInput;
}>;


export type AddConversationMutation = { __typename?: 'Mutation', addNewConversation: { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null, conversation?: { __typename?: 'Conversation', id: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateMessageMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', addNewMessage: boolean };

export type SetConversationReadMutationVariables = Exact<{
  converId: Scalars['ID'];
}>;


export type SetConversationReadMutation = { __typename?: 'Mutation', setConversationRead: { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null, conversation?: { __typename?: 'Conversation', id: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteClubMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteClubMutation = { __typename?: 'Mutation', deleteClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null } };

export type CreateClubMutationVariables = Exact<{
  createClubInput: CreateClubInput;
}>;


export type CreateClubMutation = { __typename?: 'Mutation', createClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateClubMutationVariables = Exact<{
  id: Scalars['String'];
  updateClubInput: UpdateClubInput;
}>;


export type UpdateClubMutation = { __typename?: 'Mutation', updateClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeAdminMutationVariables = Exact<{
  memberId: Scalars['ID'];
  clubId: Scalars['ID'];
}>;


export type ChangeAdminMutation = { __typename?: 'Mutation', changeAdmin: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RequestJoinClubMutationVariables = Exact<{
  clubId: Scalars['ID'];
}>;


export type RequestJoinClubMutation = { __typename?: 'Mutation', requestJoinClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AcceptJoinClubMutationVariables = Exact<{
  clubMemId: Scalars['ID'];
}>;


export type AcceptJoinClubMutation = { __typename?: 'Mutation', acceptJoin: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetRoleMutationVariables = Exact<{
  clubMemId: Scalars['ID'];
  role: Scalars['Int'];
}>;


export type SetRoleMutation = { __typename?: 'Mutation', setRole: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetIsAdvancedMutationVariables = Exact<{
  memberId: Scalars['ID'];
  isAdvanced: Scalars['Boolean'];
}>;


export type SetIsAdvancedMutation = { __typename?: 'Mutation', setIsAdvanced: { __typename?: 'ClubMemberMutationResponse', code: number, success: boolean, message?: string | null, clubMember?: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteClubMemberMutationVariables = Exact<{
  clubMemId: Scalars['ID'];
}>;


export type DeleteClubMemberMutation = { __typename?: 'Mutation', deleteClubMember: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CancelRequestClubMutationVariables = Exact<{
  clubId: Scalars['ID'];
}>;


export type CancelRequestClubMutation = { __typename?: 'Mutation', cancelRequestClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CancelRequestMutationVariables = Exact<{
  memId: Scalars['ID'];
}>;


export type CancelRequestMutation = { __typename?: 'Mutation', cancelRequest: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateClubNoteMutationVariables = Exact<{
  createClubNoteInput: CreateClubNoteInput;
}>;


export type CreateClubNoteMutation = { __typename?: 'Mutation', createClubNote: { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null, note?: { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateClubNoteMutationVariables = Exact<{
  id: Scalars['ID'];
  updateClubNoteInput: UpdateClubNoteInput;
}>;


export type UpdateClubNoteMutation = { __typename?: 'Mutation', updateClubNote: { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null, note?: { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeClubNoteStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
}>;


export type ChangeClubNoteStatusMutation = { __typename?: 'Mutation', changeClubNoteStatus: { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null, note?: { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteClubNoteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteClubNoteMutation = { __typename?: 'Mutation', deleteClubNote: { __typename?: 'ClubNoteMutationResponse', code: number, success: boolean, message?: string | null, note?: { __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateVoteEventMutationVariables = Exact<{
  createVoteInput: CreateVoteInput;
}>;


export type CreateVoteEventMutation = { __typename?: 'Mutation', voteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UnVoteEventMutationVariables = Exact<{
  voteId: Scalars['ID'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
}>;


export type UnVoteEventMutation = { __typename?: 'Mutation', unVoteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeEventVoteMutationVariables = Exact<{
  voteId: Scalars['ID'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
}>;


export type ChangeEventVoteMutation = { __typename?: 'Mutation', changeEventVote: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeSlotsMutationVariables = Exact<{
  status: Scalars['Int'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
}>;


export type ChangeSlotsMutation = { __typename?: 'Mutation', changeSlots: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID'];
  updateEventInput: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeEventStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: Scalars['Int'];
}>;


export type ChangeEventStatusMutation = { __typename?: 'Mutation', changeEventStatus: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type VoteChangePaidMutationVariables = Exact<{
  voteId: Scalars['ID'];
  payStatus: Scalars['String'];
}>;


export type VoteChangePaidMutation = { __typename?: 'Mutation', voteChangePaid: { __typename?: 'EventVoteMutationResponse', code: number, success: boolean, message?: string | null, vote?: { __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type NoteVoteMutationVariables = Exact<{
  voteId: Scalars['ID'];
  note: Scalars['String'];
}>;


export type NoteVoteMutation = { __typename?: 'Mutation', noteVote: { __typename?: 'EventVoteMutationResponse', code: number, success: boolean, message?: string | null, vote?: { __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type FollowUserMutationVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', follow: { __typename?: 'FollowingMutaionResponse', code: number, success: boolean, message?: string | null } };

export type UnFollowUserMutationVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type UnFollowUserMutation = { __typename?: 'Mutation', unFollow: { __typename?: 'FollowingMutaionResponse', code: number, success: boolean, message?: string | null } };

export type ForgotpasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotpasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type AddFriendMutationVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'FriendMutaionResponse', code: number, success: boolean, message?: string | null } };

export type DeleteFriendShipMutationVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type DeleteFriendShipMutation = { __typename?: 'Mutation', deleteFriendShip: { __typename?: 'FriendMutaionResponse', code: number, success: boolean, message?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } | null } };

export type FbLoginMutationVariables = Exact<{
  fbLoginInput: FbLoginInput;
}>;


export type FbLoginMutation = { __typename?: 'Mutation', fbLogin: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } | null } };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserMutationResponse', code: number, success: boolean } };

export type ReadAllNotificationMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllNotificationMutation = { __typename?: 'Mutation', readAllNotis: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LikeMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null } };

export type CommentPostMutationVariables = Exact<{
  commentInput: CommentInput;
}>;


export type CommentPostMutation = { __typename?: 'Mutation', commentPost: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null } };

export type ReplyCommentMutationVariables = Exact<{
  replyCommentInput: ReplyCommentInput;
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyComment: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteRatingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRatingMutation = { __typename?: 'Mutation', deleteRating: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null } };

export type CreateRatingMutationVariables = Exact<{
  createRatingInput: CreateRatingInput;
}>;


export type CreateRatingMutation = { __typename?: 'Mutation', createRating: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateRatingMutationVariables = Exact<{
  id: Scalars['ID'];
  updateRatingInput: CreateRatingInput;
}>;


export type UpdateRatingMutation = { __typename?: 'Mutation', updateRating: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCandidateMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCandidateMutation = { __typename?: 'Mutation', deleteCandidate: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null } };

export type CreateCandidateMutationVariables = Exact<{
  ratingId: Scalars['ID'];
  createCandidateInput: CreateRatingCandidateInput;
}>;


export type CreateCandidateMutation = { __typename?: 'Mutation', createCandidate: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateCandidateMutationVariables = Exact<{
  id: Scalars['String'];
  updateCandidateInput: CreateRatingCandidateInput;
}>;


export type UpdateCandidateMutation = { __typename?: 'Mutation', updateCandidate: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type VoteCandidateMutationVariables = Exact<{
  ratingId: Scalars['ID'];
  candidateId: Scalars['ID'];
}>;


export type VoteCandidateMutation = { __typename?: 'Mutation', voteCandidate: { __typename?: 'RatingMutationResponse', code: number, success: boolean, message?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } | null } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ProfileMutationResponse', code: number, success: boolean, message?: string | null, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } | null } };

export type ConversationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type ConversationsQuery = { __typename?: 'Query', getConversations?: { __typename?: 'Conversations', totalCount: number, hasMore: boolean, error: boolean, results: Array<{ __typename?: 'Conversation', id: string, type: string, updatedAt: any, isRead: boolean, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null, instagramLink?: string | null, portfolioLink?: string | null, twitterLink?: string | null, linkedinLink?: string | null, facebookLink?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> }> } | null };

export type GetMessagesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  conversationId: Scalars['ID'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'Messages', totalCount: number, hasMore: boolean, error?: boolean | null, results: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } | null };

export type ConversationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConversationQuery = { __typename?: 'Query', getConversation?: { __typename?: 'Conversation', id: string, type: string, updatedAt: any, isRead: boolean, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null, instagramLink?: string | null, portfolioLink?: string | null, twitterLink?: string | null, linkedinLink?: string | null, facebookLink?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } | null };

export type ClubQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ClubQuery = { __typename?: 'Query', club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null };

export type ClubsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  ordering?: InputMaybe<Scalars['String']>;
}>;


export type ClubsQuery = { __typename?: 'Query', clubs?: { __typename?: 'Clubs', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } }> } | null };

export type GetClubRequestingNumberQueryVariables = Exact<{
  clubId: Scalars['ID'];
}>;


export type GetClubRequestingNumberQuery = { __typename?: 'Query', getClubRequestingNumber?: number | null };

export type ClubMembersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  clubId: Scalars['ID'];
  status: Scalars['Int'];
  role?: InputMaybe<Scalars['Int']>;
  searchName?: InputMaybe<Scalars['String']>;
  ordering?: InputMaybe<Scalars['String']>;
}>;


export type ClubMembersQuery = { __typename?: 'Query', clubmembers?: { __typename?: 'Clubmembers', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } }> } | null };

export type MyClubNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyClubNotesQuery = { __typename?: 'Query', myClubNotes?: { __typename?: 'ClubNotes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null, club: { __typename?: 'Club', id: string, title: string } }> } | null };

export type ClubNotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  clubId: Scalars['ID'];
}>;


export type ClubNotesQuery = { __typename?: 'Query', clubNotes?: { __typename?: 'ClubNotes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubNote', id: string, description: string, createdAt: any, updatedAt: any, isPublic: boolean, images?: Array<string> | null, club: { __typename?: 'Club', id: string, title: string } }> } | null };

export type CommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'Comments', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null }> } | null };

export type EventQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EventQuery = { __typename?: 'Query', getEvent?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } } | null };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  dateBefore: Scalars['String'];
  dateAfter: Scalars['String'];
  clubId: Scalars['String'];
}>;


export type EventsQuery = { __typename?: 'Query', getEvents?: { __typename?: 'Events', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type MyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsQuery = { __typename?: 'Query', myEvents?: { __typename?: 'Events', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type MyConfirmedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyConfirmedEventsQuery = { __typename?: 'Query', myEvents?: { __typename?: 'Events', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubEvent', myConfirmedCount: number, id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type MyEventsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsCountQuery = { __typename?: 'Query', myEventsCount?: number | null };

export type GetVotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  status: Scalars['Int'];
  eventId: Scalars['ID'];
}>;


export type GetVotesQuery = { __typename?: 'Query', getVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type GetVoteStatsQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetVoteStatsQuery = { __typename?: 'Query', getVoteStats?: { __typename?: 'VotCount', confirmed: number, waiting: number, total: number } | null };

export type GetMyVotesQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetMyVotesQuery = { __typename?: 'Query', getMyVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type GetMyHistoryVotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetMyHistoryVotesQuery = { __typename?: 'Query', getMyHistoryVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type GetMemberVotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  memberId: Scalars['String'];
}>;


export type GetMemberVotesQuery = { __typename?: 'Query', getMemberVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, paid?: string | null, note?: string | null, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, isAdvanced: boolean, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }, club: { __typename?: 'Club', id: string, title: string } } }> } | null };

export type GetVoteCountQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetVoteCountQuery = { __typename?: 'Query', getVoteCount: number };

export type GetWaitingVoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWaitingVoteQuery = { __typename?: 'Query', getWaitingVote: number };

export type GetEventIsVotedQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetEventIsVotedQuery = { __typename?: 'Query', getEventIsVoted: boolean };

export type GetFollowersQueryVariables = Exact<{
  profileId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers?: { __typename?: 'Profiles', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Profile', isFollowing: boolean, id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }> } | null };

export type GetFriendsQueryVariables = Exact<{
  profileId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type GetFriendsQuery = { __typename?: 'Query', getFriends?: { __typename?: 'Profiles', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Profile', isFollowing: boolean, id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }> } | null };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getProfile?: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } | null };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } | null };

export type GetNotificationsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications?: { __typename?: 'Notifications', totalCount: number, results: Array<{ __typename?: 'UserNotification', id: string, createdAt: any, is_read: boolean, is_seen: boolean, notification: { __typename?: 'Notification', id: string, createdAt: any, messageKey: string, amount?: number | null, action_object?: string | null, actor_name?: string | null, actor_avatar?: string | null }, profile: { __typename?: 'Profile', id: string } }> } | null };

export type GetNotiUnreadCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotiUnreadCountQuery = { __typename?: 'Query', getUnreadCount?: number | null };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, favoritePerson?: Array<{ __typename?: 'User', id: string, avatar: string, displayName: string }> | null, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  ordering?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'Posts', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> } | null };

export type ProfilesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  ordering?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ProfilesQuery = { __typename?: 'Query', getProfiles?: { __typename?: 'Profiles', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null }> } | null };

export type RatingsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  ordering?: InputMaybe<Scalars['String']>;
}>;


export type RatingsQuery = { __typename?: 'Query', ratings?: { __typename?: 'Ratings', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Rating', id: string, name: string, description?: string | null, start: string, end: string, createdAt: any, updatedAt: any, status: number }> } | null };

export type MyRatingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRatingsQuery = { __typename?: 'Query', myRatings?: { __typename?: 'Ratings', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Rating', id: string, name: string, description?: string | null, start: string, end: string, createdAt: any, updatedAt: any, status: number, votedFor?: { __typename?: 'RatingCandidate', id: string, name: string, bio?: string | null, createdAt: any, order?: number | null, photo1: string, photo2?: string | null } | null }> } | null };

export type RatingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RatingQuery = { __typename?: 'Query', rating?: { __typename?: 'Rating', id: string, name: string, description?: string | null, start: string, end: string, createdAt: any, updatedAt: any, status: number } | null };

export type GetCandidatesQueryVariables = Exact<{
  ratingId: Scalars['ID'];
}>;


export type GetCandidatesQuery = { __typename?: 'Query', getCandidates?: { __typename?: 'Candidates', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'RatingCandidate', id: string, name: string, bio?: string | null, createdAt: any, order?: number | null, photo1: string, photo2?: string | null }> } | null };

export type GetRatingVoteQueryVariables = Exact<{
  candidateId: Scalars['ID'];
}>;


export type GetRatingVoteQuery = { __typename?: 'Query', getRatingVotes?: { __typename?: 'RatingVotes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'RatingVote', id: string, createdAt: any, voter: { __typename?: 'User', id: string, email: string, lastName: string, firstName?: string | null, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string } } }> } | null };

export type MessageSendSubscriptionSubscriptionVariables = Exact<{
  conversationId: Scalars['ID'];
}>;


export type MessageSendSubscriptionSubscription = { __typename?: 'Subscription', newMessageSent: { __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } } };

export type ConversationChangedSubscriptionVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type ConversationChangedSubscription = { __typename?: 'Subscription', conversationChanged: { __typename?: 'Conversation', id: string, type: string, updatedAt: any, isRead: boolean, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null, instagramLink?: string | null, portfolioLink?: string | null, twitterLink?: string | null, linkedinLink?: string | null, facebookLink?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, isRead?: boolean | null, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } };

export type EventVoteChangedSubscriptionSubscriptionVariables = Exact<{
  eventId: Scalars['ID'];
  status: Scalars['Int'];
}>;


export type EventVoteChangedSubscriptionSubscription = { __typename?: 'Subscription', voteChanged: { __typename?: 'NewVoteSubscriptionData', voteCount?: number | null, waitingCount?: number | null, eventId: string } };

export type NewNotificationSubscriptionVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification: { __typename?: 'NewNotiSubscriptionData', notification: { __typename?: 'UserNotification', id: string, createdAt: any, is_read: boolean, is_seen: boolean, notification: { __typename?: 'Notification', id: string, createdAt: any, messageKey: string, amount?: number | null, action_object?: string | null, actor_name?: string | null, actor_avatar?: string | null }, profile: { __typename?: 'Profile', id: string } } } };

export const MessageInfoFragmentDoc = gql`
    fragment messageInfo on Message {
  id
  createdAt
  content
  contentType
  isRead
  sender {
    id
    avatar
    displayName
  }
}
    `;
export const ConversationInfoFragmentDoc = gql`
    fragment conversationInfo on Conversation {
  id
  type
  updatedAt
  isRead
  members {
    id
    displayName
    avatar
    email
    phoneNumber
    country
    instagramLink
    portfolioLink
    twitterLink
    linkedinLink
    facebookLink
  }
  messages {
    ...messageInfo
  }
}
    ${MessageInfoFragmentDoc}`;
export const MutationStatusesFragmentDoc = gql`
    fragment mutationStatuses on IMutationResponse {
  code
  success
  message
}
    `;
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
}
    `;
export const ConversationMutationResponseFragmentDoc = gql`
    fragment conversationMutationResponse on ConversationMutationResponse {
  ...mutationStatuses
  conversation {
    id
    type
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ProfileInfoFragmentDoc = gql`
    fragment profileInfo on Profile {
  id
  avatar
  displayName
  cover
  gender
  country
  role
  company
  position
  email
  facebookLink
  instagramLink
  linkedinLink
  twitterLink
  portfolioLink
  school
  follower
  following
  friend
  about
  phoneNumber
  isFollowing
  isFriend
  isFriendRequest
  isFriendSending
  dob
}
    `;
export const ClubInfoFragmentDoc = gql`
    fragment clubInfo on Club {
  id
  title
  cover
  description
  publish
  createdAt
  updatedAt
  admin {
    ...profileInfo
  }
  isAdmin
  isSubAdmin
  isMember
  isRequesting
  memberCount
}
    ${ProfileInfoFragmentDoc}`;
export const ClubMutationResponseFragmentDoc = gql`
    fragment clubMutationResponse on ClubMutationResponse {
  ...mutationStatuses
  club {
    ...clubInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${ClubInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ClubMemberInfoFragmentDoc = gql`
    fragment clubMemberInfo on ClubMember {
  id
  profile {
    ...profileInfo
  }
  club {
    id
    title
  }
  status
  role
  isAdmin
  createdAt
  updatedAt
  isAdvanced
}
    ${ProfileInfoFragmentDoc}`;
export const ClubMemberMutationResponseFragmentDoc = gql`
    fragment clubMemberMutationResponse on ClubMemberMutationResponse {
  ...mutationStatuses
  clubMember {
    ...clubMemberInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${ClubMemberInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const ClubNoteInfoFragmentDoc = gql`
    fragment clubNoteInfo on ClubNote {
  id
  description
  createdAt
  updatedAt
  isPublic
  images
}
    `;
export const ClubNoteMutationResponseFragmentDoc = gql`
    fragment clubNoteMutationResponse on ClubNoteMutationResponse {
  ...mutationStatuses
  note {
    ...clubNoteInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${ClubNoteInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const CommentInfoFragmentDoc = gql`
    fragment commentInfo on Comment {
  id
  content
  createdAt
  author {
    id
    displayName
    avatar
  }
  replyComments {
    id
    content
    createdAt
    author {
      id
      displayName
      avatar
    }
  }
}
    `;
export const CommentMutationStatusesFragmentDoc = gql`
    fragment commentMutationStatuses on CommentMutationResponse {
  code
  success
  message
}
    `;
export const CommentWithUserInfoFragmentDoc = gql`
    fragment commentWithUserInfo on Comment {
  id
  content
  createdAt
  author {
    id
    displayName
    avatar
  }
}
    `;
export const CommentMutationResponseFragmentDoc = gql`
    fragment commentMutationResponse on CommentMutationResponse {
  ...commentMutationStatuses
  comment {
    ...commentWithUserInfo
  }
  errors {
    ...fieldError
  }
}
    ${CommentMutationStatusesFragmentDoc}
${CommentWithUserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const EventInfoFragmentDoc = gql`
    fragment eventInfo on ClubEvent {
  id
  title
  description
  start
  end
  createdAt
  updatedAt
  createdBy {
    ...clubMemberInfo
  }
  show
  status
  slot
  addressLink
  address
  color
  voteCount
  waitingCount
  isVoted
  isAdmin
  time
  maxVote
  price
}
    ${ClubMemberInfoFragmentDoc}`;
export const EventMutationResponseFragmentDoc = gql`
    fragment eventMutationResponse on EventMutationResponse {
  ...mutationStatuses
  event {
    ...eventInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${EventInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const VoteInfoFragmentDoc = gql`
    fragment voteInfo on Vote {
  id
  value
  member {
    ...clubMemberInfo
  }
  createdAt
  status
  updatedAt
  paid
  note
}
    ${ClubMemberInfoFragmentDoc}`;
export const EventVoteMutationResponseFragmentDoc = gql`
    fragment eventVoteMutationResponse on EventVoteMutationResponse {
  ...mutationStatuses
  vote {
    ...voteInfo
  }
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${VoteInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const UserMutationStatusesFragmentDoc = gql`
    fragment userMutationStatuses on UserMutationResponse {
  code
  success
  message
}
    `;
export const NotificationInfoFragmentDoc = gql`
    fragment notificationInfo on Notification {
  id
  createdAt
  messageKey
  amount
  action_object
  actor_name
  actor_avatar
}
    `;
export const UserNotificationInfoFragmentDoc = gql`
    fragment userNotificationInfo on UserNotification {
  id
  createdAt
  is_read
  is_seen
  notification {
    ...notificationInfo
  }
  profile {
    id
  }
}
    ${NotificationInfoFragmentDoc}`;
export const PostMutationStatusesFragmentDoc = gql`
    fragment postMutationStatuses on PostMutationResponse {
  code
  success
  message
}
    `;
export const PostWithUserInfoFragmentDoc = gql`
    fragment postWithUserInfo on Post {
  id
  title
  content
  cover
  description
  tags
  metaDescription
  metaKeywords
  metaTitle
  publish
  allowComments
  createdAt
  updatedAt
  favorite
  comment
  author {
    id
    displayName
    avatar
  }
}
    `;
export const PostMutationResponseFragmentDoc = gql`
    fragment postMutationResponse on PostMutationResponse {
  ...postMutationStatuses
  post {
    ...postWithUserInfo
  }
  errors {
    ...fieldError
  }
}
    ${PostMutationStatusesFragmentDoc}
${PostWithUserInfoFragmentDoc}
${FieldErrorFragmentDoc}`;
export const RatingMutationResponseFragmentDoc = gql`
    fragment ratingMutationResponse on RatingMutationResponse {
  ...mutationStatuses
  errors {
    ...fieldError
  }
}
    ${MutationStatusesFragmentDoc}
${FieldErrorFragmentDoc}`;
export const RatingInfoFragmentDoc = gql`
    fragment ratingInfo on Rating {
  id
  name
  description
  start
  end
  createdAt
  updatedAt
  status
}
    `;
export const RatingCandidateInfoFragmentDoc = gql`
    fragment ratingCandidateInfo on RatingCandidate {
  id
  name
  bio
  createdAt
  order
  photo1
  photo2
  photo2
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  email
  lastName
  firstName
  isPublic
  role
  avatar
  displayName
  profile {
    id
  }
}
    `;
export const RatingVoteInfoFragmentDoc = gql`
    fragment ratingVoteInfo on RatingVote {
  id
  voter {
    ...userInfo
  }
  createdAt
}
    ${UserInfoFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($code: String!, $newPassword: String!) {
  changePassword(code: $code, newPassword: $newPassword) {
    code
    success
    message
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      code: // value for 'code'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const AddConversationDocument = gql`
    mutation AddConversation($input: ConversationInput!) {
  addNewConversation(converInput: $input) {
    ...conversationMutationResponse
  }
}
    ${ConversationMutationResponseFragmentDoc}`;
export type AddConversationMutationFn = Apollo.MutationFunction<AddConversationMutation, AddConversationMutationVariables>;

/**
 * __useAddConversationMutation__
 *
 * To run a mutation, you first call `useAddConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConversationMutation, { data, loading, error }] = useAddConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddConversationMutation(baseOptions?: Apollo.MutationHookOptions<AddConversationMutation, AddConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddConversationMutation, AddConversationMutationVariables>(AddConversationDocument, options);
      }
export type AddConversationMutationHookResult = ReturnType<typeof useAddConversationMutation>;
export type AddConversationMutationResult = Apollo.MutationResult<AddConversationMutation>;
export type AddConversationMutationOptions = Apollo.BaseMutationOptions<AddConversationMutation, AddConversationMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($messageInput: MessageInput!) {
  addNewMessage(messageInput: $messageInput)
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      messageInput: // value for 'messageInput'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const SetConversationReadDocument = gql`
    mutation SetConversationRead($converId: ID!) {
  setConversationRead(converId: $converId) {
    ...conversationMutationResponse
  }
}
    ${ConversationMutationResponseFragmentDoc}`;
export type SetConversationReadMutationFn = Apollo.MutationFunction<SetConversationReadMutation, SetConversationReadMutationVariables>;

/**
 * __useSetConversationReadMutation__
 *
 * To run a mutation, you first call `useSetConversationReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetConversationReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setConversationReadMutation, { data, loading, error }] = useSetConversationReadMutation({
 *   variables: {
 *      converId: // value for 'converId'
 *   },
 * });
 */
export function useSetConversationReadMutation(baseOptions?: Apollo.MutationHookOptions<SetConversationReadMutation, SetConversationReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetConversationReadMutation, SetConversationReadMutationVariables>(SetConversationReadDocument, options);
      }
export type SetConversationReadMutationHookResult = ReturnType<typeof useSetConversationReadMutation>;
export type SetConversationReadMutationResult = Apollo.MutationResult<SetConversationReadMutation>;
export type SetConversationReadMutationOptions = Apollo.BaseMutationOptions<SetConversationReadMutation, SetConversationReadMutationVariables>;
export const DeleteClubDocument = gql`
    mutation DeleteClub($id: ID!) {
  deleteClub(id: $id) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type DeleteClubMutationFn = Apollo.MutationFunction<DeleteClubMutation, DeleteClubMutationVariables>;

/**
 * __useDeleteClubMutation__
 *
 * To run a mutation, you first call `useDeleteClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClubMutation, { data, loading, error }] = useDeleteClubMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClubMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClubMutation, DeleteClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClubMutation, DeleteClubMutationVariables>(DeleteClubDocument, options);
      }
export type DeleteClubMutationHookResult = ReturnType<typeof useDeleteClubMutation>;
export type DeleteClubMutationResult = Apollo.MutationResult<DeleteClubMutation>;
export type DeleteClubMutationOptions = Apollo.BaseMutationOptions<DeleteClubMutation, DeleteClubMutationVariables>;
export const CreateClubDocument = gql`
    mutation CreateClub($createClubInput: CreateClubInput!) {
  createClub(createClubInput: $createClubInput) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type CreateClubMutationFn = Apollo.MutationFunction<CreateClubMutation, CreateClubMutationVariables>;

/**
 * __useCreateClubMutation__
 *
 * To run a mutation, you first call `useCreateClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClubMutation, { data, loading, error }] = useCreateClubMutation({
 *   variables: {
 *      createClubInput: // value for 'createClubInput'
 *   },
 * });
 */
export function useCreateClubMutation(baseOptions?: Apollo.MutationHookOptions<CreateClubMutation, CreateClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClubMutation, CreateClubMutationVariables>(CreateClubDocument, options);
      }
export type CreateClubMutationHookResult = ReturnType<typeof useCreateClubMutation>;
export type CreateClubMutationResult = Apollo.MutationResult<CreateClubMutation>;
export type CreateClubMutationOptions = Apollo.BaseMutationOptions<CreateClubMutation, CreateClubMutationVariables>;
export const UpdateClubDocument = gql`
    mutation UpdateClub($id: String!, $updateClubInput: UpdateClubInput!) {
  updateClub(id: $id, updateClubInput: $updateClubInput) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type UpdateClubMutationFn = Apollo.MutationFunction<UpdateClubMutation, UpdateClubMutationVariables>;

/**
 * __useUpdateClubMutation__
 *
 * To run a mutation, you first call `useUpdateClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClubMutation, { data, loading, error }] = useUpdateClubMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateClubInput: // value for 'updateClubInput'
 *   },
 * });
 */
export function useUpdateClubMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClubMutation, UpdateClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClubMutation, UpdateClubMutationVariables>(UpdateClubDocument, options);
      }
export type UpdateClubMutationHookResult = ReturnType<typeof useUpdateClubMutation>;
export type UpdateClubMutationResult = Apollo.MutationResult<UpdateClubMutation>;
export type UpdateClubMutationOptions = Apollo.BaseMutationOptions<UpdateClubMutation, UpdateClubMutationVariables>;
export const ChangeAdminDocument = gql`
    mutation ChangeAdmin($memberId: ID!, $clubId: ID!) {
  changeAdmin(memberId: $memberId, clubId: $clubId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type ChangeAdminMutationFn = Apollo.MutationFunction<ChangeAdminMutation, ChangeAdminMutationVariables>;

/**
 * __useChangeAdminMutation__
 *
 * To run a mutation, you first call `useChangeAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAdminMutation, { data, loading, error }] = useChangeAdminMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useChangeAdminMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAdminMutation, ChangeAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeAdminMutation, ChangeAdminMutationVariables>(ChangeAdminDocument, options);
      }
export type ChangeAdminMutationHookResult = ReturnType<typeof useChangeAdminMutation>;
export type ChangeAdminMutationResult = Apollo.MutationResult<ChangeAdminMutation>;
export type ChangeAdminMutationOptions = Apollo.BaseMutationOptions<ChangeAdminMutation, ChangeAdminMutationVariables>;
export const RequestJoinClubDocument = gql`
    mutation RequestJoinClub($clubId: ID!) {
  requestJoinClub(id: $clubId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type RequestJoinClubMutationFn = Apollo.MutationFunction<RequestJoinClubMutation, RequestJoinClubMutationVariables>;

/**
 * __useRequestJoinClubMutation__
 *
 * To run a mutation, you first call `useRequestJoinClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestJoinClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestJoinClubMutation, { data, loading, error }] = useRequestJoinClubMutation({
 *   variables: {
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useRequestJoinClubMutation(baseOptions?: Apollo.MutationHookOptions<RequestJoinClubMutation, RequestJoinClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestJoinClubMutation, RequestJoinClubMutationVariables>(RequestJoinClubDocument, options);
      }
export type RequestJoinClubMutationHookResult = ReturnType<typeof useRequestJoinClubMutation>;
export type RequestJoinClubMutationResult = Apollo.MutationResult<RequestJoinClubMutation>;
export type RequestJoinClubMutationOptions = Apollo.BaseMutationOptions<RequestJoinClubMutation, RequestJoinClubMutationVariables>;
export const AcceptJoinClubDocument = gql`
    mutation AcceptJoinClub($clubMemId: ID!) {
  acceptJoin(id: $clubMemId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type AcceptJoinClubMutationFn = Apollo.MutationFunction<AcceptJoinClubMutation, AcceptJoinClubMutationVariables>;

/**
 * __useAcceptJoinClubMutation__
 *
 * To run a mutation, you first call `useAcceptJoinClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptJoinClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptJoinClubMutation, { data, loading, error }] = useAcceptJoinClubMutation({
 *   variables: {
 *      clubMemId: // value for 'clubMemId'
 *   },
 * });
 */
export function useAcceptJoinClubMutation(baseOptions?: Apollo.MutationHookOptions<AcceptJoinClubMutation, AcceptJoinClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptJoinClubMutation, AcceptJoinClubMutationVariables>(AcceptJoinClubDocument, options);
      }
export type AcceptJoinClubMutationHookResult = ReturnType<typeof useAcceptJoinClubMutation>;
export type AcceptJoinClubMutationResult = Apollo.MutationResult<AcceptJoinClubMutation>;
export type AcceptJoinClubMutationOptions = Apollo.BaseMutationOptions<AcceptJoinClubMutation, AcceptJoinClubMutationVariables>;
export const SetRoleDocument = gql`
    mutation SetRole($clubMemId: ID!, $role: Int!) {
  setRole(id: $clubMemId, role: $role) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type SetRoleMutationFn = Apollo.MutationFunction<SetRoleMutation, SetRoleMutationVariables>;

/**
 * __useSetRoleMutation__
 *
 * To run a mutation, you first call `useSetRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRoleMutation, { data, loading, error }] = useSetRoleMutation({
 *   variables: {
 *      clubMemId: // value for 'clubMemId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useSetRoleMutation(baseOptions?: Apollo.MutationHookOptions<SetRoleMutation, SetRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetRoleMutation, SetRoleMutationVariables>(SetRoleDocument, options);
      }
export type SetRoleMutationHookResult = ReturnType<typeof useSetRoleMutation>;
export type SetRoleMutationResult = Apollo.MutationResult<SetRoleMutation>;
export type SetRoleMutationOptions = Apollo.BaseMutationOptions<SetRoleMutation, SetRoleMutationVariables>;
export const SetIsAdvancedDocument = gql`
    mutation SetIsAdvanced($memberId: ID!, $isAdvanced: Boolean!) {
  setIsAdvanced(memberId: $memberId, isAdvanced: $isAdvanced) {
    ...clubMemberMutationResponse
  }
}
    ${ClubMemberMutationResponseFragmentDoc}`;
export type SetIsAdvancedMutationFn = Apollo.MutationFunction<SetIsAdvancedMutation, SetIsAdvancedMutationVariables>;

/**
 * __useSetIsAdvancedMutation__
 *
 * To run a mutation, you first call `useSetIsAdvancedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIsAdvancedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIsAdvancedMutation, { data, loading, error }] = useSetIsAdvancedMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      isAdvanced: // value for 'isAdvanced'
 *   },
 * });
 */
export function useSetIsAdvancedMutation(baseOptions?: Apollo.MutationHookOptions<SetIsAdvancedMutation, SetIsAdvancedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetIsAdvancedMutation, SetIsAdvancedMutationVariables>(SetIsAdvancedDocument, options);
      }
export type SetIsAdvancedMutationHookResult = ReturnType<typeof useSetIsAdvancedMutation>;
export type SetIsAdvancedMutationResult = Apollo.MutationResult<SetIsAdvancedMutation>;
export type SetIsAdvancedMutationOptions = Apollo.BaseMutationOptions<SetIsAdvancedMutation, SetIsAdvancedMutationVariables>;
export const DeleteClubMemberDocument = gql`
    mutation DeleteClubMember($clubMemId: ID!) {
  deleteClubMember(id: $clubMemId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type DeleteClubMemberMutationFn = Apollo.MutationFunction<DeleteClubMemberMutation, DeleteClubMemberMutationVariables>;

/**
 * __useDeleteClubMemberMutation__
 *
 * To run a mutation, you first call `useDeleteClubMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClubMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClubMemberMutation, { data, loading, error }] = useDeleteClubMemberMutation({
 *   variables: {
 *      clubMemId: // value for 'clubMemId'
 *   },
 * });
 */
export function useDeleteClubMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClubMemberMutation, DeleteClubMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClubMemberMutation, DeleteClubMemberMutationVariables>(DeleteClubMemberDocument, options);
      }
export type DeleteClubMemberMutationHookResult = ReturnType<typeof useDeleteClubMemberMutation>;
export type DeleteClubMemberMutationResult = Apollo.MutationResult<DeleteClubMemberMutation>;
export type DeleteClubMemberMutationOptions = Apollo.BaseMutationOptions<DeleteClubMemberMutation, DeleteClubMemberMutationVariables>;
export const CancelRequestClubDocument = gql`
    mutation CancelRequestClub($clubId: ID!) {
  cancelRequestClub(clubId: $clubId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type CancelRequestClubMutationFn = Apollo.MutationFunction<CancelRequestClubMutation, CancelRequestClubMutationVariables>;

/**
 * __useCancelRequestClubMutation__
 *
 * To run a mutation, you first call `useCancelRequestClubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRequestClubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRequestClubMutation, { data, loading, error }] = useCancelRequestClubMutation({
 *   variables: {
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useCancelRequestClubMutation(baseOptions?: Apollo.MutationHookOptions<CancelRequestClubMutation, CancelRequestClubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRequestClubMutation, CancelRequestClubMutationVariables>(CancelRequestClubDocument, options);
      }
export type CancelRequestClubMutationHookResult = ReturnType<typeof useCancelRequestClubMutation>;
export type CancelRequestClubMutationResult = Apollo.MutationResult<CancelRequestClubMutation>;
export type CancelRequestClubMutationOptions = Apollo.BaseMutationOptions<CancelRequestClubMutation, CancelRequestClubMutationVariables>;
export const CancelRequestDocument = gql`
    mutation CancelRequest($memId: ID!) {
  cancelRequest(memId: $memId) {
    ...clubMutationResponse
  }
}
    ${ClubMutationResponseFragmentDoc}`;
export type CancelRequestMutationFn = Apollo.MutationFunction<CancelRequestMutation, CancelRequestMutationVariables>;

/**
 * __useCancelRequestMutation__
 *
 * To run a mutation, you first call `useCancelRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRequestMutation, { data, loading, error }] = useCancelRequestMutation({
 *   variables: {
 *      memId: // value for 'memId'
 *   },
 * });
 */
export function useCancelRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelRequestMutation, CancelRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRequestMutation, CancelRequestMutationVariables>(CancelRequestDocument, options);
      }
export type CancelRequestMutationHookResult = ReturnType<typeof useCancelRequestMutation>;
export type CancelRequestMutationResult = Apollo.MutationResult<CancelRequestMutation>;
export type CancelRequestMutationOptions = Apollo.BaseMutationOptions<CancelRequestMutation, CancelRequestMutationVariables>;
export const CreateClubNoteDocument = gql`
    mutation CreateClubNote($createClubNoteInput: CreateClubNoteInput!) {
  createClubNote(createClubNoteInput: $createClubNoteInput) {
    ...clubNoteMutationResponse
  }
}
    ${ClubNoteMutationResponseFragmentDoc}`;
export type CreateClubNoteMutationFn = Apollo.MutationFunction<CreateClubNoteMutation, CreateClubNoteMutationVariables>;

/**
 * __useCreateClubNoteMutation__
 *
 * To run a mutation, you first call `useCreateClubNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClubNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClubNoteMutation, { data, loading, error }] = useCreateClubNoteMutation({
 *   variables: {
 *      createClubNoteInput: // value for 'createClubNoteInput'
 *   },
 * });
 */
export function useCreateClubNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateClubNoteMutation, CreateClubNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClubNoteMutation, CreateClubNoteMutationVariables>(CreateClubNoteDocument, options);
      }
export type CreateClubNoteMutationHookResult = ReturnType<typeof useCreateClubNoteMutation>;
export type CreateClubNoteMutationResult = Apollo.MutationResult<CreateClubNoteMutation>;
export type CreateClubNoteMutationOptions = Apollo.BaseMutationOptions<CreateClubNoteMutation, CreateClubNoteMutationVariables>;
export const UpdateClubNoteDocument = gql`
    mutation UpdateClubNote($id: ID!, $updateClubNoteInput: UpdateClubNoteInput!) {
  updateClubNote(id: $id, updateClubNoteInput: $updateClubNoteInput) {
    ...clubNoteMutationResponse
  }
}
    ${ClubNoteMutationResponseFragmentDoc}`;
export type UpdateClubNoteMutationFn = Apollo.MutationFunction<UpdateClubNoteMutation, UpdateClubNoteMutationVariables>;

/**
 * __useUpdateClubNoteMutation__
 *
 * To run a mutation, you first call `useUpdateClubNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClubNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClubNoteMutation, { data, loading, error }] = useUpdateClubNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateClubNoteInput: // value for 'updateClubNoteInput'
 *   },
 * });
 */
export function useUpdateClubNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClubNoteMutation, UpdateClubNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClubNoteMutation, UpdateClubNoteMutationVariables>(UpdateClubNoteDocument, options);
      }
export type UpdateClubNoteMutationHookResult = ReturnType<typeof useUpdateClubNoteMutation>;
export type UpdateClubNoteMutationResult = Apollo.MutationResult<UpdateClubNoteMutation>;
export type UpdateClubNoteMutationOptions = Apollo.BaseMutationOptions<UpdateClubNoteMutation, UpdateClubNoteMutationVariables>;
export const ChangeClubNoteStatusDocument = gql`
    mutation ChangeClubNoteStatus($id: ID!, $isPublic: Boolean!) {
  changeClubNoteStatus(id: $id, isPublic: $isPublic) {
    ...clubNoteMutationResponse
  }
}
    ${ClubNoteMutationResponseFragmentDoc}`;
export type ChangeClubNoteStatusMutationFn = Apollo.MutationFunction<ChangeClubNoteStatusMutation, ChangeClubNoteStatusMutationVariables>;

/**
 * __useChangeClubNoteStatusMutation__
 *
 * To run a mutation, you first call `useChangeClubNoteStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeClubNoteStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeClubNoteStatusMutation, { data, loading, error }] = useChangeClubNoteStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isPublic: // value for 'isPublic'
 *   },
 * });
 */
export function useChangeClubNoteStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeClubNoteStatusMutation, ChangeClubNoteStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeClubNoteStatusMutation, ChangeClubNoteStatusMutationVariables>(ChangeClubNoteStatusDocument, options);
      }
export type ChangeClubNoteStatusMutationHookResult = ReturnType<typeof useChangeClubNoteStatusMutation>;
export type ChangeClubNoteStatusMutationResult = Apollo.MutationResult<ChangeClubNoteStatusMutation>;
export type ChangeClubNoteStatusMutationOptions = Apollo.BaseMutationOptions<ChangeClubNoteStatusMutation, ChangeClubNoteStatusMutationVariables>;
export const DeleteClubNoteDocument = gql`
    mutation DeleteClubNote($id: ID!) {
  deleteClubNote(id: $id) {
    ...clubNoteMutationResponse
  }
}
    ${ClubNoteMutationResponseFragmentDoc}`;
export type DeleteClubNoteMutationFn = Apollo.MutationFunction<DeleteClubNoteMutation, DeleteClubNoteMutationVariables>;

/**
 * __useDeleteClubNoteMutation__
 *
 * To run a mutation, you first call `useDeleteClubNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClubNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClubNoteMutation, { data, loading, error }] = useDeleteClubNoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClubNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClubNoteMutation, DeleteClubNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClubNoteMutation, DeleteClubNoteMutationVariables>(DeleteClubNoteDocument, options);
      }
export type DeleteClubNoteMutationHookResult = ReturnType<typeof useDeleteClubNoteMutation>;
export type DeleteClubNoteMutationResult = Apollo.MutationResult<DeleteClubNoteMutation>;
export type DeleteClubNoteMutationOptions = Apollo.BaseMutationOptions<DeleteClubNoteMutation, DeleteClubNoteMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($createEventInput: CreateEventInput!) {
  createEvent(createEventInput: $createEventInput) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      createEventInput: // value for 'createEventInput'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateVoteEventDocument = gql`
    mutation CreateVoteEvent($createVoteInput: CreateVoteInput!) {
  voteEvent(createVoteInput: $createVoteInput) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type CreateVoteEventMutationFn = Apollo.MutationFunction<CreateVoteEventMutation, CreateVoteEventMutationVariables>;

/**
 * __useCreateVoteEventMutation__
 *
 * To run a mutation, you first call `useCreateVoteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteEventMutation, { data, loading, error }] = useCreateVoteEventMutation({
 *   variables: {
 *      createVoteInput: // value for 'createVoteInput'
 *   },
 * });
 */
export function useCreateVoteEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteEventMutation, CreateVoteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoteEventMutation, CreateVoteEventMutationVariables>(CreateVoteEventDocument, options);
      }
export type CreateVoteEventMutationHookResult = ReturnType<typeof useCreateVoteEventMutation>;
export type CreateVoteEventMutationResult = Apollo.MutationResult<CreateVoteEventMutation>;
export type CreateVoteEventMutationOptions = Apollo.BaseMutationOptions<CreateVoteEventMutation, CreateVoteEventMutationVariables>;
export const UnVoteEventDocument = gql`
    mutation UnVoteEvent($voteId: ID!, $eventId: ID!, $eventSlot: Int!) {
  unVoteEvent(voteId: $voteId, eventId: $eventId, eventSlot: $eventSlot) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type UnVoteEventMutationFn = Apollo.MutationFunction<UnVoteEventMutation, UnVoteEventMutationVariables>;

/**
 * __useUnVoteEventMutation__
 *
 * To run a mutation, you first call `useUnVoteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnVoteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unVoteEventMutation, { data, loading, error }] = useUnVoteEventMutation({
 *   variables: {
 *      voteId: // value for 'voteId'
 *      eventId: // value for 'eventId'
 *      eventSlot: // value for 'eventSlot'
 *   },
 * });
 */
export function useUnVoteEventMutation(baseOptions?: Apollo.MutationHookOptions<UnVoteEventMutation, UnVoteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnVoteEventMutation, UnVoteEventMutationVariables>(UnVoteEventDocument, options);
      }
export type UnVoteEventMutationHookResult = ReturnType<typeof useUnVoteEventMutation>;
export type UnVoteEventMutationResult = Apollo.MutationResult<UnVoteEventMutation>;
export type UnVoteEventMutationOptions = Apollo.BaseMutationOptions<UnVoteEventMutation, UnVoteEventMutationVariables>;
export const ChangeEventVoteDocument = gql`
    mutation ChangeEventVote($voteId: ID!, $eventId: ID!, $eventSlot: Int!, $newValue: Int!) {
  changeEventVote(
    voteId: $voteId
    eventId: $eventId
    eventSlot: $eventSlot
    newValue: $newValue
  ) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type ChangeEventVoteMutationFn = Apollo.MutationFunction<ChangeEventVoteMutation, ChangeEventVoteMutationVariables>;

/**
 * __useChangeEventVoteMutation__
 *
 * To run a mutation, you first call `useChangeEventVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEventVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEventVoteMutation, { data, loading, error }] = useChangeEventVoteMutation({
 *   variables: {
 *      voteId: // value for 'voteId'
 *      eventId: // value for 'eventId'
 *      eventSlot: // value for 'eventSlot'
 *      newValue: // value for 'newValue'
 *   },
 * });
 */
export function useChangeEventVoteMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEventVoteMutation, ChangeEventVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEventVoteMutation, ChangeEventVoteMutationVariables>(ChangeEventVoteDocument, options);
      }
export type ChangeEventVoteMutationHookResult = ReturnType<typeof useChangeEventVoteMutation>;
export type ChangeEventVoteMutationResult = Apollo.MutationResult<ChangeEventVoteMutation>;
export type ChangeEventVoteMutationOptions = Apollo.BaseMutationOptions<ChangeEventVoteMutation, ChangeEventVoteMutationVariables>;
export const ChangeSlotsDocument = gql`
    mutation ChangeSlots($status: Int!, $eventId: ID!, $eventSlot: Int!, $newValue: Int!) {
  changeSlots(
    status: $status
    eventId: $eventId
    eventSlot: $eventSlot
    newValue: $newValue
  ) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type ChangeSlotsMutationFn = Apollo.MutationFunction<ChangeSlotsMutation, ChangeSlotsMutationVariables>;

/**
 * __useChangeSlotsMutation__
 *
 * To run a mutation, you first call `useChangeSlotsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSlotsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSlotsMutation, { data, loading, error }] = useChangeSlotsMutation({
 *   variables: {
 *      status: // value for 'status'
 *      eventId: // value for 'eventId'
 *      eventSlot: // value for 'eventSlot'
 *      newValue: // value for 'newValue'
 *   },
 * });
 */
export function useChangeSlotsMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSlotsMutation, ChangeSlotsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSlotsMutation, ChangeSlotsMutationVariables>(ChangeSlotsDocument, options);
      }
export type ChangeSlotsMutationHookResult = ReturnType<typeof useChangeSlotsMutation>;
export type ChangeSlotsMutationResult = Apollo.MutationResult<ChangeSlotsMutation>;
export type ChangeSlotsMutationOptions = Apollo.BaseMutationOptions<ChangeSlotsMutation, ChangeSlotsMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: ID!, $updateEventInput: UpdateEventInput!) {
  updateEvent(id: $id, updateEventInput: $updateEventInput) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateEventInput: // value for 'updateEventInput'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const ChangeEventStatusDocument = gql`
    mutation ChangeEventStatus($id: ID!, $status: Int!) {
  changeEventStatus(id: $id, status: $status) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type ChangeEventStatusMutationFn = Apollo.MutationFunction<ChangeEventStatusMutation, ChangeEventStatusMutationVariables>;

/**
 * __useChangeEventStatusMutation__
 *
 * To run a mutation, you first call `useChangeEventStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEventStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEventStatusMutation, { data, loading, error }] = useChangeEventStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeEventStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEventStatusMutation, ChangeEventStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEventStatusMutation, ChangeEventStatusMutationVariables>(ChangeEventStatusDocument, options);
      }
export type ChangeEventStatusMutationHookResult = ReturnType<typeof useChangeEventStatusMutation>;
export type ChangeEventStatusMutationResult = Apollo.MutationResult<ChangeEventStatusMutation>;
export type ChangeEventStatusMutationOptions = Apollo.BaseMutationOptions<ChangeEventStatusMutation, ChangeEventStatusMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: ID!) {
  deleteEvent(id: $id) {
    ...eventMutationResponse
  }
}
    ${EventMutationResponseFragmentDoc}`;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const VoteChangePaidDocument = gql`
    mutation VoteChangePaid($voteId: ID!, $payStatus: String!) {
  voteChangePaid(voteId: $voteId, payStatus: $payStatus) {
    ...eventVoteMutationResponse
  }
}
    ${EventVoteMutationResponseFragmentDoc}`;
export type VoteChangePaidMutationFn = Apollo.MutationFunction<VoteChangePaidMutation, VoteChangePaidMutationVariables>;

/**
 * __useVoteChangePaidMutation__
 *
 * To run a mutation, you first call `useVoteChangePaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteChangePaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteChangePaidMutation, { data, loading, error }] = useVoteChangePaidMutation({
 *   variables: {
 *      voteId: // value for 'voteId'
 *      payStatus: // value for 'payStatus'
 *   },
 * });
 */
export function useVoteChangePaidMutation(baseOptions?: Apollo.MutationHookOptions<VoteChangePaidMutation, VoteChangePaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteChangePaidMutation, VoteChangePaidMutationVariables>(VoteChangePaidDocument, options);
      }
export type VoteChangePaidMutationHookResult = ReturnType<typeof useVoteChangePaidMutation>;
export type VoteChangePaidMutationResult = Apollo.MutationResult<VoteChangePaidMutation>;
export type VoteChangePaidMutationOptions = Apollo.BaseMutationOptions<VoteChangePaidMutation, VoteChangePaidMutationVariables>;
export const NoteVoteDocument = gql`
    mutation NoteVote($voteId: ID!, $note: String!) {
  noteVote(voteId: $voteId, note: $note) {
    ...eventVoteMutationResponse
  }
}
    ${EventVoteMutationResponseFragmentDoc}`;
export type NoteVoteMutationFn = Apollo.MutationFunction<NoteVoteMutation, NoteVoteMutationVariables>;

/**
 * __useNoteVoteMutation__
 *
 * To run a mutation, you first call `useNoteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNoteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [noteVoteMutation, { data, loading, error }] = useNoteVoteMutation({
 *   variables: {
 *      voteId: // value for 'voteId'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useNoteVoteMutation(baseOptions?: Apollo.MutationHookOptions<NoteVoteMutation, NoteVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NoteVoteMutation, NoteVoteMutationVariables>(NoteVoteDocument, options);
      }
export type NoteVoteMutationHookResult = ReturnType<typeof useNoteVoteMutation>;
export type NoteVoteMutationResult = Apollo.MutationResult<NoteVoteMutation>;
export type NoteVoteMutationOptions = Apollo.BaseMutationOptions<NoteVoteMutation, NoteVoteMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($profileId: ID!) {
  follow(followId: $profileId) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnFollowUserDocument = gql`
    mutation UnFollowUser($profileId: ID!) {
  unFollow(followId: $profileId) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type UnFollowUserMutationFn = Apollo.MutationFunction<UnFollowUserMutation, UnFollowUserMutationVariables>;

/**
 * __useUnFollowUserMutation__
 *
 * To run a mutation, you first call `useUnFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowUserMutation, { data, loading, error }] = useUnFollowUserMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useUnFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowUserMutation, UnFollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowUserMutation, UnFollowUserMutationVariables>(UnFollowUserDocument, options);
      }
export type UnFollowUserMutationHookResult = ReturnType<typeof useUnFollowUserMutation>;
export type UnFollowUserMutationResult = Apollo.MutationResult<UnFollowUserMutation>;
export type UnFollowUserMutationOptions = Apollo.BaseMutationOptions<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const ForgotpasswordDocument = gql`
    mutation Forgotpassword($email: String!) {
  forgotPassword(email: $email) {
    code
    success
    message
  }
}
    `;
export type ForgotpasswordMutationFn = Apollo.MutationFunction<ForgotpasswordMutation, ForgotpasswordMutationVariables>;

/**
 * __useForgotpasswordMutation__
 *
 * To run a mutation, you first call `useForgotpasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotpasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotpasswordMutation, { data, loading, error }] = useForgotpasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotpasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotpasswordMutation, ForgotpasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotpasswordMutation, ForgotpasswordMutationVariables>(ForgotpasswordDocument, options);
      }
export type ForgotpasswordMutationHookResult = ReturnType<typeof useForgotpasswordMutation>;
export type ForgotpasswordMutationResult = Apollo.MutationResult<ForgotpasswordMutation>;
export type ForgotpasswordMutationOptions = Apollo.BaseMutationOptions<ForgotpasswordMutation, ForgotpasswordMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($profileId: ID!) {
  addFriend(toId: $profileId) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const DeleteFriendShipDocument = gql`
    mutation DeleteFriendShip($profileId: ID!) {
  deleteFriendShip(toId: $profileId) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type DeleteFriendShipMutationFn = Apollo.MutationFunction<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>;

/**
 * __useDeleteFriendShipMutation__
 *
 * To run a mutation, you first call `useDeleteFriendShipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFriendShipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFriendShipMutation, { data, loading, error }] = useDeleteFriendShipMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useDeleteFriendShipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>(DeleteFriendShipDocument, options);
      }
export type DeleteFriendShipMutationHookResult = ReturnType<typeof useDeleteFriendShipMutation>;
export type DeleteFriendShipMutationResult = Apollo.MutationResult<DeleteFriendShipMutation>;
export type DeleteFriendShipMutationOptions = Apollo.BaseMutationOptions<DeleteFriendShipMutation, DeleteFriendShipMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    success
    message
    accessToken
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FbLoginDocument = gql`
    mutation FBLogin($fbLoginInput: FBLoginInput!) {
  fbLogin(fbLoginInput: $fbLoginInput) {
    code
    success
    message
    accessToken
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type FbLoginMutationFn = Apollo.MutationFunction<FbLoginMutation, FbLoginMutationVariables>;

/**
 * __useFbLoginMutation__
 *
 * To run a mutation, you first call `useFbLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFbLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fbLoginMutation, { data, loading, error }] = useFbLoginMutation({
 *   variables: {
 *      fbLoginInput: // value for 'fbLoginInput'
 *   },
 * });
 */
export function useFbLoginMutation(baseOptions?: Apollo.MutationHookOptions<FbLoginMutation, FbLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FbLoginMutation, FbLoginMutationVariables>(FbLoginDocument, options);
      }
export type FbLoginMutationHookResult = ReturnType<typeof useFbLoginMutation>;
export type FbLoginMutationResult = Apollo.MutationResult<FbLoginMutation>;
export type FbLoginMutationOptions = Apollo.BaseMutationOptions<FbLoginMutation, FbLoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($userId: ID!) {
  logout(userId: $userId) {
    code
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReadAllNotificationDocument = gql`
    mutation ReadAllNotification {
  readAllNotis
}
    `;
export type ReadAllNotificationMutationFn = Apollo.MutationFunction<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;

/**
 * __useReadAllNotificationMutation__
 *
 * To run a mutation, you first call `useReadAllNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadAllNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readAllNotificationMutation, { data, loading, error }] = useReadAllNotificationMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadAllNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>(ReadAllNotificationDocument, options);
      }
export type ReadAllNotificationMutationHookResult = ReturnType<typeof useReadAllNotificationMutation>;
export type ReadAllNotificationMutationResult = Apollo.MutationResult<ReadAllNotificationMutation>;
export type ReadAllNotificationMutationOptions = Apollo.BaseMutationOptions<ReadAllNotificationMutation, ReadAllNotificationMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    ...postMutationStatuses
  }
}
    ${PostMutationStatusesFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostInput: CreatePostInput!) {
  createPost(createPostInput: $createPostInput) {
    ...postMutationResponse
  }
}
    ${PostMutationResponseFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $updatePostInput: UpdatePostInput!) {
  updatePost(id: $id, updatePostInput: $updatePostInput) {
    ...postMutationResponse
  }
}
    ${PostMutationResponseFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updatePostInput: // value for 'updatePostInput'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const LikeDocument = gql`
    mutation Like($postId: ID!) {
  like(postId: $postId) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const CommentPostDocument = gql`
    mutation CommentPost($commentInput: CommentInput!) {
  commentPost(commentInput: $commentInput) {
    ...commentMutationResponse
  }
}
    ${CommentMutationResponseFragmentDoc}`;
export type CommentPostMutationFn = Apollo.MutationFunction<CommentPostMutation, CommentPostMutationVariables>;

/**
 * __useCommentPostMutation__
 *
 * To run a mutation, you first call `useCommentPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentPostMutation, { data, loading, error }] = useCommentPostMutation({
 *   variables: {
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCommentPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentPostMutation, CommentPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentPostMutation, CommentPostMutationVariables>(CommentPostDocument, options);
      }
export type CommentPostMutationHookResult = ReturnType<typeof useCommentPostMutation>;
export type CommentPostMutationResult = Apollo.MutationResult<CommentPostMutation>;
export type CommentPostMutationOptions = Apollo.BaseMutationOptions<CommentPostMutation, CommentPostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: ID!) {
  deleteComment(id: $id) {
    ...commentMutationStatuses
  }
}
    ${CommentMutationStatusesFragmentDoc}`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const ReplyCommentDocument = gql`
    mutation ReplyComment($replyCommentInput: ReplyCommentInput!) {
  replyComment(replyCommentInput: $replyCommentInput) {
    ...commentMutationResponse
  }
}
    ${CommentMutationResponseFragmentDoc}`;
export type ReplyCommentMutationFn = Apollo.MutationFunction<ReplyCommentMutation, ReplyCommentMutationVariables>;

/**
 * __useReplyCommentMutation__
 *
 * To run a mutation, you first call `useReplyCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyCommentMutation, { data, loading, error }] = useReplyCommentMutation({
 *   variables: {
 *      replyCommentInput: // value for 'replyCommentInput'
 *   },
 * });
 */
export function useReplyCommentMutation(baseOptions?: Apollo.MutationHookOptions<ReplyCommentMutation, ReplyCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplyCommentMutation, ReplyCommentMutationVariables>(ReplyCommentDocument, options);
      }
export type ReplyCommentMutationHookResult = ReturnType<typeof useReplyCommentMutation>;
export type ReplyCommentMutationResult = Apollo.MutationResult<ReplyCommentMutation>;
export type ReplyCommentMutationOptions = Apollo.BaseMutationOptions<ReplyCommentMutation, ReplyCommentMutationVariables>;
export const DeleteRatingDocument = gql`
    mutation DeleteRating($id: ID!) {
  deleteRating(id: $id) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type DeleteRatingMutationFn = Apollo.MutationFunction<DeleteRatingMutation, DeleteRatingMutationVariables>;

/**
 * __useDeleteRatingMutation__
 *
 * To run a mutation, you first call `useDeleteRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRatingMutation, { data, loading, error }] = useDeleteRatingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRatingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRatingMutation, DeleteRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRatingMutation, DeleteRatingMutationVariables>(DeleteRatingDocument, options);
      }
export type DeleteRatingMutationHookResult = ReturnType<typeof useDeleteRatingMutation>;
export type DeleteRatingMutationResult = Apollo.MutationResult<DeleteRatingMutation>;
export type DeleteRatingMutationOptions = Apollo.BaseMutationOptions<DeleteRatingMutation, DeleteRatingMutationVariables>;
export const CreateRatingDocument = gql`
    mutation CreateRating($createRatingInput: CreateRatingInput!) {
  createRating(createRatingInput: $createRatingInput) {
    ...ratingMutationResponse
  }
}
    ${RatingMutationResponseFragmentDoc}`;
export type CreateRatingMutationFn = Apollo.MutationFunction<CreateRatingMutation, CreateRatingMutationVariables>;

/**
 * __useCreateRatingMutation__
 *
 * To run a mutation, you first call `useCreateRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRatingMutation, { data, loading, error }] = useCreateRatingMutation({
 *   variables: {
 *      createRatingInput: // value for 'createRatingInput'
 *   },
 * });
 */
export function useCreateRatingMutation(baseOptions?: Apollo.MutationHookOptions<CreateRatingMutation, CreateRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRatingMutation, CreateRatingMutationVariables>(CreateRatingDocument, options);
      }
export type CreateRatingMutationHookResult = ReturnType<typeof useCreateRatingMutation>;
export type CreateRatingMutationResult = Apollo.MutationResult<CreateRatingMutation>;
export type CreateRatingMutationOptions = Apollo.BaseMutationOptions<CreateRatingMutation, CreateRatingMutationVariables>;
export const UpdateRatingDocument = gql`
    mutation UpdateRating($id: ID!, $updateRatingInput: CreateRatingInput!) {
  updateRating(id: $id, updateRatingInput: $updateRatingInput) {
    ...ratingMutationResponse
  }
}
    ${RatingMutationResponseFragmentDoc}`;
export type UpdateRatingMutationFn = Apollo.MutationFunction<UpdateRatingMutation, UpdateRatingMutationVariables>;

/**
 * __useUpdateRatingMutation__
 *
 * To run a mutation, you first call `useUpdateRatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRatingMutation, { data, loading, error }] = useUpdateRatingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateRatingInput: // value for 'updateRatingInput'
 *   },
 * });
 */
export function useUpdateRatingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRatingMutation, UpdateRatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRatingMutation, UpdateRatingMutationVariables>(UpdateRatingDocument, options);
      }
export type UpdateRatingMutationHookResult = ReturnType<typeof useUpdateRatingMutation>;
export type UpdateRatingMutationResult = Apollo.MutationResult<UpdateRatingMutation>;
export type UpdateRatingMutationOptions = Apollo.BaseMutationOptions<UpdateRatingMutation, UpdateRatingMutationVariables>;
export const DeleteCandidateDocument = gql`
    mutation DeleteCandidate($id: ID!) {
  deleteCandidate(id: $id) {
    ...mutationStatuses
  }
}
    ${MutationStatusesFragmentDoc}`;
export type DeleteCandidateMutationFn = Apollo.MutationFunction<DeleteCandidateMutation, DeleteCandidateMutationVariables>;

/**
 * __useDeleteCandidateMutation__
 *
 * To run a mutation, you first call `useDeleteCandidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCandidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCandidateMutation, { data, loading, error }] = useDeleteCandidateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCandidateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCandidateMutation, DeleteCandidateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCandidateMutation, DeleteCandidateMutationVariables>(DeleteCandidateDocument, options);
      }
export type DeleteCandidateMutationHookResult = ReturnType<typeof useDeleteCandidateMutation>;
export type DeleteCandidateMutationResult = Apollo.MutationResult<DeleteCandidateMutation>;
export type DeleteCandidateMutationOptions = Apollo.BaseMutationOptions<DeleteCandidateMutation, DeleteCandidateMutationVariables>;
export const CreateCandidateDocument = gql`
    mutation CreateCandidate($ratingId: ID!, $createCandidateInput: CreateRatingCandidateInput!) {
  createCandidate(
    ratingId: $ratingId
    createCandidateInput: $createCandidateInput
  ) {
    ...ratingMutationResponse
  }
}
    ${RatingMutationResponseFragmentDoc}`;
export type CreateCandidateMutationFn = Apollo.MutationFunction<CreateCandidateMutation, CreateCandidateMutationVariables>;

/**
 * __useCreateCandidateMutation__
 *
 * To run a mutation, you first call `useCreateCandidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCandidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCandidateMutation, { data, loading, error }] = useCreateCandidateMutation({
 *   variables: {
 *      ratingId: // value for 'ratingId'
 *      createCandidateInput: // value for 'createCandidateInput'
 *   },
 * });
 */
export function useCreateCandidateMutation(baseOptions?: Apollo.MutationHookOptions<CreateCandidateMutation, CreateCandidateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCandidateMutation, CreateCandidateMutationVariables>(CreateCandidateDocument, options);
      }
export type CreateCandidateMutationHookResult = ReturnType<typeof useCreateCandidateMutation>;
export type CreateCandidateMutationResult = Apollo.MutationResult<CreateCandidateMutation>;
export type CreateCandidateMutationOptions = Apollo.BaseMutationOptions<CreateCandidateMutation, CreateCandidateMutationVariables>;
export const UpdateCandidateDocument = gql`
    mutation UpdateCandidate($id: String!, $updateCandidateInput: CreateRatingCandidateInput!) {
  updateCandidate(id: $id, updateCandidateInput: $updateCandidateInput) {
    ...ratingMutationResponse
  }
}
    ${RatingMutationResponseFragmentDoc}`;
export type UpdateCandidateMutationFn = Apollo.MutationFunction<UpdateCandidateMutation, UpdateCandidateMutationVariables>;

/**
 * __useUpdateCandidateMutation__
 *
 * To run a mutation, you first call `useUpdateCandidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCandidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCandidateMutation, { data, loading, error }] = useUpdateCandidateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateCandidateInput: // value for 'updateCandidateInput'
 *   },
 * });
 */
export function useUpdateCandidateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCandidateMutation, UpdateCandidateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCandidateMutation, UpdateCandidateMutationVariables>(UpdateCandidateDocument, options);
      }
export type UpdateCandidateMutationHookResult = ReturnType<typeof useUpdateCandidateMutation>;
export type UpdateCandidateMutationResult = Apollo.MutationResult<UpdateCandidateMutation>;
export type UpdateCandidateMutationOptions = Apollo.BaseMutationOptions<UpdateCandidateMutation, UpdateCandidateMutationVariables>;
export const VoteCandidateDocument = gql`
    mutation VoteCandidate($ratingId: ID!, $candidateId: ID!) {
  voteCandidate(ratingId: $ratingId, candidateId: $candidateId) {
    ...ratingMutationResponse
  }
}
    ${RatingMutationResponseFragmentDoc}`;
export type VoteCandidateMutationFn = Apollo.MutationFunction<VoteCandidateMutation, VoteCandidateMutationVariables>;

/**
 * __useVoteCandidateMutation__
 *
 * To run a mutation, you first call `useVoteCandidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteCandidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteCandidateMutation, { data, loading, error }] = useVoteCandidateMutation({
 *   variables: {
 *      ratingId: // value for 'ratingId'
 *      candidateId: // value for 'candidateId'
 *   },
 * });
 */
export function useVoteCandidateMutation(baseOptions?: Apollo.MutationHookOptions<VoteCandidateMutation, VoteCandidateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteCandidateMutation, VoteCandidateMutationVariables>(VoteCandidateDocument, options);
      }
export type VoteCandidateMutationHookResult = ReturnType<typeof useVoteCandidateMutation>;
export type VoteCandidateMutationResult = Apollo.MutationResult<VoteCandidateMutation>;
export type VoteCandidateMutationOptions = Apollo.BaseMutationOptions<VoteCandidateMutation, VoteCandidateMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    success
    message
    accessToken
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    code
    success
    message
    profile {
      ...profileInfo
    }
  }
}
    ${ProfileInfoFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateProfileInput: // value for 'updateProfileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ConversationsDocument = gql`
    query Conversations($limit: Int, $offset: Int) {
  getConversations(limit: $limit, offset: $offset) {
    totalCount
    hasMore
    error
    results {
      ...conversationInfo
    }
  }
}
    ${ConversationInfoFragmentDoc}`;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useConversationsQuery(baseOptions?: Apollo.QueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
      }
export function useConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsQueryResult = Apollo.QueryResult<ConversationsQuery, ConversationsQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($limit: Int, $offset: Int, $conversationId: ID!) {
  getMessages(limit: $limit, offset: $offset, conversationId: $conversationId) {
    totalCount
    hasMore
    error
    results {
      ...messageInfo
    }
  }
}
    ${MessageInfoFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const ConversationDocument = gql`
    query Conversation($id: ID!) {
  getConversation(id: $id) {
    ...conversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConversationQuery(baseOptions: Apollo.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, options);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = Apollo.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const ClubDocument = gql`
    query Club($id: ID!) {
  club(id: $id) {
    ...clubInfo
  }
}
    ${ClubInfoFragmentDoc}`;

/**
 * __useClubQuery__
 *
 * To run a query within a React component, call `useClubQuery` and pass it any options that fit your needs.
 * When your component renders, `useClubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClubQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClubQuery(baseOptions: Apollo.QueryHookOptions<ClubQuery, ClubQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClubQuery, ClubQueryVariables>(ClubDocument, options);
      }
export function useClubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClubQuery, ClubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClubQuery, ClubQueryVariables>(ClubDocument, options);
        }
export type ClubQueryHookResult = ReturnType<typeof useClubQuery>;
export type ClubLazyQueryHookResult = ReturnType<typeof useClubLazyQuery>;
export type ClubQueryResult = Apollo.QueryResult<ClubQuery, ClubQueryVariables>;
export const ClubsDocument = gql`
    query Clubs($limit: Int!, $offset: Int!, $ordering: String) {
  clubs(limit: $limit, offset: $offset, ordering: $ordering) {
    totalCount
    hasMore
    results {
      ...clubInfo
    }
  }
}
    ${ClubInfoFragmentDoc}`;

/**
 * __useClubsQuery__
 *
 * To run a query within a React component, call `useClubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClubsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useClubsQuery(baseOptions: Apollo.QueryHookOptions<ClubsQuery, ClubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClubsQuery, ClubsQueryVariables>(ClubsDocument, options);
      }
export function useClubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClubsQuery, ClubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClubsQuery, ClubsQueryVariables>(ClubsDocument, options);
        }
export type ClubsQueryHookResult = ReturnType<typeof useClubsQuery>;
export type ClubsLazyQueryHookResult = ReturnType<typeof useClubsLazyQuery>;
export type ClubsQueryResult = Apollo.QueryResult<ClubsQuery, ClubsQueryVariables>;
export const GetClubRequestingNumberDocument = gql`
    query GetClubRequestingNumber($clubId: ID!) {
  getClubRequestingNumber(clubId: $clubId)
}
    `;

/**
 * __useGetClubRequestingNumberQuery__
 *
 * To run a query within a React component, call `useGetClubRequestingNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClubRequestingNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClubRequestingNumberQuery({
 *   variables: {
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useGetClubRequestingNumberQuery(baseOptions: Apollo.QueryHookOptions<GetClubRequestingNumberQuery, GetClubRequestingNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClubRequestingNumberQuery, GetClubRequestingNumberQueryVariables>(GetClubRequestingNumberDocument, options);
      }
export function useGetClubRequestingNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClubRequestingNumberQuery, GetClubRequestingNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClubRequestingNumberQuery, GetClubRequestingNumberQueryVariables>(GetClubRequestingNumberDocument, options);
        }
export type GetClubRequestingNumberQueryHookResult = ReturnType<typeof useGetClubRequestingNumberQuery>;
export type GetClubRequestingNumberLazyQueryHookResult = ReturnType<typeof useGetClubRequestingNumberLazyQuery>;
export type GetClubRequestingNumberQueryResult = Apollo.QueryResult<GetClubRequestingNumberQuery, GetClubRequestingNumberQueryVariables>;
export const ClubMembersDocument = gql`
    query ClubMembers($limit: Int, $offset: Int, $clubId: ID!, $status: Int!, $role: Int, $searchName: String, $ordering: String) {
  clubmembers(
    limit: $limit
    offset: $offset
    clubId: $clubId
    status: $status
    role: $role
    searchName: $searchName
    ordering: $ordering
  ) {
    totalCount
    hasMore
    results {
      ...clubMemberInfo
    }
  }
}
    ${ClubMemberInfoFragmentDoc}`;

/**
 * __useClubMembersQuery__
 *
 * To run a query within a React component, call `useClubMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useClubMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClubMembersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      clubId: // value for 'clubId'
 *      status: // value for 'status'
 *      role: // value for 'role'
 *      searchName: // value for 'searchName'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useClubMembersQuery(baseOptions: Apollo.QueryHookOptions<ClubMembersQuery, ClubMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClubMembersQuery, ClubMembersQueryVariables>(ClubMembersDocument, options);
      }
export function useClubMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClubMembersQuery, ClubMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClubMembersQuery, ClubMembersQueryVariables>(ClubMembersDocument, options);
        }
export type ClubMembersQueryHookResult = ReturnType<typeof useClubMembersQuery>;
export type ClubMembersLazyQueryHookResult = ReturnType<typeof useClubMembersLazyQuery>;
export type ClubMembersQueryResult = Apollo.QueryResult<ClubMembersQuery, ClubMembersQueryVariables>;
export const MyClubNotesDocument = gql`
    query MyClubNotes {
  myClubNotes {
    totalCount
    hasMore
    results {
      ...clubNoteInfo
      club {
        id
        title
      }
    }
  }
}
    ${ClubNoteInfoFragmentDoc}`;

/**
 * __useMyClubNotesQuery__
 *
 * To run a query within a React component, call `useMyClubNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyClubNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyClubNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyClubNotesQuery(baseOptions?: Apollo.QueryHookOptions<MyClubNotesQuery, MyClubNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyClubNotesQuery, MyClubNotesQueryVariables>(MyClubNotesDocument, options);
      }
export function useMyClubNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyClubNotesQuery, MyClubNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyClubNotesQuery, MyClubNotesQueryVariables>(MyClubNotesDocument, options);
        }
export type MyClubNotesQueryHookResult = ReturnType<typeof useMyClubNotesQuery>;
export type MyClubNotesLazyQueryHookResult = ReturnType<typeof useMyClubNotesLazyQuery>;
export type MyClubNotesQueryResult = Apollo.QueryResult<MyClubNotesQuery, MyClubNotesQueryVariables>;
export const ClubNotesDocument = gql`
    query ClubNotes($limit: Int!, $offset: Int!, $clubId: ID!) {
  clubNotes(limit: $limit, offset: $offset, clubId: $clubId) {
    totalCount
    hasMore
    results {
      ...clubNoteInfo
      club {
        id
        title
      }
    }
  }
}
    ${ClubNoteInfoFragmentDoc}`;

/**
 * __useClubNotesQuery__
 *
 * To run a query within a React component, call `useClubNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useClubNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClubNotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useClubNotesQuery(baseOptions: Apollo.QueryHookOptions<ClubNotesQuery, ClubNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClubNotesQuery, ClubNotesQueryVariables>(ClubNotesDocument, options);
      }
export function useClubNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClubNotesQuery, ClubNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClubNotesQuery, ClubNotesQueryVariables>(ClubNotesDocument, options);
        }
export type ClubNotesQueryHookResult = ReturnType<typeof useClubNotesQuery>;
export type ClubNotesLazyQueryHookResult = ReturnType<typeof useClubNotesLazyQuery>;
export type ClubNotesQueryResult = Apollo.QueryResult<ClubNotesQuery, ClubNotesQueryVariables>;
export const CommentsDocument = gql`
    query Comments($limit: Int, $offset: Int, $ordering: String, $postId: ID!) {
  comments(limit: $limit, offset: $offset, ordering: $ordering, postId: $postId) {
    totalCount
    hasMore
    results {
      ...commentInfo
    }
  }
}
    ${CommentInfoFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      ordering: // value for 'ordering'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const EventDocument = gql`
    query Event($id: ID!) {
  getEvent(id: $id) {
    ...eventInfo
  }
}
    ${EventInfoFragmentDoc}`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventsDocument = gql`
    query Events($limit: Int!, $offset: Int!, $dateBefore: String!, $dateAfter: String!, $clubId: String!) {
  getEvents(
    limit: $limit
    offset: $offset
    dateAfter: $dateAfter
    dateBefore: $dateBefore
    clubId: $clubId
  ) {
    totalCount
    hasMore
    results {
      ...eventInfo
    }
  }
}
    ${EventInfoFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      dateBefore: // value for 'dateBefore'
 *      dateAfter: // value for 'dateAfter'
 *      clubId: // value for 'clubId'
 *   },
 * });
 */
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const MyEventsDocument = gql`
    query MyEvents {
  myEvents {
    totalCount
    hasMore
    results {
      ...eventInfo
    }
  }
}
    ${EventInfoFragmentDoc}`;

/**
 * __useMyEventsQuery__
 *
 * To run a query within a React component, call `useMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
      }
export function useMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventsQuery, MyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventsQuery, MyEventsQueryVariables>(MyEventsDocument, options);
        }
export type MyEventsQueryHookResult = ReturnType<typeof useMyEventsQuery>;
export type MyEventsLazyQueryHookResult = ReturnType<typeof useMyEventsLazyQuery>;
export type MyEventsQueryResult = Apollo.QueryResult<MyEventsQuery, MyEventsQueryVariables>;
export const MyConfirmedEventsDocument = gql`
    query MyConfirmedEvents {
  myEvents {
    totalCount
    hasMore
    results {
      ...eventInfo
      myConfirmedCount
    }
  }
}
    ${EventInfoFragmentDoc}`;

/**
 * __useMyConfirmedEventsQuery__
 *
 * To run a query within a React component, call `useMyConfirmedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyConfirmedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyConfirmedEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyConfirmedEventsQuery(baseOptions?: Apollo.QueryHookOptions<MyConfirmedEventsQuery, MyConfirmedEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyConfirmedEventsQuery, MyConfirmedEventsQueryVariables>(MyConfirmedEventsDocument, options);
      }
export function useMyConfirmedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyConfirmedEventsQuery, MyConfirmedEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyConfirmedEventsQuery, MyConfirmedEventsQueryVariables>(MyConfirmedEventsDocument, options);
        }
export type MyConfirmedEventsQueryHookResult = ReturnType<typeof useMyConfirmedEventsQuery>;
export type MyConfirmedEventsLazyQueryHookResult = ReturnType<typeof useMyConfirmedEventsLazyQuery>;
export type MyConfirmedEventsQueryResult = Apollo.QueryResult<MyConfirmedEventsQuery, MyConfirmedEventsQueryVariables>;
export const MyEventsCountDocument = gql`
    query MyEventsCount {
  myEventsCount
}
    `;

/**
 * __useMyEventsCountQuery__
 *
 * To run a query within a React component, call `useMyEventsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEventsCountQuery(baseOptions?: Apollo.QueryHookOptions<MyEventsCountQuery, MyEventsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventsCountQuery, MyEventsCountQueryVariables>(MyEventsCountDocument, options);
      }
export function useMyEventsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventsCountQuery, MyEventsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventsCountQuery, MyEventsCountQueryVariables>(MyEventsCountDocument, options);
        }
export type MyEventsCountQueryHookResult = ReturnType<typeof useMyEventsCountQuery>;
export type MyEventsCountLazyQueryHookResult = ReturnType<typeof useMyEventsCountLazyQuery>;
export type MyEventsCountQueryResult = Apollo.QueryResult<MyEventsCountQuery, MyEventsCountQueryVariables>;
export const GetVotesDocument = gql`
    query GetVotes($limit: Int!, $offset: Int!, $status: Int!, $eventId: ID!) {
  getVotes(limit: $limit, offset: $offset, status: $status, eventId: $eventId) {
    totalCount
    hasMore
    results {
      ...voteInfo
    }
  }
}
    ${VoteInfoFragmentDoc}`;

/**
 * __useGetVotesQuery__
 *
 * To run a query within a React component, call `useGetVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetVotesQuery(baseOptions: Apollo.QueryHookOptions<GetVotesQuery, GetVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVotesQuery, GetVotesQueryVariables>(GetVotesDocument, options);
      }
export function useGetVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVotesQuery, GetVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVotesQuery, GetVotesQueryVariables>(GetVotesDocument, options);
        }
export type GetVotesQueryHookResult = ReturnType<typeof useGetVotesQuery>;
export type GetVotesLazyQueryHookResult = ReturnType<typeof useGetVotesLazyQuery>;
export type GetVotesQueryResult = Apollo.QueryResult<GetVotesQuery, GetVotesQueryVariables>;
export const GetVoteStatsDocument = gql`
    query GetVoteStats($eventId: ID!) {
  getVoteStats(eventId: $eventId) {
    confirmed
    waiting
    total
  }
}
    `;

/**
 * __useGetVoteStatsQuery__
 *
 * To run a query within a React component, call `useGetVoteStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteStatsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetVoteStatsQuery(baseOptions: Apollo.QueryHookOptions<GetVoteStatsQuery, GetVoteStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVoteStatsQuery, GetVoteStatsQueryVariables>(GetVoteStatsDocument, options);
      }
export function useGetVoteStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoteStatsQuery, GetVoteStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVoteStatsQuery, GetVoteStatsQueryVariables>(GetVoteStatsDocument, options);
        }
export type GetVoteStatsQueryHookResult = ReturnType<typeof useGetVoteStatsQuery>;
export type GetVoteStatsLazyQueryHookResult = ReturnType<typeof useGetVoteStatsLazyQuery>;
export type GetVoteStatsQueryResult = Apollo.QueryResult<GetVoteStatsQuery, GetVoteStatsQueryVariables>;
export const GetMyVotesDocument = gql`
    query GetMyVotes($eventId: ID!) {
  getMyVotes(eventId: $eventId) {
    totalCount
    hasMore
    results {
      ...voteInfo
    }
  }
}
    ${VoteInfoFragmentDoc}`;

/**
 * __useGetMyVotesQuery__
 *
 * To run a query within a React component, call `useGetMyVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyVotesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetMyVotesQuery(baseOptions: Apollo.QueryHookOptions<GetMyVotesQuery, GetMyVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyVotesQuery, GetMyVotesQueryVariables>(GetMyVotesDocument, options);
      }
export function useGetMyVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyVotesQuery, GetMyVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyVotesQuery, GetMyVotesQueryVariables>(GetMyVotesDocument, options);
        }
export type GetMyVotesQueryHookResult = ReturnType<typeof useGetMyVotesQuery>;
export type GetMyVotesLazyQueryHookResult = ReturnType<typeof useGetMyVotesLazyQuery>;
export type GetMyVotesQueryResult = Apollo.QueryResult<GetMyVotesQuery, GetMyVotesQueryVariables>;
export const GetMyHistoryVotesDocument = gql`
    query GetMyHistoryVotes($limit: Int!, $offset: Int!) {
  getMyHistoryVotes(limit: $limit, offset: $offset) {
    totalCount
    hasMore
    results {
      ...voteInfo
    }
  }
}
    ${VoteInfoFragmentDoc}`;

/**
 * __useGetMyHistoryVotesQuery__
 *
 * To run a query within a React component, call `useGetMyHistoryVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyHistoryVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyHistoryVotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMyHistoryVotesQuery(baseOptions: Apollo.QueryHookOptions<GetMyHistoryVotesQuery, GetMyHistoryVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyHistoryVotesQuery, GetMyHistoryVotesQueryVariables>(GetMyHistoryVotesDocument, options);
      }
export function useGetMyHistoryVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyHistoryVotesQuery, GetMyHistoryVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyHistoryVotesQuery, GetMyHistoryVotesQueryVariables>(GetMyHistoryVotesDocument, options);
        }
export type GetMyHistoryVotesQueryHookResult = ReturnType<typeof useGetMyHistoryVotesQuery>;
export type GetMyHistoryVotesLazyQueryHookResult = ReturnType<typeof useGetMyHistoryVotesLazyQuery>;
export type GetMyHistoryVotesQueryResult = Apollo.QueryResult<GetMyHistoryVotesQuery, GetMyHistoryVotesQueryVariables>;
export const GetMemberVotesDocument = gql`
    query GetMemberVotes($limit: Int!, $offset: Int!, $memberId: String!) {
  getMemberVotes(limit: $limit, offset: $offset, memberId: $memberId) {
    totalCount
    hasMore
    results {
      ...voteInfo
    }
  }
}
    ${VoteInfoFragmentDoc}`;

/**
 * __useGetMemberVotesQuery__
 *
 * To run a query within a React component, call `useGetMemberVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberVotesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetMemberVotesQuery(baseOptions: Apollo.QueryHookOptions<GetMemberVotesQuery, GetMemberVotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberVotesQuery, GetMemberVotesQueryVariables>(GetMemberVotesDocument, options);
      }
export function useGetMemberVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberVotesQuery, GetMemberVotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberVotesQuery, GetMemberVotesQueryVariables>(GetMemberVotesDocument, options);
        }
export type GetMemberVotesQueryHookResult = ReturnType<typeof useGetMemberVotesQuery>;
export type GetMemberVotesLazyQueryHookResult = ReturnType<typeof useGetMemberVotesLazyQuery>;
export type GetMemberVotesQueryResult = Apollo.QueryResult<GetMemberVotesQuery, GetMemberVotesQueryVariables>;
export const GetVoteCountDocument = gql`
    query GetVoteCount($id: ID!) {
  getVoteCount(id: $id)
}
    `;

/**
 * __useGetVoteCountQuery__
 *
 * To run a query within a React component, call `useGetVoteCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteCountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVoteCountQuery(baseOptions: Apollo.QueryHookOptions<GetVoteCountQuery, GetVoteCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVoteCountQuery, GetVoteCountQueryVariables>(GetVoteCountDocument, options);
      }
export function useGetVoteCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVoteCountQuery, GetVoteCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVoteCountQuery, GetVoteCountQueryVariables>(GetVoteCountDocument, options);
        }
export type GetVoteCountQueryHookResult = ReturnType<typeof useGetVoteCountQuery>;
export type GetVoteCountLazyQueryHookResult = ReturnType<typeof useGetVoteCountLazyQuery>;
export type GetVoteCountQueryResult = Apollo.QueryResult<GetVoteCountQuery, GetVoteCountQueryVariables>;
export const GetWaitingVoteDocument = gql`
    query GetWaitingVote($id: ID!) {
  getWaitingVote(id: $id)
}
    `;

/**
 * __useGetWaitingVoteQuery__
 *
 * To run a query within a React component, call `useGetWaitingVoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWaitingVoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWaitingVoteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWaitingVoteQuery(baseOptions: Apollo.QueryHookOptions<GetWaitingVoteQuery, GetWaitingVoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWaitingVoteQuery, GetWaitingVoteQueryVariables>(GetWaitingVoteDocument, options);
      }
export function useGetWaitingVoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWaitingVoteQuery, GetWaitingVoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWaitingVoteQuery, GetWaitingVoteQueryVariables>(GetWaitingVoteDocument, options);
        }
export type GetWaitingVoteQueryHookResult = ReturnType<typeof useGetWaitingVoteQuery>;
export type GetWaitingVoteLazyQueryHookResult = ReturnType<typeof useGetWaitingVoteLazyQuery>;
export type GetWaitingVoteQueryResult = Apollo.QueryResult<GetWaitingVoteQuery, GetWaitingVoteQueryVariables>;
export const GetEventIsVotedDocument = gql`
    query GetEventIsVoted($eventId: ID!) {
  getEventIsVoted(eventId: $eventId)
}
    `;

/**
 * __useGetEventIsVotedQuery__
 *
 * To run a query within a React component, call `useGetEventIsVotedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventIsVotedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventIsVotedQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventIsVotedQuery(baseOptions: Apollo.QueryHookOptions<GetEventIsVotedQuery, GetEventIsVotedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventIsVotedQuery, GetEventIsVotedQueryVariables>(GetEventIsVotedDocument, options);
      }
export function useGetEventIsVotedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventIsVotedQuery, GetEventIsVotedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventIsVotedQuery, GetEventIsVotedQueryVariables>(GetEventIsVotedDocument, options);
        }
export type GetEventIsVotedQueryHookResult = ReturnType<typeof useGetEventIsVotedQuery>;
export type GetEventIsVotedLazyQueryHookResult = ReturnType<typeof useGetEventIsVotedLazyQuery>;
export type GetEventIsVotedQueryResult = Apollo.QueryResult<GetEventIsVotedQuery, GetEventIsVotedQueryVariables>;
export const GetFollowersDocument = gql`
    query GetFollowers($profileId: String!, $limit: Int, $offset: Int) {
  getFollowers(limit: $limit, offset: $offset, profileId: $profileId) {
    totalCount
    hasMore
    results {
      ...profileInfo
      isFollowing
    }
  }
}
    ${ProfileInfoFragmentDoc}`;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowersQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetFollowersQuery(baseOptions: Apollo.QueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
      }
export function useGetFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowersQuery, GetFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, options);
        }
export type GetFollowersQueryHookResult = ReturnType<typeof useGetFollowersQuery>;
export type GetFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowersLazyQuery>;
export type GetFollowersQueryResult = Apollo.QueryResult<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetFriendsDocument = gql`
    query GetFriends($profileId: String!, $limit: Int, $offset: Int, $search: String) {
  getFriends(
    limit: $limit
    offset: $offset
    profileId: $profileId
    search: $search
  ) {
    totalCount
    hasMore
    results {
      ...profileInfo
      isFollowing
    }
  }
}
    ${ProfileInfoFragmentDoc}`;

/**
 * __useGetFriendsQuery__
 *
 * To run a query within a React component, call `useGetFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
      }
export function useGetFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
        }
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<typeof useGetFriendsLazyQuery>;
export type GetFriendsQueryResult = Apollo.QueryResult<GetFriendsQuery, GetFriendsQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($id: ID!) {
  getProfile(id: $id) {
    ...profileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  myProfile {
    ...profileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($limit: Int!, $offset: Int!) {
  getNotifications(limit: $limit, offset: $offset) {
    totalCount
    results {
      ...userNotificationInfo
    }
  }
}
    ${UserNotificationInfoFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetNotiUnreadCountDocument = gql`
    query GetNotiUnreadCount {
  getUnreadCount
}
    `;

/**
 * __useGetNotiUnreadCountQuery__
 *
 * To run a query within a React component, call `useGetNotiUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotiUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotiUnreadCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotiUnreadCountQuery(baseOptions?: Apollo.QueryHookOptions<GetNotiUnreadCountQuery, GetNotiUnreadCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotiUnreadCountQuery, GetNotiUnreadCountQueryVariables>(GetNotiUnreadCountDocument, options);
      }
export function useGetNotiUnreadCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotiUnreadCountQuery, GetNotiUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotiUnreadCountQuery, GetNotiUnreadCountQueryVariables>(GetNotiUnreadCountDocument, options);
        }
export type GetNotiUnreadCountQueryHookResult = ReturnType<typeof useGetNotiUnreadCountQuery>;
export type GetNotiUnreadCountLazyQueryHookResult = ReturnType<typeof useGetNotiUnreadCountLazyQuery>;
export type GetNotiUnreadCountQueryResult = Apollo.QueryResult<GetNotiUnreadCountQuery, GetNotiUnreadCountQueryVariables>;
export const PostDocument = gql`
    query Post($id: ID!) {
  post(id: $id) {
    ...postWithUserInfo
    favoritePerson {
      id
      avatar
      displayName
    }
  }
}
    ${PostWithUserInfoFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $offset: Int!, $ordering: String) {
  posts(limit: $limit, offset: $offset, ordering: $ordering) {
    totalCount
    hasMore
    results {
      ...postWithUserInfo
    }
  }
}
    ${PostWithUserInfoFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const ProfilesDocument = gql`
    query Profiles($limit: Int!, $offset: Int!, $ordering: String, $search: String) {
  getProfiles(
    limit: $limit
    offset: $offset
    ordering: $ordering
    search: $search
  ) {
    totalCount
    hasMore
    results {
      ...profileInfo
    }
  }
}
    ${ProfileInfoFragmentDoc}`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      ordering: // value for 'ordering'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useProfilesQuery(baseOptions: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
      }
export function useProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
        }
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesQuery, ProfilesQueryVariables>;
export const RatingsDocument = gql`
    query Ratings($limit: Int!, $offset: Int!, $ordering: String) {
  ratings(limit: $limit, offset: $offset, ordering: $ordering) {
    totalCount
    hasMore
    results {
      ...ratingInfo
    }
  }
}
    ${RatingInfoFragmentDoc}`;

/**
 * __useRatingsQuery__
 *
 * To run a query within a React component, call `useRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatingsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      ordering: // value for 'ordering'
 *   },
 * });
 */
export function useRatingsQuery(baseOptions: Apollo.QueryHookOptions<RatingsQuery, RatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RatingsQuery, RatingsQueryVariables>(RatingsDocument, options);
      }
export function useRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RatingsQuery, RatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RatingsQuery, RatingsQueryVariables>(RatingsDocument, options);
        }
export type RatingsQueryHookResult = ReturnType<typeof useRatingsQuery>;
export type RatingsLazyQueryHookResult = ReturnType<typeof useRatingsLazyQuery>;
export type RatingsQueryResult = Apollo.QueryResult<RatingsQuery, RatingsQueryVariables>;
export const MyRatingsDocument = gql`
    query MyRatings {
  myRatings {
    totalCount
    hasMore
    results {
      ...ratingInfo
      votedFor {
        ...ratingCandidateInfo
      }
    }
  }
}
    ${RatingInfoFragmentDoc}
${RatingCandidateInfoFragmentDoc}`;

/**
 * __useMyRatingsQuery__
 *
 * To run a query within a React component, call `useMyRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyRatingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyRatingsQuery(baseOptions?: Apollo.QueryHookOptions<MyRatingsQuery, MyRatingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyRatingsQuery, MyRatingsQueryVariables>(MyRatingsDocument, options);
      }
export function useMyRatingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyRatingsQuery, MyRatingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyRatingsQuery, MyRatingsQueryVariables>(MyRatingsDocument, options);
        }
export type MyRatingsQueryHookResult = ReturnType<typeof useMyRatingsQuery>;
export type MyRatingsLazyQueryHookResult = ReturnType<typeof useMyRatingsLazyQuery>;
export type MyRatingsQueryResult = Apollo.QueryResult<MyRatingsQuery, MyRatingsQueryVariables>;
export const RatingDocument = gql`
    query Rating($id: ID!) {
  rating(id: $id) {
    ...ratingInfo
  }
}
    ${RatingInfoFragmentDoc}`;

/**
 * __useRatingQuery__
 *
 * To run a query within a React component, call `useRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRatingQuery(baseOptions: Apollo.QueryHookOptions<RatingQuery, RatingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RatingQuery, RatingQueryVariables>(RatingDocument, options);
      }
export function useRatingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RatingQuery, RatingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RatingQuery, RatingQueryVariables>(RatingDocument, options);
        }
export type RatingQueryHookResult = ReturnType<typeof useRatingQuery>;
export type RatingLazyQueryHookResult = ReturnType<typeof useRatingLazyQuery>;
export type RatingQueryResult = Apollo.QueryResult<RatingQuery, RatingQueryVariables>;
export const GetCandidatesDocument = gql`
    query GetCandidates($ratingId: ID!) {
  getCandidates(ratingId: $ratingId) {
    totalCount
    hasMore
    results {
      ...ratingCandidateInfo
    }
  }
}
    ${RatingCandidateInfoFragmentDoc}`;

/**
 * __useGetCandidatesQuery__
 *
 * To run a query within a React component, call `useGetCandidatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidatesQuery({
 *   variables: {
 *      ratingId: // value for 'ratingId'
 *   },
 * });
 */
export function useGetCandidatesQuery(baseOptions: Apollo.QueryHookOptions<GetCandidatesQuery, GetCandidatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCandidatesQuery, GetCandidatesQueryVariables>(GetCandidatesDocument, options);
      }
export function useGetCandidatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCandidatesQuery, GetCandidatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCandidatesQuery, GetCandidatesQueryVariables>(GetCandidatesDocument, options);
        }
export type GetCandidatesQueryHookResult = ReturnType<typeof useGetCandidatesQuery>;
export type GetCandidatesLazyQueryHookResult = ReturnType<typeof useGetCandidatesLazyQuery>;
export type GetCandidatesQueryResult = Apollo.QueryResult<GetCandidatesQuery, GetCandidatesQueryVariables>;
export const GetRatingVoteDocument = gql`
    query GetRatingVote($candidateId: ID!) {
  getRatingVotes(candidateId: $candidateId) {
    totalCount
    hasMore
    results {
      id
      createdAt
      voter {
        ...userInfo
      }
    }
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useGetRatingVoteQuery__
 *
 * To run a query within a React component, call `useGetRatingVoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingVoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingVoteQuery({
 *   variables: {
 *      candidateId: // value for 'candidateId'
 *   },
 * });
 */
export function useGetRatingVoteQuery(baseOptions: Apollo.QueryHookOptions<GetRatingVoteQuery, GetRatingVoteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingVoteQuery, GetRatingVoteQueryVariables>(GetRatingVoteDocument, options);
      }
export function useGetRatingVoteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingVoteQuery, GetRatingVoteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingVoteQuery, GetRatingVoteQueryVariables>(GetRatingVoteDocument, options);
        }
export type GetRatingVoteQueryHookResult = ReturnType<typeof useGetRatingVoteQuery>;
export type GetRatingVoteLazyQueryHookResult = ReturnType<typeof useGetRatingVoteLazyQuery>;
export type GetRatingVoteQueryResult = Apollo.QueryResult<GetRatingVoteQuery, GetRatingVoteQueryVariables>;
export const MessageSendSubscriptionDocument = gql`
    subscription MessageSendSubscription($conversationId: ID!) {
  newMessageSent(conversationId: $conversationId) {
    ...messageInfo
  }
}
    ${MessageInfoFragmentDoc}`;

/**
 * __useMessageSendSubscriptionSubscription__
 *
 * To run a query within a React component, call `useMessageSendSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSendSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSendSubscriptionSubscription({
 *   variables: {
 *      conversationId: // value for 'conversationId'
 *   },
 * });
 */
export function useMessageSendSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSendSubscriptionSubscription, MessageSendSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSendSubscriptionSubscription, MessageSendSubscriptionSubscriptionVariables>(MessageSendSubscriptionDocument, options);
      }
export type MessageSendSubscriptionSubscriptionHookResult = ReturnType<typeof useMessageSendSubscriptionSubscription>;
export type MessageSendSubscriptionSubscriptionResult = Apollo.SubscriptionResult<MessageSendSubscriptionSubscription>;
export const ConversationChangedDocument = gql`
    subscription ConversationChanged($profileId: ID!) {
  conversationChanged(profileId: $profileId) {
    ...conversationInfo
  }
}
    ${ConversationInfoFragmentDoc}`;

/**
 * __useConversationChangedSubscription__
 *
 * To run a query within a React component, call `useConversationChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationChangedSubscription({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useConversationChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ConversationChangedSubscription, ConversationChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ConversationChangedSubscription, ConversationChangedSubscriptionVariables>(ConversationChangedDocument, options);
      }
export type ConversationChangedSubscriptionHookResult = ReturnType<typeof useConversationChangedSubscription>;
export type ConversationChangedSubscriptionResult = Apollo.SubscriptionResult<ConversationChangedSubscription>;
export const EventVoteChangedSubscriptionDocument = gql`
    subscription EventVoteChangedSubscription($eventId: ID!, $status: Int!) {
  voteChanged(eventId: $eventId, status: $status) {
    voteCount
    waitingCount
    eventId
  }
}
    `;

/**
 * __useEventVoteChangedSubscriptionSubscription__
 *
 * To run a query within a React component, call `useEventVoteChangedSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventVoteChangedSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventVoteChangedSubscriptionSubscription({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useEventVoteChangedSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<EventVoteChangedSubscriptionSubscription, EventVoteChangedSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EventVoteChangedSubscriptionSubscription, EventVoteChangedSubscriptionSubscriptionVariables>(EventVoteChangedSubscriptionDocument, options);
      }
export type EventVoteChangedSubscriptionSubscriptionHookResult = ReturnType<typeof useEventVoteChangedSubscriptionSubscription>;
export type EventVoteChangedSubscriptionSubscriptionResult = Apollo.SubscriptionResult<EventVoteChangedSubscriptionSubscription>;
export const NewNotificationDocument = gql`
    subscription NewNotification($profileId: ID!) {
  newNotification(profileId: $profileId) {
    notification {
      ...userNotificationInfo
    }
  }
}
    ${UserNotificationInfoFragmentDoc}`;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, options);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscription>;