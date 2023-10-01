import { Dialog, Stack } from "@mui/material";
import { SimpleSkeleton } from "components/skeleton";
import { useEventQuery } from "generated/graphql";
import { FC } from "react";
import BowlingEvent from "./details/BowlingEvent";
import NormalEvent from "./details/NormalEvent";

interface EventDetailsModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onRefreshList?: () => void;
  refetchStats?: any;
}

const EventDetailsModal: FC<EventDetailsModalProps> = ({
  eventId,
  open,
  onClose,
  onRefreshList,
  refetchStats,
}) => {
  const { data, loading, refetch } = useEventQuery({
    variables: { id: eventId },
    fetchPolicy: "no-cache",
    skip: !eventId,
  });

  const renderContent = () => {
    if (loading) return <SimpleSkeleton />;
    if (!data?.getEvent) return null;

    if (data.getEvent.type === "bowling")
      return (
        <BowlingEvent
          onRefreshList={onRefreshList}
          onClose={onClose}
          refetchStats={refetchStats}
          refetch={refetch}
          event={data?.getEvent}
          loading={loading}
        />
      );

    return (
      <NormalEvent
        onRefreshList={onRefreshList}
        onClose={onClose}
        refetchStats={refetchStats}
        refetch={refetch}
        event={data?.getEvent}
        loading={loading}
      />
    );
  };
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <Stack sx={{ p: 2 }}>{renderContent()}</Stack>
    </Dialog>
  );
};

export default EventDetailsModal;
