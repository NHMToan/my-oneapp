import { IconButton } from "@mui/material";
import { ReactNode } from "react";
import Iconify from "./Iconify";
import MenuPopover from "./MenuPopover";

interface MoreMenuButtonProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  actions: ReactNode;
}
export function MoreMenuButton({
  actions,
  open,
  onOpen,
  onClose,
}: MoreMenuButtonProps) {
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        sx={{ opacity: 0.48 }}
        onClick={onOpen}
      >
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: "auto",
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
