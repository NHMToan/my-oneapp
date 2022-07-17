import { Container, Stack } from "@mui/material";
import { SeoIllustration } from "assets";
import { SimpleSkeleton } from "components/skeleton";
import { useMyEventsQuery } from "generated/graphql";
import useAuth from "hooks/useAuth";
import { FC } from "react";
import AppWelcome from "./AppWelcome";
import EventCard from "./EventCard";

interface EventListProps {}
const EventList: FC<EventListProps> = (props) => {
  const { data, loading } = useMyEventsQuery({ fetchPolicy: "no-cache" });
  const { user } = useAuth();

  if (loading) return <SimpleSkeleton />;
  if (!data || data?.myEvents?.totalCount === 0)
    return (
      <AppWelcome
        title={`Welcome! \n ${user?.displayName}`}
        description="There is no event for now!"
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
          return <EventCard event={event} key={event.id} />;
        })}
      </Stack>
    </Container>
  );
};

export default EventList;
