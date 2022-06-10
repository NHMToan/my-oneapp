// hooks
import { AvatarProps } from "@mui/material";
import { IProfile } from "types/user";
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------
interface UserAvatarProps extends AvatarProps {
  profile: IProfile;
}
export default function UserAvatar({ profile, ...other }: UserAvatarProps) {
  const userName = profile.displayName || "";
  return (
    <Avatar
      src={profile?.avatar}
      alt={profile?.displayName || "userAvatar"}
      color={profile?.avatar ? "default" : createAvatar(userName).color}
      {...other}
    >
      {createAvatar(userName).name}
    </Avatar>
  );
}
