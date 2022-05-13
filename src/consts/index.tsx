import { IUser } from "types/user";

export const userName = (user: IUser) => {
  return user?.profile?.displayName || `${user?.lastName} ${user?.firstName}`;
};
