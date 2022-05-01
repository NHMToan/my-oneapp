import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

// ----------------------------------------------------------------------

interface IconBoxProps extends BoxProps {
  icon: any;
  sx?: any;
}
const IconBox: FC<IconBoxProps> = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};
export default IconBox;
