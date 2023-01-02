import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormProvider, RHFSelect } from "components/hook-form";
import { useChangeSlotsMutation } from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
interface ChangeVoteModalProps {
  event?: ClubEvent;
  isOpen: boolean;
  onClose: () => void;
  postActions: () => void;
  isWaiting?: boolean;
  currentVoteCount: number;
}
const ChangeVoteModal: FC<ChangeVoteModalProps> = ({
  event,
  onClose,
  isOpen,
  postActions,
  isWaiting,
  currentVoteCount,
}) => {
  const [onChangeSlot] = useChangeSlotsMutation({ fetchPolicy: "no-cache" });
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const defaultValues: any = {
    value: currentVoteCount,
  };
  const { translate } = useLocales();
  const EventSchema = Yup.object().shape({
    value: Yup.number().required("Slot is required"),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue } = methods;
  const onCancel = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    setValue("value", currentVoteCount);
  }, [currentVoteCount]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const params: any = {
        value: ~~data.value,
      };
      if (params.value === currentVoteCount) {
        setSubmitting(false);
        onClose();
        return;
      }

      const changeRes = await onChangeSlot({
        variables: {
          status: isWaiting ? 2 : 1,
          eventId: event.id,
          eventSlot: event.slot,
          newValue: params.value,
        },
      });
      if (changeRes?.data?.changeSlots?.success) {
        const message = isWaiting
          ? translate("club.event.details.vote.waiting_change_success", {
              count: params.value,
            })
          : translate("club.event.details.vote.confirmed_change_success", {
              count: params.value,
            });
        enqueueSnackbar(message);
        postActions();
      } else {
        enqueueSnackbar(
          changeRes?.data?.changeSlots?.message || "Internal error",
          {
            variant: "error",
          }
        );
      }
      setSubmitting(false);
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  const maxVote = event.maxVote || 3;
  const array = new Array(maxVote + 1).fill(0);

  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {isWaiting
          ? translate("club.event.details.vote.change_waiting_title")
          : translate("club.event.details.vote.change_confirmed_title")}
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFSelect
            name="value"
            label={translate("club.event.details.slot")}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: { md: 160 } }}
          >
            {array.map((item, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </RHFSelect>
        </Stack>

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="outlined" color="inherit" onClick={onCancel}>
            {translate("common.btn.cancel")}
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={submitting}
            disabled={!maxVote}
          >
            {translate("common.btn.change")}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ChangeVoteModal;
