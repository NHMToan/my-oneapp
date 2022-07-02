import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormProvider, RHFSelect } from "components/hook-form";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
interface VotePopConfirmProps {
  event?: ClubEvent;
  isOpen: boolean;
  onClose: () => void;
  onPostSave: (count: number) => void;
  isWaiting?: boolean;
  currentVoteCount?: number;
}
const VotePopConfirm: FC<VotePopConfirmProps> = ({
  event,
  onClose,
  isOpen,
  onPostSave,
  isWaiting,
  currentVoteCount,
}) => {
  const defaultValues: any = {
    value: 1,
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
  } = methods;
  const onCancel = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const params: any = {
        value: ~~data.value,
      };

      onPostSave(params.value);

      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  const maxVote = currentVoteCount
    ? event.maxVote - currentVoteCount
    : event.maxVote;
  const array = new Array(maxVote).fill(0);

  const renderWarning = () => {
    if (currentVoteCount > 0) {
      return (
        <Stack sx={{ p: 3 }}>
          <Card
            sx={{
              px: 2,
              py: 1,
              boxShadow: 0,
              color: (theme: any) => theme.palette["warning"].darker,
              bgcolor: (theme: any) => theme.palette["warning"].lighter,
              width: "100%",
              borderRadius: 1,
            }}
          >
            You have already used <b>{currentVoteCount}</b>, have{" "}
            <b>
              {event.maxVote - currentVoteCount < 0
                ? 0
                : event.maxVote - currentVoteCount}
            </b>{" "}
            left!
          </Card>
        </Stack>
      );
    }
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {isWaiting ? "Vote for waiting slot" : "Vote for slot"}
      </DialogTitle>
      {renderWarning()}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {maxVote > 0 && (
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFSelect
              name="value"
              label="Slots"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: { md: 160 } }}
            >
              {array.map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </RHFSelect>
          </Stack>
        )}

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
            Vote
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default VotePopConfirm;
