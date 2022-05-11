// @mui
import { FormControlLabel, FormControlLabelProps, Switch } from '@mui/material';
// form
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface RHFSwitchProps extends FormControlLabelProps{
  name?:string;
}
export default function RHFSwitch({ name, ...other }:RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller name={name} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
      }
      {...other}
    />
  );
}
