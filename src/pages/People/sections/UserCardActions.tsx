import { Button, MenuItem, Stack } from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import {
  useAddFriendMutation,
  useDeleteFriendShipMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "generated/graphql";
import { FC, useState } from "react";
import { IProfile } from "types/user";
interface UserCardActionsProps {
  profile: IProfile;
}
const UserCardActions: FC<UserCardActionsProps> = ({ profile }) => {
  const [isFollowed, setIsFollowed] = useState(profile.isFollowing);
  const [isFriend, setIsFriend] = useState(profile.isFriend);
  const [isFriendRequest, setIsFriendRequest] = useState(
    profile.isFriendRequest
  );
  const [isFriendSending, setIsFriendSending] = useState(
    profile.isFriendSending
  );
  const [onFollow] = useFollowUserMutation();
  const [onUnFollow] = useUnFollowUserMutation();
  const [onAddFriend] = useAddFriendMutation();
  const [onDeleteFriendShip] = useDeleteFriendShipMutation();

  const renderFriendButton = () => {
    const { id } = profile;
    if (isFriend) {
      return (
        <DropdownMenu
          actions={
            <>
              <MenuItem
                onClick={async () => {
                  try {
                    const res = await onDeleteFriendShip({
                      variables: {
                        profileId: id,
                      },
                    });
                    if (res.data.deleteFriendShip.success) {
                      setIsFriend(false);
                      setIsFriendSending(false);
                      setIsFriendRequest(false);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Unfriend
              </MenuItem>
            </>
          }
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Iconify icon={"eva:checkmark-fill"} />}
          >
            Friends
          </Button>
        </DropdownMenu>
      );
    }
    if (isFriendSending) {
      return (
        <Button
          size="small"
          variant="contained"
          color="error"
          startIcon={<Iconify icon={"mdi:account-cancel-outline"} />}
          onClick={async () => {
            try {
              const res = await onDeleteFriendShip({
                variables: {
                  profileId: profile.id,
                },
              });
              if (res.data.deleteFriendShip.success) {
                setIsFriend(false);
                setIsFriendSending(false);
                setIsFriendRequest(false);
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Decline
        </Button>
      );
    }
    if (isFriendRequest) {
      return (
        <DropdownMenu
          actions={
            <>
              <MenuItem
                onClick={async () => {
                  try {
                    const res = await onAddFriend({
                      variables: {
                        profileId: id,
                      },
                    });
                    if (res.data.addFriend.success) {
                      setIsFriend(true);
                      setIsFriendSending(false);
                      setIsFriendRequest(false);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Accept
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  try {
                    const res = await onDeleteFriendShip({
                      variables: {
                        profileId: profile.id,
                      },
                    });
                    if (res.data.deleteFriendShip.success) {
                      setIsFriend(false);
                      setIsFriendSending(false);
                      setIsFriendRequest(false);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Decline
              </MenuItem>
            </>
          }
        >
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<Iconify icon={"akar-icons:chevron-down"} />}
          >
            Friend request
          </Button>
        </DropdownMenu>
      );
    }

    return (
      <Button
        size="small"
        onClick={async () => {
          try {
            const res = await onAddFriend({
              variables: {
                profileId: id,
              },
            });
            if (res.data.addFriend.success) {
              setIsFriend(false);
              setIsFriendSending(true);
              setIsFriendRequest(false);
            }
          } catch (e) {
            console.log(e);
          }
        }}
        variant="outlined"
        color="inherit"
      >
        Add friend
      </Button>
    );
  };
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={2}>
      <Button
        size="small"
        onClick={async () => {
          setIsFollowed(!isFollowed);
          if (isFollowed) {
            await onUnFollow({
              variables: {
                profileId: profile.id,
              },
            });
          } else {
            await onFollow({
              variables: {
                profileId: profile.id,
              },
            });
          }
        }}
        variant={isFollowed ? "contained" : "outlined"}
        color={isFollowed ? "primary" : "inherit"}
        startIcon={isFollowed && <Iconify icon={"eva:checkmark-fill"} />}
      >
        {isFollowed ? "Followed" : "Follow"}
      </Button>

      {renderFriendButton()}
    </Stack>
  );
};

export default UserCardActions;
