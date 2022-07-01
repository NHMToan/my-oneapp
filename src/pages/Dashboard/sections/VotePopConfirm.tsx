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
}
const VotePopConfirm: FC<VotePopConfirmProps> = ({
  event,
  onClose,
  isOpen,
  onPostSave,
  isWaiting,
}) => {
  const defaultValues: any = {
    value: 1,
  };
  const EventSchema = Yup.object().shape({
    value: Yup.number()
      .max(3, "Allowed maximum is 3")
      .min(1, "Minimum atleast 1")
      .required("Slot is required"),
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

  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {isWaiting ? "Vote for waiting slot" : "Vote for slot"}
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFSelect
            name="value"
            label="Slots"
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: { md: 160 } }}
          >
            <option key={1} value={1}>
              1
            </option>
            <option key={2} value={2}>
              2
            </option>
            <option key={3} value={3}>
              3
            </option>
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
          >
            Vote
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default VotePopConfirm;
