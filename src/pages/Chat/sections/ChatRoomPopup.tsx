import { Avatar, DialogContent, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { IProfile } from "types/user";
import { DialogAnimate } from "../../../components/animate";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const RowStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(1.5),
}));

// ----------------------------------------------------------------------

interface ChatRoomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  participant: IProfile;
}
export default function ChatRoomPopup({
  participant,
  isOpen,
  onClose,
}: ChatRoomPopupProps) {
  const { displayName, avatar, position, email, country, phoneNumber } =
    participant;

  return (
    <DialogAnimate fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogContent sx={{ pb: 5, textAlign: "center" }}>
        <Avatar
          alt={displayName}
          src={avatar}
          sx={{
            mt: 5,
            mb: 2,
            mx: "auto",
            width: 96,
            height: 96,
          }}
        />
        <Typography variant="h6">{displayName}</Typography>
        <Typography variant="body2" paragraph sx={{ color: "text.secondary" }}>
          {position}
        </Typography>

        {country && (
          <RowStyle>
            <Iconify
              icon={"eva:pin-fill"}
              sx={{ mr: 1, width: 16, height: 16, color: "text.disabled" }}
            />
            <Typography variant="body2">{country}</Typography>
          </RowStyle>
        )}
        {phoneNumber && (
          <RowStyle>
            <Iconify
              icon={"eva:phone-fill"}
              sx={{ mr: 1, width: 16, height: 16, color: "text.disabled" }}
            />
            <Typography variant="body2">{phoneNumber}</Typography>
          </RowStyle>
        )}
        {email && (
          <RowStyle>
            <Iconify
              icon={"eva:email-fill"}
              sx={{ mr: 1, width: 16, height: 16, color: "text.disabled" }}
            />
            <Typography variant="body2">{email}</Typography>
          </RowStyle>
        )}
      </DialogContent>
    </DialogAnimate>
  );
}
