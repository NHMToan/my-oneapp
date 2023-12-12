import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { FormProvider, RHFSelect } from "components/hook-form";
import {
  useChangeEventVoteMutation,
  useUnVoteEventMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
interface ChangeVoteModalProps {
  event: ClubEvent;
  isOpen: boolean;
  onClose: () => void;
  postActions: () => void;
  voteInfo: VoteData;
}
const ChangeVoteModal: FC<ChangeVoteModalProps> = ({
  event,
  onClose,
  isOpen,
  postActions,
  voteInfo,
}) => {
  const [onDeleteVote] = useUnVoteEventMutation({ fetchPolicy: "no-cache" });

  const [onChangeSlot] = useChangeEventVoteMutation({
    fetchPolicy: "no-cache",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const defaultValues: any = {};
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
    if (voteInfo) setValue("value", voteInfo.value);
  }, [voteInfo]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const params: any = {
        value: ~~data.value,
      };
      if (params.value === voteInfo.value) {
        setSubmitting(false);
        onClose();
        return;
      }

      const changeRes = await onChangeSlot({
        variables: {
          voteId: voteInfo.id,
          eventId: event.id,
          eventSlot: event.slot,
          newValue: params.value,
        },
      });
      if (changeRes?.data?.changeEventVote?.success) {
        const message =
          voteInfo.status === 2
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
          changeRes?.data?.changeEventVote?.message || "Internal error",
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
  const maxVote = voteInfo.value;
  const array = new Array(maxVote).fill(0);
  return (
    <Dialog open={isOpen} onClose={onCancel} maxWidth="xs">
      <DialogTitle>
        {voteInfo?.status === 2
          ? translate("club.event.details.vote.change_waiting_title")
          : translate("club.event.details.vote.change_confirmed_title")}
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {array?.length >= 2 && (
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFSelect
              name="value"
              label={translate("club.event.details.slot")}
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
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
            {array?.length >= 2 && (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onCancel}
                  fullWidth
                >
                  {translate("common.btn.cancel")}
                </Button>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={submitting}
                  disabled={voteInfo?.value === 1}
                  fullWidth
                >
                  {translate("common.btn.change")}
                </LoadingButton>
              </Stack>
            )}
            <LoadingButton
              fullWidth
              variant="contained"
              color="error"
              loading={submitting}
              onClick={async () => {
                try {
                  setSubmitting(true);
                  const deleteVoteRes = await onDeleteVote({
                    variables: {
                      voteId: voteInfo.id,
                      eventId: event.id,
                      eventSlot: event.slot,
                      isSelf: true,
                    },
                  });
                  if (deleteVoteRes?.data?.unVoteEvent?.success) {
                    enqueueSnackbar(
                      translate(
                        "club.event.details.tab_vote_info.waiting_list.delete.success"
                      )
                    );
                    setSubmitting(false);
                    postActions();
                  } else {
                    setSubmitting(false);
                    enqueueSnackbar(deleteVoteRes?.data?.unVoteEvent?.message, {
                      variant: "error",
                    });
                  }
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              {translate("common.btn.delete")}
            </LoadingButton>
          </Stack>

          <Divider />
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default ChangeVoteModal;
