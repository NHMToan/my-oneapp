import { Stack, StackProps } from "@mui/material";

// ----------------------------------------------------------------------

interface TextIconLabelProps extends StackProps {
  value?: any;
  icon?: any;
  endIcon?: boolean;
}
export default function TextIconLabel({
  icon,
  value,
  endIcon = false,
  sx,
  ...other
}: TextIconLabelProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: "body2",
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
}
