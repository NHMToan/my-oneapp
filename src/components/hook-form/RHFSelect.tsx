// @mui
import { StandardTextFieldProps, TextField } from "@mui/material";
import { ReactNode } from "react";
// form
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface RHFSelectProps extends StandardTextFieldProps {
  children?: ReactNode;
  name?: string;
}
export default function RHFSelect({
  name,
  children,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
