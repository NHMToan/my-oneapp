import { IProfile } from "types/user";

export interface ConversationData {
  id: string;
  type: "group" | "one";
  unreadCount?: number;
  messages: MessageData[];
  members: IProfile[];
  isRead: boolean;
}
export interface MessageData {
  id: string;
  createdAt: string;
  sender?: IProfile;
  senderId: string;
  contentType: string;
  content: string;
  attachments: string[];
}
