// hooks
import useAuth from "../hooks/useAuth";
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  const userName =
    user.profile?.displayName || `${user?.lastName} ${user?.firstName}`;
  return (
    <Avatar
      src={user?.profile.avatar}
      alt={user?.profile.displayName || "userAvatar"}
      color={user?.profile?.avatar ? "default" : createAvatar(userName).color}
      {...other}
    >
      {createAvatar(userName).name}
    </Avatar>
  );
}
