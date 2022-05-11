// @mui
import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
// form
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface RHFRadioGroupProps extends RadioGroupProps {
  name?: string;
  options?: any[];
}
export default function RHFRadioGroup({
  name,
  options,
  ...other
}: RHFRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup {...field} row {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
