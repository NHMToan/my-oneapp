import { Box, Button, DialogTitle, Stack } from "@mui/material";
import Iconify from "components/Iconify";
import Label from "components/Label";
import { DialogAnimate } from "components/animate";
import useLocales from "hooks/useLocales";
import { ClubData } from "pages/Clubs/data.t";
import { FC, useState } from "react";
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
  const [type, setType] = useState<string>(null);

  const onSetType = (type) => {
    setType(type);
  };
  const typeForm = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack
          spacing={3}
          sx={{ p: 3 }}
          direction={{ xs: "column", sm: "row" }}
          useFlexGap
          flexWrap="wrap"
        >
          <Button
            key="normal"
            variant="contained"
            startIcon={<Iconify icon="mdi:badminton" />}
            onClick={() => {
              onSetType("normal");
            }}
          >
            Normal
          </Button>
          <Button
            key="2_activity"
            variant="contained"
            startIcon={<Iconify icon="game-icons:bowling-strike" />}
            onClick={() => {
              onSetType("2_activity");
            }}
          >
            Multiple activities
          </Button>
        </Stack>
      </Box>
    );
  };
  const onModalClose = () => {
    onClose();
    setType(null);
  };
  return (
    <DialogAnimate open={isOpen} onClose={onModalClose} fullWidth maxWidth="md">
      <DialogTitle>
        {event
          ? translate("club.event.form.edit_title")
          : translate("club.event.form.add_title")}{" "}
        {(type || event?.type) && (
          <Label sx={{ textTransform: "capitalize" }} color="success">
            {type || event?.type}
          </Label>
        )}
      </DialogTitle>
      {type || event ? (
        <EventForm
          event={event || null}
          range={range}
          onCancel={onModalClose}
          onPostSave={onPostSave}
          club={club}
          type={type}
        />
      ) : (
        typeForm()
      )}
    </DialogAnimate>
  );
};

export default EventFormModal;
