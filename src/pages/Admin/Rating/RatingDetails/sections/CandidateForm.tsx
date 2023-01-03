import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogActions, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFile,
} from "components/hook-form";
import {
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { RatingData } from "../../data.t";
interface CandidateFormProps {
  candidate?: any;
  rating: RatingData;
  onCancel: () => void;
  onPostSave: () => void;
}

const getInitialValues = (candidate) => {
  const _candidate = {
    name: candidate?.name || "",
    bio: candidate?.bio || "",
    photo1: candidate?.photo1 || "",
  };

  return _candidate;
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const CandidateForm: FC<CandidateFormProps> = ({
  candidate,
  onCancel,
  onPostSave,
  rating,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [createCandidate] = useCreateCandidateMutation({
    fetchPolicy: "no-cache",
  });
  const [updateCandidate] = useUpdateCandidateMutation({
    fetchPolicy: "no-cache",
  });

  const { enqueueSnackbar } = useSnackbar();

  const { translate } = useLocales();
  const EventSchema = Yup.object().shape({
    name: Yup.string().max(255).required("Title is required"),
    bio: Yup.string().required("Description is required"),
    photo1: Yup.mixed().required("Photo is required"),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(candidate),
  });
  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (data) => {
    try {
      if (candidate) {
        if (typeof data.photo1 === "string") {
          delete data.photo1;
        }

        updateCandidate({
          variables: {
            id: candidate.id,
            updateCandidateInput: data,
          },
        })
          .then((response) => {
            setLoading(false);
            if (response?.data?.updateCandidate?.success) {
              reset();
              onPostSave();
              enqueueSnackbar("Updated success!");
            } else {
              throw (
                response?.data?.updateCandidate?.message || "Unexpected error!"
              );
            }
          })
          .catch((e) => {
            setLoading(false);
          });
      } else {
        createCandidate({
          variables: {
            ratingId: rating.id,
            createCandidateInput: data,
          },
        })
          .then((response) => {
            if (response?.data?.createCandidate?.success) {
              reset();

              enqueueSnackbar("Create success!");
              onPostSave();
            } else {
              throw (
                response?.data?.createCandidate?.message || "Unexpected error!"
              );
            }
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "photo1",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="name" label="Name" />
        <div>
          <LabelStyle>Description</LabelStyle>
          <RHFEditor simple name="bio" />
        </div>
        <div>
          <LabelStyle>Images</LabelStyle>

          <RHFUploadSingleFile
            name="photo1"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
        </div>
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          {translate("common.btn.cancel")}
        </Button>

        <LoadingButton type="submit" variant="contained" loading={loading}>
          {candidate
            ? translate("common.btn.save_changes")
            : translate("common.btn.add")}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
};

export default CandidateForm;
