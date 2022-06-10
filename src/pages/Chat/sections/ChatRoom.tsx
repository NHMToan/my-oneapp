import { Box, Divider, Drawer, IconButton } from "@mui/material";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { ReactNode, useEffect, useState } from "react";
// components
import Iconify from "../../../components/Iconify";
// hooks
import useResponsive from "../../../hooks/useResponsive";
import { ConversationData } from "../data.t";
//
import ChatRoomAttachment from "./ChatRoomAttachment";
import ChatRoomGroupParticipant from "./ChatRoomGroupParticipant";
import ChatRoomOneParticipant from "./ChatRoomOneParticipant";

// ----------------------------------------------------------------------
interface ToggleButtonStyleProps {
  children: ReactNode;
  theme?: any;
  onClick?: any;
}
const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))<ToggleButtonStyleProps>(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  top: theme.spacing(1),
  boxShadow: theme.customShadows.z8,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create("all"),
  "&:hover": {
    backgroundColor: theme.palette.background.neutral,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 240;

interface ChatRoomProps {
  conversation: ConversationData;
}
export default function ChatRoom({ conversation }: ChatRoomProps) {
  const theme = useTheme();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [showInfo, setShowInfo] = useState(true);

  const [selectUser, setSelectUser] = useState(null);

  const [showAttachment, setShowAttachment] = useState(true);

  const [showParticipants, setShowParticipants] = useState(true);

  const isDesktop = useResponsive("up", "lg");

  const isGroup = conversation?.type === "group";

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };
  if (!conversation) return null;

  const { members } = conversation;

  const renderContent = (
    <>
      {isGroup ? (
        <ChatRoomGroupParticipant
          selectUserId={selectUser}
          participants={members}
          isCollapse={showParticipants}
          onShowPopupUserInfo={(participantId) => setSelectUser(participantId)}
          onCollapse={() => setShowParticipants((prev) => !prev)}
        />
      ) : (
        <div>
          <ChatRoomOneParticipant
            participants={members}
            isCollapse={showInfo}
            onCollapse={() => setShowInfo((prev) => !prev)}
          />
        </div>
      )}
      <Divider />

      <ChatRoomAttachment
        conversation={conversation}
        isCollapse={showAttachment}
        onCollapse={() => setShowAttachment((prev) => !prev)}
      />
    </>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <ToggleButtonStyle
        onClick={handleToggleSidebar}
        sx={{
          ...(openSidebar && isDesktop && { right: SIDEBAR_WIDTH }),
        }}
      >
        <Iconify
          width={16}
          height={16}
          icon={
            openSidebar
              ? "eva:arrow-ios-forward-fill"
              : "eva:arrow-ios-back-fill"
          }
        />
      </ToggleButtonStyle>

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          anchor="right"
          variant="persistent"
          sx={{
            height: 1,
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create("width"),
            ...(!openSidebar && { width: "0px" }),
            "& .MuiDrawer-paper": {
              position: "static",
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
