import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Typography,
} from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import useAuth from "hooks/useAuth";
import { IProfile } from "types/user";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: "space-between",
  color: theme.palette.text.disabled,
}));

const RowStyle = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(1.5, 0),
}));

const RowIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginTop: 4,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 160,
  wordWrap: "break-word",
  ...theme.typography.body2,
}));

// ----------------------------------------------------------------------

interface ChatRoomOneParticipantProps {
  participants: IProfile[];
  isCollapse?: boolean;
  onCollapse?: () => void;
}
export default function ChatRoomOneParticipant({
  participants,
  isCollapse,
  onCollapse,
}: ChatRoomOneParticipantProps) {
  const { user } = useAuth();

  const participant = participants.find((item) => item.id !== user.profile.id);

  if (!participant) {
    return null;
  }
  const {
    displayName,
    avatar,
    email,
    phoneNumber,
    position,
    facebookLink,
    linkedinLink,
    twitterLink,
    instagramLink,
    portfolioLink,
  } = participant;
  return (
    <>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar alt={displayName} src={avatar} sx={{ width: 96, height: 96 }} />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="subtitle1">{displayName}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {position}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Iconify
            icon={
              isCollapse
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            width={16}
            height={16}
          />
        }
      >
        information
      </CollapseButtonStyle>

      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          {phoneNumber && (
            <RowStyle>
              <RowIconStyle icon={"eva:phone-fill"} />
              <RowTextStyle>{phoneNumber}</RowTextStyle>
            </RowStyle>
          )}
          {email && (
            <RowStyle>
              <RowIconStyle icon={"eva:email-fill"} />
              <RowTextStyle>{email}</RowTextStyle>
            </RowStyle>
          )}
          {facebookLink && (
            <RowStyle>
              <RowIconStyle icon={"ic:baseline-facebook"} />
              <RowTextStyle>
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {facebookLink}
                </a>
              </RowTextStyle>
            </RowStyle>
          )}
          {linkedinLink && (
            <RowStyle>
              <RowIconStyle icon={"mdi:linkedin"} />
              <RowTextStyle>
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkedinLink}
                </a>
              </RowTextStyle>
            </RowStyle>
          )}
          {twitterLink && (
            <RowStyle>
              <RowIconStyle icon={"mdi:twitter"} />
              <RowTextStyle>
                {" "}
                <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                  {twitterLink}
                </a>
              </RowTextStyle>
            </RowStyle>
          )}
          {instagramLink && (
            <RowStyle>
              <RowIconStyle icon={"ph:instagram-logo-fill"} />
              <RowTextStyle>
                {" "}
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {instagramLink}
                </a>
              </RowTextStyle>
            </RowStyle>
          )}
          {portfolioLink && (
            <RowStyle>
              <RowIconStyle icon={"mdi:user-box"} />
              <RowTextStyle>
                {" "}
                <a
                  href={portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portfolioLink}
                </a>
              </RowTextStyle>
            </RowStyle>
          )}
        </Box>
      </Collapse>
    </>
  );
}
