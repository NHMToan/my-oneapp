// @mui
import { TextField } from "@mui/material";
// form
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
// ----------------------------------------------------------------------

interface RHFDatepickerProps {
  name?: string;
  label?: string;
}
export default function RHFDatePicker({
  name,
  label,
  ...other
}: RHFDatepickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={field.value}
          onChange={(newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
          inputFormat="dd/MM/yyyy"
          views={["year", "month", "day"]}
          {...other}
        />
      )}
    />
  );
}
