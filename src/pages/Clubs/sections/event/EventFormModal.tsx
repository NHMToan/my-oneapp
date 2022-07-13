import { DialogTitle } from "@mui/material";
import { DialogAnimate } from "components/animate";
import useLocales from "hooks/useLocales";
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
  const { translate } = useLocales();
  return (
    <DialogAnimate open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {event
          ? translate("club.event.form.edit_title")
          : translate("club.event.form.add_title")}
      </DialogTitle>

      <EventForm
        event={event || null}
        range={range}
        onCancel={onClose}
        onPostSave={onPostSave}
        club={club}
      />
    </DialogAnimate>
  );
};

export default EventFormModal;
