import { Container, Stack } from "@mui/material";
import { SeoIllustration } from "assets";
import { SimpleSkeleton } from "components/skeleton";
import { useMyEventsQuery } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { FC } from "react";
import AppWelcome from "./AppWelcome";
import EventCard from "./EventCard";

interface EventListProps {}
const EventList: FC<EventListProps> = (props) => {
  const { data, loading } = useMyEventsQuery({ fetchPolicy: "no-cache" });
  const { user } = useAuth();
  const { translate } = useLocales();

  if (loading) return <SimpleSkeleton />;
  if (!data || data?.myEvents?.totalCount === 0)
    return (
      <AppWelcome
        title={`${translate("activity.no_event_label")} \n ${
          user?.displayName
        }!`}
        description={translate("activity.no_event_message")}
        img={
          <SeoIllustration
            sx={{
              p: 3,
              width: 360,
              margin: { xs: "auto", md: "inherit" },
            }}
          />
        }
      />
    );
  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Stack direction="column" justifyContent="center" spacing={4}>
        {data?.myEvents?.results?.map((event: any) => {
          return <EventCard event={event} key={event.id} compact />;
        })}
      </Stack>
    </Container>
  );
};

export default EventList;
