import { IconButton } from "@mui/material";
import { ReactNode, useState } from "react";
import Iconify from "./Iconify";
//
import MenuPopover from "./MenuPopover";

// ----------------------------------------------------------------------

interface DropdownMenuProps {
  actions: ReactNode;
}
export default function DropdownMenu({ actions }: DropdownMenuProps) {
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
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
