// @mui
import { Link, LinkProps, Typography } from "@mui/material";
import { forwardRef, ReactNode } from "react";
// utils
import GetFontValue from "../utils/getFontValue";

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
    const { lineHeight } = GetFontValue(variant);

    const style = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: line,
      WebkitBoxOrient: "vertical",
      ...(persistent && {
        height: lineHeight * line,
      }),
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
