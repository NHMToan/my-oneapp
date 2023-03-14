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
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFUploadMultiFile,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const NewNoteSchema = Yup.object().shape({
    description: Yup.string().min(10).required("Content is required"),
  });

  const defaultValues: any = useMemo(
    () => ({
      description: currentNote?.description || "",
      isPublic: currentNote?.isPublic || true,
      images: currentNote?.images || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNote]
  );

  const methods = useForm({
    resolver: yupResolver(NewNoteSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, watch } = methods;
  const values = watch();
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
      setIsLoading(true);
      if (currentNote) {
        updateNote({
          variables: {
            id: currentNote.id,
            updateClubNoteInput: values,
          },
        })
          .then((response) => {
            setIsLoading(false);
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
          .catch((e) => {
            setIsLoading(false);
          });
      } else {
        createNote({
          variables: {
            createClubNoteInput: { clubId: club.id, ...values },
          },
        })
          .then((response) => {
            setIsLoading(false);
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
          .catch((e) => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("images", [...files, ...newFiles]);
    },
    [setValue, values.images]
  );
  const handleRemoveFile = (inputFile) => {
    const filtered =
      values.images && values.images?.filter((file) => file !== inputFile);
    setValue("images", filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue("images", []);
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

          <RHFUploadMultiFile
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onDrop={handleDrop}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.log("ON UPLOAD")}
            maxFiles={10}
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
            loading={isLoading}
          >
            {!currentNote ? "Post" : "Update"}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
};

export default ClubNoteForm;
