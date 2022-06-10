// hooks
import useAuth from "../hooks/useAuth";
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  const userName = user.displayName || "";
  return (
    <Avatar
      src={user?.avatar}
      alt={user?.displayName || "userAvatar"}
      color={user?.profile?.avatar ? "default" : createAvatar(userName).color}
      {...other}
    >
      {createAvatar(userName).name}
    </Avatar>
  );
}
