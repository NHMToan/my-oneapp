import { DialogTitle } from "@mui/material";
import { DialogAnimate } from "components/animate";
import { ClubData } from "pages/Clubs/data.t";
import { FC } from "react";
import EventForm from "./EventForm";
interface EventFormModalProps {
  event?: any;
  isOpen: boolean;
  onClose: () => void;
  onPostSave: () => void;
  range?: any;
  club: ClubData;
}
const EventFormModal: FC<EventFormModalProps> = ({
  event,
  range,
  onClose,
  isOpen,
  onPostSave,
  club,
}) => {
  return (
    <DialogAnimate open={isOpen} onClose={onClose}>
      <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>

      <EventForm
        event={event || {}}
        range={range}
        onCancel={onClose}
        onPostSave={onPostSave}
        club={club}
      />
    </DialogAnimate>
  );
};

export default EventFormModal;
