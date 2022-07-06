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
  profile: Profile;
  role?: Maybe<Scalars['Float']>;
  status: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ClubMutationResponse = IMutationResponse & {
  __typename?: 'ClubMutationResponse';
  club?: Maybe<Club>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
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
  cancelRequestClub: ClubMutationResponse;
  changeAdmin: ClubMutationResponse;
  changeEventStatus: EventMutationResponse;
  changeEventVote: EventMutationResponse;
  changePassword: UserMutationResponse;
  changeSlots: EventMutationResponse;
  commentPost: CommentMutationResponse;
  createClub: ClubMutationResponse;
  createEvent: EventMutationResponse;
  createPost: PostMutationResponse;
  deleteClub: ClubMutationResponse;
  deleteClubMember: ClubMutationResponse;
  deleteComment: CommentMutationResponse;
  deleteEvent: EventMutationResponse;
  deleteFriendShip: FriendMutaionResponse;
  deletePost: PostMutationResponse;
  fbLogin: UserMutationResponse;
  follow: FollowingMutaionResponse;
  forgotPassword: UserMutationResponse;
  like: MutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
  register: UserMutationResponse;
  replyComment: CommentMutationResponse;
  requestJoinClub: ClubMutationResponse;
  setRole: ClubMutationResponse;
  unFollow: FollowingMutaionResponse;
  unVoteEvent: EventMutationResponse;
  updateClub: ClubMutationResponse;
  updateEvent: EventMutationResponse;
  updatePost: PostMutationResponse;
  updateProfile: ProfileMutationResponse;
  updateUser: UserMutationResponse;
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


export type MutationCancelRequestClubArgs = {
  clubId: Scalars['ID'];
};


export type MutationChangeAdminArgs = {
  clubId: Scalars['ID'];
  memberId: Scalars['ID'];
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


export type MutationCreateClubArgs = {
  createClubInput: CreateClubInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeleteClubArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClubMemberArgs = {
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


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationReplyCommentArgs = {
  replyCommentInput: ReplyCommentInput;
};


export type MutationRequestJoinClubArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateClubArgs = {
  id: Scalars['String'];
  updateClubInput: UpdateClubInput;
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


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
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

export type NewVoteSubscriptionData = {
  __typename?: 'NewVoteSubscriptionData';
  eventId: Scalars['String'];
  status: Scalars['Float'];
  voteCount?: Maybe<Scalars['Float']>;
  waitingCount?: Maybe<Scalars['Float']>;
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
  clubmembers?: Maybe<Clubmembers>;
  clubs?: Maybe<Clubs>;
  comments?: Maybe<Comments>;
  getConversation?: Maybe<Conversation>;
  getConversations?: Maybe<Conversations>;
  getEvent?: Maybe<ClubEvent>;
  getEvents?: Maybe<Events>;
  getFollowers?: Maybe<Profiles>;
  getFriends?: Maybe<Profiles>;
  getMessages?: Maybe<Messages>;
  getMyVotes?: Maybe<Votes>;
  getProfile?: Maybe<Profile>;
  getProfiles?: Maybe<Profiles>;
  getVoteCount: Scalars['Float'];
  getVoteStats?: Maybe<VotCount>;
  getVotes?: Maybe<Votes>;
  getWaitingVote: Scalars['Float'];
  hello: Scalars['Float'];
  me?: Maybe<User>;
  myEvents?: Maybe<Events>;
  myProfile?: Maybe<Profile>;
  post?: Maybe<Post>;
  posts?: Maybe<Posts>;
  users: Array<User>;
};


export type QueryClubArgs = {
  id: Scalars['ID'];
};


export type QueryClubmembersArgs = {
  clubId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['Int']>;
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


export type QueryGetMessagesArgs = {
  conversationId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetMyVotesArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetProfileArgs = {
  id: Scalars['ID'];
};


export type QueryGetProfilesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
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
  voteChanged: NewVoteSubscriptionData;
};


export type SubscriptionConversationChangedArgs = {
  profileId: Scalars['ID'];
};


export type SubscriptionNewMessageSentArgs = {
  conversationId: Scalars['ID'];
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
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
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

export type MessageInfoFragment = { __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } };

export type ConversationInfoFragment = { __typename?: 'Conversation', id: string, type: string, updatedAt: any, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> };

export type ConversationMutationResponseFragment = { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null, conversation?: { __typename?: 'Conversation', id: string, type: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubMutationResponseFragment = { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ClubInfoFragment = { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } };

export type ClubMemberInfoFragment = { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } };

export type CommentInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null };

export type CommentMutationResponseFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CommentWithUserInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type EventMutationResponseFragment = { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type EventInfoFragment = { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } };

export type VoteInfoFragment = { __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

type MutationStatuses_ClubMutationResponse_Fragment = { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_CommentMutationResponse_Fragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ConversationMutationResponse_Fragment = { __typename?: 'ConversationMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_EventMutationResponse_Fragment = { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_FollowingMutaionResponse_Fragment = { __typename?: 'FollowingMutaionResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_FriendMutaionResponse_Fragment = { __typename?: 'FriendMutaionResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_MutationResponse_Fragment = { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ProfileMutationResponse_Fragment = { __typename?: 'ProfileMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type MutationStatusesFragment = MutationStatuses_ClubMutationResponse_Fragment | MutationStatuses_CommentMutationResponse_Fragment | MutationStatuses_ConversationMutationResponse_Fragment | MutationStatuses_EventMutationResponse_Fragment | MutationStatuses_FollowingMutaionResponse_Fragment | MutationStatuses_FriendMutaionResponse_Fragment | MutationStatuses_MutationResponse_Fragment | MutationStatuses_PostMutationResponse_Fragment | MutationStatuses_ProfileMutationResponse_Fragment | MutationStatuses_UserMutationResponse_Fragment;

export type UserMutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type PostMutationStatusesFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

export type CommentMutationStatusesFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

export type PostMutationResponseFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type PostWithUserInfoFragment = { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comment: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type ProfileInfoFragment = { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null };

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

export type DeleteClubMemberMutationVariables = Exact<{
  clubMemId: Scalars['ID'];
}>;


export type DeleteClubMemberMutation = { __typename?: 'Mutation', deleteClubMember: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CancelRequestClubMutationVariables = Exact<{
  clubId: Scalars['ID'];
}>;


export type CancelRequestClubMutation = { __typename?: 'Mutation', cancelRequestClub: { __typename?: 'ClubMutationResponse', code: number, success: boolean, message?: string | null, club?: { __typename?: 'Club', id: string, title: string, cover: string, description: string, publish: boolean, createdAt: any, updatedAt: any, isAdmin: boolean, isSubAdmin: boolean, isMember: boolean, isRequesting: boolean, memberCount: number, admin: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateEventMutationVariables = Exact<{
  createEventInput: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateVoteEventMutationVariables = Exact<{
  createVoteInput: CreateVoteInput;
}>;


export type CreateVoteEventMutation = { __typename?: 'Mutation', voteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UnVoteEventMutationVariables = Exact<{
  voteId: Scalars['ID'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
}>;


export type UnVoteEventMutation = { __typename?: 'Mutation', unVoteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeEventVoteMutationVariables = Exact<{
  voteId: Scalars['ID'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
}>;


export type ChangeEventVoteMutation = { __typename?: 'Mutation', changeEventVote: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeSlotsMutationVariables = Exact<{
  status: Scalars['Int'];
  eventId: Scalars['ID'];
  eventSlot: Scalars['Int'];
  newValue: Scalars['Int'];
}>;


export type ChangeSlotsMutation = { __typename?: 'Mutation', changeSlots: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID'];
  updateEventInput: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ChangeEventStatusMutationVariables = Exact<{
  id: Scalars['ID'];
  status: Scalars['Int'];
}>;


export type ChangeEventStatusMutation = { __typename?: 'Mutation', changeEventStatus: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'EventMutationResponse', code: number, success: boolean, message?: string | null, event?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

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


export type ConversationsQuery = { __typename?: 'Query', getConversations?: { __typename?: 'Conversations', totalCount: number, hasMore: boolean, error: boolean, results: Array<{ __typename?: 'Conversation', id: string, type: string, updatedAt: any, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> }> } | null };

export type GetMessagesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  conversationId: Scalars['ID'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'Messages', totalCount: number, hasMore: boolean, error?: boolean | null, results: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } | null };

export type ConversationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ConversationQuery = { __typename?: 'Query', getConversation?: { __typename?: 'Conversation', id: string, type: string, updatedAt: any, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } | null };

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

export type ClubMembersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  clubId: Scalars['ID'];
  status: Scalars['Int'];
  role?: InputMaybe<Scalars['Int']>;
}>;


export type ClubMembersQuery = { __typename?: 'Query', clubmembers?: { __typename?: 'Clubmembers', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } }> } | null };

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


export type EventQuery = { __typename?: 'Query', getEvent?: { __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } } | null };

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  dateBefore: Scalars['String'];
  dateAfter: Scalars['String'];
  clubId: Scalars['String'];
}>;


export type EventsQuery = { __typename?: 'Query', getEvents?: { __typename?: 'Events', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } }> } | null };

export type MyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEventsQuery = { __typename?: 'Query', myEvents?: { __typename?: 'Events', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'ClubEvent', id: string, title: string, description: string, start: string, end: string, createdAt: any, updatedAt: any, show: boolean, status: number, slot: number, addressLink?: string | null, address?: string | null, color: string, voteCount: number, waitingCount: number, isVoted: boolean, isAdmin: boolean, time?: string | null, maxVote?: number | null, price?: number | null, createdBy: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } }> } | null };

export type GetVotesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  status: Scalars['Int'];
  eventId: Scalars['ID'];
}>;


export type GetVotesQuery = { __typename?: 'Query', getVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } }> } | null };

export type GetVoteStatsQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetVoteStatsQuery = { __typename?: 'Query', getVoteStats?: { __typename?: 'VotCount', confirmed: number, waiting: number, total: number } | null };

export type GetMyVotesQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetMyVotesQuery = { __typename?: 'Query', getMyVotes?: { __typename?: 'Votes', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Vote', id: string, value: number, createdAt: any, status: number, updatedAt: any, member: { __typename?: 'ClubMember', id: string, status: number, role?: number | null, isAdmin: boolean, createdAt: any, updatedAt: any, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, friend: number, about?: string | null, phoneNumber?: string | null, isFollowing: boolean, isFriend: boolean, isFriendRequest: boolean, isFriendSending: boolean, dob?: string | null } } }> } | null };

export type GetVoteCountQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetVoteCountQuery = { __typename?: 'Query', getVoteCount: number };

export type GetWaitingVoteQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWaitingVoteQuery = { __typename?: 'Query', getWaitingVote: number };

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

export type MessageSendSubscriptionSubscriptionVariables = Exact<{
  conversationId: Scalars['ID'];
}>;


export type MessageSendSubscriptionSubscription = { __typename?: 'Subscription', newMessageSent: { __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } } };

export type ConversationChangedSubscriptionVariables = Exact<{
  profileId: Scalars['ID'];
}>;


export type ConversationChangedSubscription = { __typename?: 'Subscription', conversationChanged: { __typename?: 'Conversation', id: string, type: string, updatedAt: any, members: Array<{ __typename?: 'Profile', id: string, displayName?: string | null, avatar?: string | null, email?: string | null, phoneNumber?: string | null, country?: string | null }>, messages: Array<{ __typename?: 'Message', id: string, createdAt: any, content: string, contentType: string, sender: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null } }> } };

export type EventVoteChangedSubscriptionSubscriptionVariables = Exact<{
  eventId: Scalars['ID'];
  status: Scalars['Int'];
}>;


export type EventVoteChangedSubscriptionSubscription = { __typename?: 'Subscription', voteChanged: { __typename?: 'NewVoteSubscriptionData', voteCount?: number | null, waitingCount?: number | null, eventId: string } };

export const MessageInfoFragmentDoc = gql`
    fragment messageInfo on Message {
  id
  createdAt
  content
  contentType
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
  members {
    id
    displayName
    avatar
    email
    phoneNumber
    country
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
export const ClubMemberInfoFragmentDoc = gql`
    fragment clubMemberInfo on ClubMember {
  id
  profile {
    ...profileInfo
  }
  status
  role
  isAdmin
  createdAt
  updatedAt
}
    ${ProfileInfoFragmentDoc}`;
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
}
    ${ClubMemberInfoFragmentDoc}`;
export const UserMutationStatusesFragmentDoc = gql`
    fragment userMutationStatuses on UserMutationResponse {
  code
  success
  message
}
    `;
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
export const ClubMembersDocument = gql`
    query ClubMembers($limit: Int, $offset: Int, $clubId: ID!, $status: Int!, $role: Int) {
  clubmembers(
    limit: $limit
    offset: $offset
    clubId: $clubId
    status: $status
    role: $role
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