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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserMutationResponse;
  commentPost: CommentMutationResponse;
  createPost: PostMutationResponse;
  deleteComment: CommentMutationResponse;
  deletePost: PostMutationResponse;
  forgotPassword: UserMutationResponse;
  like: MutationResponse;
  login: UserMutationResponse;
  logout: UserMutationResponse;
  register: UserMutationResponse;
  replyComment: CommentMutationResponse;
  updatePost: PostMutationResponse;
  updateProfile: ProfileMutationResponse;
  updateUser: UserMutationResponse;
};


export type MutationChangePasswordArgs = {
  code: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCommentPostArgs = {
  commentInput: CommentInput;
};


export type MutationCreatePostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
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


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  updatePostInput: UpdatePostInput;
};


export type MutationUpdateProfileArgs = {
  avatarFile: Scalars['Upload'];
  updateProfileInput: UpdateProfileInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  allowComments: Scalars['Boolean'];
  author: User;
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
  country?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebookLink?: Maybe<Scalars['String']>;
  follower: Scalars['Float'];
  following: Scalars['Float'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instagramLink?: Maybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Comments>;
  getProfile?: Maybe<Profile>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  myProfile?: Maybe<Profile>;
  post?: Maybe<Post>;
  posts?: Maybe<Posts>;
  users: Array<User>;
};


export type QueryCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
};


export type QueryGetProfileArgs = {
  uuid: Scalars['ID'];
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
  category?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
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
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  lastName: Scalars['String'];
  profile: Profile;
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

export type CommentInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null };

export type CommentMutationResponseFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CommentWithUserInfoFragment = { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type FieldErrorFragment = { __typename?: 'FieldError', field: string, message: string };

type MutationStatuses_CommentMutationResponse_Fragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_MutationResponse_Fragment = { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_PostMutationResponse_Fragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_ProfileMutationResponse_Fragment = { __typename?: 'ProfileMutationResponse', code: number, success: boolean, message?: string | null };

type MutationStatuses_UserMutationResponse_Fragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type MutationStatusesFragment = MutationStatuses_CommentMutationResponse_Fragment | MutationStatuses_MutationResponse_Fragment | MutationStatuses_PostMutationResponse_Fragment | MutationStatuses_ProfileMutationResponse_Fragment | MutationStatuses_UserMutationResponse_Fragment;

export type UserMutationStatusesFragment = { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null };

export type PostMutationStatusesFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null };

export type CommentMutationStatusesFragment = { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null };

export type PostMutationResponseFragment = { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type PostWithUserInfoFragment = { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } };

export type ProfileInfoFragment = { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null };

export type UserInfoFragment = { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } };

export type ChangePasswordMutationVariables = Exact<{
  code: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type CommentPostMutationVariables = Exact<{
  commentInput: CommentInput;
}>;


export type CommentPostMutation = { __typename?: 'Mutation', commentPost: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreatePostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null } };

export type ForgotpasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotpasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } } | null } };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'UserMutationResponse', code: number, success: boolean } };

export type LikeMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'MutationResponse', code: number, success: boolean, message?: string | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } } | null } };

export type ReplyCommentMutationVariables = Exact<{
  replyCommentInput: ReplyCommentInput;
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyComment: { __typename?: 'CommentMutationResponse', code: number, success: boolean, message?: string | null, comment?: { __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  updatePostInput: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostMutationResponse', code: number, success: boolean, message?: string | null, post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
  avatarFile: Scalars['Upload'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'ProfileMutationResponse', code: number, success: boolean, message?: string | null, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } | null } };

export type CommentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ordering?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'Comments', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null }> } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string, isPublic: boolean, role: string, avatar: string, displayName: string, profile: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } } | null };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'Profile', id: string, avatar?: string | null, displayName?: string | null, cover?: string | null, gender?: string | null, country?: string | null, role?: string | null, company?: string | null, position?: string | null, email?: string | null, facebookLink?: string | null, instagramLink?: string | null, linkedinLink?: string | null, twitterLink?: string | null, portfolioLink?: string | null, school?: string | null, follower: number, following: number, about?: string | null, phoneNumber?: string | null } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string }, replyComments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> | null }>, favoritePerson?: Array<{ __typename?: 'User', id: string, avatar: string, displayName: string }> | null, author: { __typename?: 'User', id: string, displayName: string, avatar: string } } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  ordering?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'Posts', totalCount: number, hasMore: boolean, results: Array<{ __typename?: 'Post', id: string, title: string, content: string, cover: string, description?: string | null, tags?: Array<string> | null, metaDescription?: string | null, metaKeywords?: Array<string> | null, metaTitle?: string | null, publish: boolean, allowComments: boolean, createdAt: any, updatedAt: any, favorite: number, author: { __typename?: 'User', id: string, displayName: string, avatar: string } }> } | null };

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
export const FieldErrorFragmentDoc = gql`
    fragment fieldError on FieldError {
  field
  message
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
export const MutationStatusesFragmentDoc = gql`
    fragment mutationStatuses on IMutationResponse {
  code
  success
  message
}
    `;
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
  about
  phoneNumber
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
    ...profileInfo
  }
}
    ${ProfileInfoFragmentDoc}`;
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
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!, $avatarFile: Upload!) {
  updateProfile(updateProfileInput: $updateProfileInput, avatarFile: $avatarFile) {
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
 *      avatarFile: // value for 'avatarFile'
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
    comments {
      ...commentInfo
    }
    ...postWithUserInfo
    favoritePerson {
      id
      avatar
      displayName
    }
  }
}
    ${CommentInfoFragmentDoc}
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