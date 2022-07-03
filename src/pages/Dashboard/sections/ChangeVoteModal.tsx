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
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useEffect } from "react";
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
  const defaultValues: any = {
    value: currentVoteCount,
  };
  const EventSchema = Yup.object().shape({
    value: Yup.number().required("Slot is required"),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;
  const onCancel = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    setValue("value", currentVoteCount);
  }, [currentVoteCount]);

  const onSubmit = async (data) => {
    try {
      const params: any = {
        value: ~~data.value,
      };
      if (params.value === currentVoteCount) {
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
          ? `Waiting slot is changed to ${params.value}`
          : `Confirmed slot is changed to ${params.value}`;
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

      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const maxVote = event.maxVote || 3;
  const array = new Array(maxVote + 1).fill(0);

  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {isWaiting ? "Change waiting slot" : "Change confirmed slot"}
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFSelect
            name="value"
            label="Slots"
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
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!maxVote}
          >
            Change
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ChangeVoteModal;
