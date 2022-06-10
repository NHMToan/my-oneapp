import { Button, Card, CardHeader, Stack } from "@mui/material";
import Iconify from "components/Iconify";
import { ClubData } from "pages/Clubs/data.t";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";

interface ClubActionsProps {
  club: ClubData;
}
const ClubActions: FC<ClubActionsProps> = ({ club }) => {
  return (
    <Card>
      <CardHeader title="Admin actions" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Button
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          component={RouterLink}
          to={PATH_DASHBOARD.club.eventNew(club.id)}
        >
          Create event
        </Button>
        <Button
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          component={RouterLink}
          to={PATH_DASHBOARD.club.eventNew(club.id)}
        >
          Create notification
        </Button>
      </Stack>
    </Card>
  );
};

export default ClubActions;
