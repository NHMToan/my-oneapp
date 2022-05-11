// @mui
import { StandardTextFieldProps, TextField } from "@mui/material";
// form
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface RHFTextFieldProps extends StandardTextFieldProps {
  name?: string;
}
export default function RHFTextField({ name, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
