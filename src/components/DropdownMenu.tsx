import { IconButton, SxProps } from "@mui/material";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Iconify from "./Iconify";
import MenuPopover from "./MenuPopover";

interface DropdownMenuProps {
  actions: ReactNode;
  sx?: SxProps;
  children?: ReactNode;
}

export interface DropdownMenuRef {
  open: () => void;
  close: () => void;
}

const DropdownMenu = forwardRef<DropdownMenuRef, DropdownMenuProps>(
  ({ actions, sx, children }: DropdownMenuProps, ref) => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }));

    const handleCloseMenu = () => {
      setOpen(false);
    };

    return (
      <>
        <IconButton ref={anchorRef} onClick={() => setOpen(!open)} sx={sx}>
          {children || (
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          )}
        </IconButton>

        <MenuPopover
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          arrow="right-top"
          sx={{
            mt: -1,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
              "& svg": { mr: 2, width: 20, height: 20 },
            },
          }}
        >
          {actions}
        </MenuPopover>
      </>
    );
  }
);

export default DropdownMenu;
