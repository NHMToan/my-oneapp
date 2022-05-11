import { Avatar as MUIAvatar, AvatarProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";

// ----------------------------------------------------------------------
interface IAvatar extends AvatarProps {}
const Avatar = forwardRef(
  ({ color = "default", children, sx, ...other }: IAvatar, ref: any) => {
    const theme = useTheme();

    if (color === "default") {
      return (
        <MUIAvatar ref={ref} sx={sx} {...other}>
          {children}
        </MUIAvatar>
      );
    }

    return (
      <MUIAvatar
        ref={ref}
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </MUIAvatar>
    );
  }
);

export default Avatar;
