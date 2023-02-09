import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useCreateClubNoteMutation,
  useUpdateClubNoteMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { ClubData } from "pages/Clubs/data.t";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
} from "../../../../components/hook-form";
interface ClubNoteFormProps {
  club: ClubData;
  currentNote?: any;
  postUpdated: (note?: any) => void;
  postCreated: (note?: any) => void;
  onCancel: any;
}
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const ClubNoteForm: FC<ClubNoteFormProps> = ({
  currentNote,
  postCreated,
  postUpdated,
  club,
  onCancel,
}) => {
  const [createNote] = useCreateClubNoteMutation({ fetchPolicy: "no-cache" });
  const [updateNote] = useUpdateClubNoteMutation({ fetchPolicy: "no-cache" });

  const { enqueueSnackbar } = useSnackbar();
  const NewNoteSchema = Yup.object().shape({
    description: Yup.string().min(10).required("Content is required"),
  });

  const defaultValues: any = useMemo(
    () => ({
      description: currentNote?.description || "",
      isPublic: currentNote?.isPublic || true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNote]
  );

  const methods = useForm({
    resolver: yupResolver(NewNoteSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,

    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentNote) {
      setValue("description", currentNote.description);
      setValue("isPublic", currentNote.isPublic);
    } else {
      reset();
    }
  }, [currentNote]);

  const onSubmit = async (values) => {
    try {
      if (currentNote) {
        updateNote({
          variables: {
            id: currentNote.id,
            updateClubNoteInput: values,
          },
        })
          .then((response) => {
            if (response?.data?.updateClubNote?.success) {
              reset();
              enqueueSnackbar("Updated success!");
              postUpdated(response?.data?.updateClubNote?.note);
            } else {
              throw (
                response?.data?.updateClubNote?.message || "Unexpected error!"
              );
            }
          })
          .catch((e) => {});
      } else {
        createNote({
          variables: {
            createClubNoteInput: { clubId: club.id, ...values },
          },
        })
          .then((response) => {
            if (response?.data?.createClubNote?.success) {
              reset();
              enqueueSnackbar("Create success!");
              postCreated(response?.data?.createClubNote?.note);
            } else {
              throw (
                response?.data?.createClubNote?.message || "Unexpected error!"
              );
            }
          })
          .catch((e) => {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <div>
            <LabelStyle>Note</LabelStyle>
            <RHFEditor simple name="description" />
          </div>
          <RHFSwitch
            name="isPublic"
            label="Is public?"
            labelPlacement="start"
            sx={{
              mb: 1,
              mx: 0,
              width: 1,
              justifyContent: "space-between",
            }}
          />
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          {currentNote && (
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={() => {
                onCancel();
                reset();
              }}
            >
              Cancel
            </Button>
          )}
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            {!currentNote ? "Post" : "Update"}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
};

export default ClubNoteForm;
