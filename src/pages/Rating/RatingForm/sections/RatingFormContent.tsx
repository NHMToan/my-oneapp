import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton, MobileDateTimePicker } from "@mui/lab";
import { Card, Grid, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { isBefore } from "date-fns";
import useLocales from "hooks/useLocales";
import { FC, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "../../../../components/hook-form";
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
  const { translate } = useLocales();

  const defaultValues: any = useMemo(
    () => ({
      key: "",
      name: currentRating?.name || "",
      description: currentRating?.description || "",
      start: currentRating?.start || "",
      end: currentRating?.end || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRating]
  );

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const NewRatingSchema = Yup.object().shape({
    name: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    start: Yup.date().required("Start is required"),
    end: Yup.date().required("End is required"),
  });

  const methods = useForm({
    resolver: yupResolver(NewRatingSchema),
    defaultValues,
  });

  const { handleSubmit, control, watch } = methods;
  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Rating name" />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <RHFEditor simple name="description" />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Controller
                  name="start"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label={translate("rating.form.start_date")}
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />

                <Controller
                  name="end"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label={translate("rating.form.end_date")}
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!isDateError}
                          helperText={
                            isDateError &&
                            "End date must be later than start date"
                          }
                        />
                      )}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Stack direction="column" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
              >
                {!isEdit ? "Create" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};

export default RatingFormContent;
