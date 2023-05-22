import { Popover, PopoverProps } from "@mui/material";
import { ReactNode } from "react";
import getPosition from "./getPosition";
import { StyledArrow } from "./styles";

interface MenuPopoverProps extends Omit<PopoverProps, "open"> {
  open?: ReactNode;
  children: ReactNode;
  disabledArrow?: boolean;
  arrow?: any;
}

export default function MenuPopover({
  open,
  children,
  arrow = "top-right",
  disabledArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open as any}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: "auto",
          overflow: "inherit",
          ...style,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
            "& svg": { mr: 2, width: 20, height: 20, flexShrink: 0 },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <StyledArrow arrow={arrow as any} />}
      {children}
    </Popover>
  );
}
