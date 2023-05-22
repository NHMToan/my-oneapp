// @mui
import { Link, LinkProps, Typography } from "@mui/material";
import { ReactNode, forwardRef } from "react";
// utils

// ----------------------------------------------------------------------

interface TextMaxLineProps extends LinkProps {
  asLink?: boolean;
  children: ReactNode;
  line?: number;
  persistent?: boolean;
  variant?: any;
  sx?: any;
}
const TextMaxLine = forwardRef(
  (
    {
      asLink,
      variant = "body1",
      line = 2,
      persistent = false,
      children,
      sx,
      ...other
    }: TextMaxLineProps,
    ref: any
  ) => {
    const style = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: line,
      WebkitBoxOrient: "vertical",
      ...(persistent && {}),
      ...sx,
    };

    if (asLink) {
      return (
        <Link
          color="inherit"
          ref={ref}
          variant={variant}
          sx={{ ...style }}
          {...other}
        >
          {children}
        </Link>
      );
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    );
  }
);

export default TextMaxLine;
