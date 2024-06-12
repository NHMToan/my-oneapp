import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PATH_DASHBOARD } from "Router/paths";
import {
  useCreateRatingMutation,
  useUpdateRatingMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "../../../../../components/hook-form";
interface RatingFormContentProps {
  currentRating?: any;
  isEdit?: boolean;
}

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const RatingFormContent: FC<RatingFormContentProps> = ({
  currentRating,
  isEdit,
}) => {
  const navigate = useNavigate();
  const [createRating] = useCreateRatingMutation({ fetchPolicy: "no-cache" });

  const [updateRating] = useUpdateRatingMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const NewRatingSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
  });
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: any = useMemo(
    () => ({
      name: currentRating?.name || "",
      description: currentRating?.description || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRating]
  );
  const methods = useForm({
    resolver: yupResolver(NewRatingSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      if (isEdit) {
        const newRating: any = {
          name: values.name,
          description: values.description,
          start: values.start,
          end: values.end,
        };

        updateRating({
          variables: {
            id: currentRating.id,
            updateRatingInput: newRating,
          },
        })
          .then((response) => {
            if (response?.data?.updateRating?.success) {
              reset();

              enqueueSnackbar("Updated success!");
              navigate(PATH_DASHBOARD.adminRating.root);
            } else {
              throw (
                response?.data?.updateRating?.message || "Unexpected error!"
              );
            }
            setIsLoading(false);
          })
          .catch((e) => {
            setIsLoading(false);
          });
      } else {
        const newRating: any = {
          name: values.name,
          description: values.description,
          status: 2,
          hidden: true,
        };

        createRating({
          variables: {
            createRatingInput: newRating,
          },
        })
          .then((response) => {
            if (response?.data?.createRating?.success) {
              reset();

              enqueueSnackbar("Create success!");
              navigate(PATH_DASHBOARD.adminRating.root);
            } else {
              throw (
                response?.data?.createRating?.message || "Unexpected error!"
              );
            }
            setIsLoading(false);
          })
          .catch((e) => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Rating name" />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <RHFEditor simple name="description" />
                </div>

                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isLoading}
                >
                  {!isEdit ? "Create" : "Save Changes"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default RatingFormContent;
