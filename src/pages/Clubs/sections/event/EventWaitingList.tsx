import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Stack,
  SxProps,
  Typography,
  capitalize,
} from "@mui/material";
import Avatar from "components/Avatar";
import Iconify from "components/Iconify";
import LabelContainer from "components/LabelContainer";
import PopConfirm from "components/PopConfirm";
import { SimpleSkeleton } from "components/skeleton";
import { useGetVotesQuery, useUnVoteEventMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { BOWLING_VOTE_TYPE } from "pages/Clubs/consts";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC, useState } from "react";
import { fSDateTime } from "utils/formatTime";
import ChangeVoteModal from "./ChangeVoteModal";

interface EventWaitingListProps {
  event: ClubEvent;
  refetchStats: () => void;
  sx?: SxProps;
}

function applySortFilter({ tableData }) {
  return tableData;
}
const EventWaitingList: FC<EventWaitingListProps> = ({
  event,
  refetchStats,
  sx,
}) => {
  const { data, loading, refetch } = useGetVotesQuery({
    fetchPolicy: "no-cache",
    skip: !event,
    variables: { status: 2, limit: 100, offset: 0, eventId: event.id },
  });
  const { translate } = useLocales();

  const dataFiltered = applySortFilter({
    tableData: data?.getVotes?.results || [],
  });

  const renderList = () => {
    if (loading)
      return (
        <Stack spacing={3} sx={{ p: 3 }}>
          <SimpleSkeleton />
        </Stack>
      );

    if (!data || !data.getVotes || data?.getVotes?.totalCount === 0)
      return (
        <Typography sx={{ p: 3, color: "text.secondary" }}>
          {translate("club.event.details.tab_vote_info.waiting_list.no_data")}
        </Typography>
      );
    if (event?.type === "2_activity") {
      return (
        <Stack spacing={3} sx={{ p: 3, ...sx }}>
          {BOWLING_VOTE_TYPE.map((type) => {
            return (
              <LabelContainer
                key={type.id}
                label={capitalize(type.id)}
                borderColor={type.color}
              >
                <Stack spacing={3} sx={{ p: 1 }}>
                  {dataFiltered
                    .filter((item) => item.type === type.id)
                    .map((vote, index) => (
                      <Voter
                        key={vote.id}
                        vote={vote as any}
                        index={index}
                        isAdmin={event.isAdmin}
                        postActions={() => {
                          refetch();
                          if (refetchStats) refetchStats();
                        }}
                        event={event}
                      />
                    ))}
                </Stack>
              </LabelContainer>
            );
          })}
        </Stack>
      );
    }
    return (
      <Stack spacing={3} sx={{ p: 3, ...sx }}>
        {data?.getVotes?.results.map((vote, index) => (
          <Voter
            key={vote.id}
            vote={vote as any}
            index={index}
            isAdmin={event.isAdmin}
            postActions={() => {
              refetch();
            }}
            event={event}
          />
        ))}
      </Stack>
    );
  };
  return (
    <Card>
      <CardHeader
        title={translate("club.event.details.tab_vote_info.waiting_list.title")}
        action={
          <IconButton onClick={() => refetch()}>
            <Iconify icon={"ci:refresh-02"} width={20} height={20} />
          </IconButton>
        }
      />

      {renderList()}
    </Card>
  );
};

interface VoterProps {
  index: any;
  vote: VoteData;
  isAdmin: boolean;
  event: ClubEvent;
  postActions: () => void;
}

function Voter({ vote, index, isAdmin, postActions, event }: VoterProps) {
  const [onDeleteVote] = useUnVoteEventMutation({ fetchPolicy: "no-cache" });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { user } = useAuth();
  const [isFormChangeOpen, setIsFormChangeOpen] = useState<boolean>(false);
  const current = new Date();

  const isEventClose = event.end < current.toISOString() || event.status === 2;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        alt={vote.member.profile.displayName}
        src={vote.member.profile.avatar}
        clickable
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">
          {vote.member.profile.displayName} ({vote.value})
        </Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Iconify
            icon={"ant-design:calendar-filled"}
            sx={{ width: 16, height: 16, mr: 0.5 }}
          />
          {fSDateTime(vote.createdAt)}
        </Typography>
      </Box>
      {!isEventClose &&
        !isAdmin &&
        vote.member.profile.id === user.profile.id && (
          <>
            <Button
              variant="contained"
              color="info"
              onClick={() => {
                setIsFormChangeOpen(true);
              }}
            >
              {translate("common.btn.change")}
            </Button>
            <ChangeVoteModal
              isOpen={isFormChangeOpen}
              onClose={() => {
                setIsFormChangeOpen(false);
              }}
              voteInfo={vote}
              postActions={() => {
                postActions();
              }}
              event={event}
            />
          </>
        )}
      {isAdmin && (
        <PopConfirm
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title={
            <CardHeader
              title={translate(
                "club.event.details.tab_vote_info.waiting_list.delete.confirmation"
              )}
            />
          }
          actions={
            <>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpenDelete(false)}
              >
                {translate("common.btn.cancel")}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  try {
                    const deleteVoteRes = await onDeleteVote({
                      variables: {
                        voteId: vote.id,
                        eventId: event.id,
                        eventSlot: event.slot,
                        isSelf: false,
                      },
                    });
                    if (deleteVoteRes?.data?.unVoteEvent?.success) {
                      enqueueSnackbar(
                        translate(
                          "club.event.details.tab_vote_info.waiting_list.delete.success"
                        )
                      );
                      postActions();
                    } else {
                      enqueueSnackbar(
                        deleteVoteRes?.data?.unVoteEvent?.message,
                        { variant: "error" }
                      );
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                {translate("common.btn.delete")}
              </Button>
            </>
          }
        >
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setOpenDelete(true);
            }}
          >
            {translate("common.btn.delete")}
          </Button>
        </PopConfirm>
      )}
    </Stack>
  );
}

export default EventWaitingList;
