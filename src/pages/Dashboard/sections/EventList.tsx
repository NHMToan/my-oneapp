import { Container, Stack } from "@mui/material";
import { useMyEventsQuery } from "generated/graphql";
import { FC } from "react";
import EventCard from "./EventCard";

interface EventListProps {}
const EventList: FC<EventListProps> = (props) => {
  const { data } = useMyEventsQuery({ fetchPolicy: "no-cache" });

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
