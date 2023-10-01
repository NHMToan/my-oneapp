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
  if (data?.myEventsCount > 0) {
    return (
      <Button
        to={PATH_DASHBOARD.event}
        component={RouterLink}
        startIcon={<Iconify icon="material-symbols:notification-important" />}
        variant="outlined"
      >
        {translate("activity.event_count", { count: data?.myEventsCount })}
      </Button>
    );
  } else {
    return (
      <RootStyle>
        <Stack
          sx={{
            pl: 5,
            py: { xs: 3, md: 2 },
            pr: { xs: 3, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
          flexGrow={1}
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography variant="h4">
            {`${translate("activity.no_event_label")} \n ${user?.displayName}!`}
          </Typography>

          {!user.hasClub && (
            <>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  mb: { xs: 1, xl: 2 },
                }}
              >
                {translate("home.no_club_message")}
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.club.root}
              >
                Join now
              </Button>
            </>
          )}
        </Stack>
      </RootStyle>
    );
  }
};

export default Welcome;
