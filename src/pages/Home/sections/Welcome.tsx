import styled from "@emotion/styled";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
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
      <CardContent
        sx={{
          color: "grey.800",
        }}
      >
        <Stack>
          <Typography variant="h4">
            {`${translate("activity.no_event_label")} \n ${user?.displayName}!`}
          </Typography>

          {data?.myEventsCount > 0 && (
            <Button
              to={PATH_DASHBOARD.event}
              component={RouterLink}
              variant="text"
              startIcon={
                <Iconify icon="material-symbols:notification-important" />
              }
            >
              You have {data?.myEventsCount} activities.
            </Button>
          )}
        </Stack>
      </CardContent>
    </RootStyle>
  );
};

export default Welcome;
