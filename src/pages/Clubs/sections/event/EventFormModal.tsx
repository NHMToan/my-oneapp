import { DialogTitle } from "@mui/material";
import { DialogAnimate } from "components/animate";
import { FC } from "react";
import EventForm from "./EventForm";
interface EventFormModalProps {
  event?: any;
  isOpen: boolean;
  onClose: () => void;
  range?: any;
}
const EventFormModal: FC<EventFormModalProps> = ({
  event,
  range,
  onClose,
  isOpen,
}) => {
  return (
    <DialogAnimate open={isOpen} onClose={onClose}>
      <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>

      <EventForm event={event || {}} range={range} onCancel={onClose} />
    </DialogAnimate>
  );
};

export default EventFormModal;
