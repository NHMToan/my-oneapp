import styled from "@emotion/styled";
import { Button, Card, Stack, Typography } from "@mui/material";
import Iconify from "components/Iconify";
import { useMyEventsCountQuery } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
interface RootStyleProps {
  theme?: any;
}
const RootStyle = styled(Card)<RootStyleProps>(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  color: theme.palette.primary.darker,

  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface WelcomeProps {}
const Welcome: FC<WelcomeProps> = ({}) => {
  const { data } = useMyEventsCountQuery({ fetchPolicy: "no-cache" });
  const { user } = useAuth();
  const { translate } = useLocales();

  return (
    <RootStyle>
      <Stack
        sx={{
          pl: 5,
          py: { xs: 3, md: 2 },
          pr: { xs: 3, md: 0 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h4">
          {`${translate("activity.no_event_label")} \n ${user?.displayName}!`}
        </Typography>

        {data?.myEventsCount > 0 && (
          <Button
            to={PATH_DASHBOARD.event}
            component={RouterLink}
            startIcon={
              <Iconify icon="material-symbols:notification-important" />
            }
            variant="outlined"
          >
            You have {data?.myEventsCount} activities.
          </Button>
        )}
      </Stack>
    </RootStyle>
  );
};

export default Welcome;
