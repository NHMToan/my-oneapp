import { PostData } from "types/post";
import { IUser } from "types/user";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: Pick<IUser, "displayName" | "avatar" | "id">;
  replyComments: Comment[];
}
export interface IPostData extends PostData {
  comments: Comment[];
}
