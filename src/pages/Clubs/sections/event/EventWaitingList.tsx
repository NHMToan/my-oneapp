import {
  CardHeader,
  Stack,
  Card,
  Avatar,
  Box,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import _mock from "_mock";
import orderBy from "lodash/orderBy";
import Iconify from "components/Iconify";
import { fDateTime } from "utils/formatTime";
import DropdownMenu from "components/DropdownMenu";

interface EventWaitingListProps {
  event: ClubEvent;
}

export const _appVoter = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  createdAt: _mock.time(index),
  value: _mock.number.number(index),
}));
const EventWaitingList: FC<EventWaitingListProps> = ({ event }) => {
  return (
    <Card>
      <CardHeader title="Waiting List" />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(_appVoter, ["createdAt"], ["desc"]).map((vote, index) => (
          <Voter
            key={vote.id}
            vote={vote}
            index={index}
            isAdmin={event.isAdmin}
          />
        ))}
      </Stack>
    </Card>
  );
};

interface VoterProps {
  index: any;
  vote: any;
  isAdmin: boolean;
}

function Voter({ vote, index, isAdmin }: VoterProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={vote.name} src={vote.avatar} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">
          {vote.name} ({vote.value})
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
          {fDateTime(vote.createdAt)}
        </Typography>
      </Box>
      {isAdmin && (
        <DropdownMenu
          actions={
            <>
              <MenuItem onClick={async () => {}}>
                <Iconify icon={"eva:checkmark-circle-2-fill"} />
                Set to vote
              </MenuItem>

              <Divider sx={{ borderStyle: "dashed" }} />

              <MenuItem sx={{ color: "error.main" }} onClick={async () => {}}>
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
            </>
          }
        />
      )}
    </Stack>
  );
}

export default EventWaitingList;
