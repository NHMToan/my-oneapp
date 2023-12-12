import { Autocomplete, TextField } from "@mui/material";
import React from "react"; // Import React
import { Controller, FieldValues, useFormContext } from "react-hook-form"; // Import types from react-hook-form

interface RHFAutocompleteProps {
  name?: string;
  label?: string;
  helperText?: React.ReactNode;
  options?: any;
  multiple?: boolean;
  freeSolo?: boolean;
  ChipProps?: any;
  disabled?: boolean;
}

export default function RHFAutocomplete({
  name,
  label,
  helperText,
  options,
  ...other
}: RHFAutocompleteProps): JSX.Element {
  const { control, setValue } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
