import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FC, ReactNode } from "react";

interface PopConfirmProps {
  title: ReactNode;
  subheader?: ReactNode;
  open: boolean;
  actions: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

const PopConfirm: FC<PopConfirmProps> = ({
  title,
  subheader,
  onClose,
  actions,
  open,
  children,
}) => {
  return (
    <>
      {children}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>
          {title}
          {subheader}
        </DialogTitle>
        <DialogActions> {actions}</DialogActions>
      </Dialog>
    </>
  );
};

PopConfirm.propTypes = {};

export default PopConfirm;
