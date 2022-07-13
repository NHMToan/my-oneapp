import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import PopConfirm from "components/PopConfirm";
import { SimpleSkeleton } from "components/skeleton";
import { useGetVotesQuery, useUnVoteEventMutation } from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC, useState } from "react";
import { fSDateTime } from "utils/formatTime";

interface EventVoteListProps {
  event: ClubEvent;
}

const EventVoteList: FC<EventVoteListProps> = ({ event }) => {
  const { data, loading, refetch } = useGetVotesQuery({
    fetchPolicy: "no-cache",
    skip: !event,
    variables: { status: 1, limit: 100, offset: 0, eventId: event.id },
  });
  const { translate } = useLocales();
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
          {translate("club.event.details.tab_vote_info.confirm_list.no_data")}
        </Typography>
      );

    return (
      <Stack spacing={3} sx={{ p: 3 }}>
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
        title={translate("club.event.details.tab_vote_info.confirm_list.title")}
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
  isAdmin: any;
  event: ClubEvent;
  postActions: () => void;
}

function Voter({ vote, index, isAdmin, postActions, event }: VoterProps) {
  const [onDeleteVote] = useUnVoteEventMutation({ fetchPolicy: "no-cache" });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        alt={vote.member.profile.displayName}
        src={vote.member.profile.avatar}
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

      {isAdmin && (
        <PopConfirm
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          title={
            <CardHeader
              title={translate(
                "club.event.details.tab_vote_info.confirm_list.delete.confirmation"
              )}
              subheader={translate(
                "club.event.details.tab_vote_info.confirm_list.delete.sub_confirmation"
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
                      },
                    });
                    if (deleteVoteRes?.data?.unVoteEvent?.success) {
                      enqueueSnackbar(
                        translate(
                          "club.event.details.tab_vote_info.confirm_list.delete.success"
                        )
                      );
                      postActions();
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

export default EventVoteList;
