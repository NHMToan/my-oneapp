import { Box, Drawer, IconButton, Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  useConversationChangedSubscription,
  useConversationsQuery,
} from "generated/graphql";
import useAuth from "hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";
import useResponsive from "../../../hooks/useResponsive";
import { ConversationData } from "../data.t";
//
import ChatAccount from "./ChatAccount";
import ChatContactSearch from "./ChatContactSearch";
import ChatConversationList from "./ChatConversationList";
import ChatSearchResults from "./ChatSearchResults";

// ----------------------------------------------------------------------
interface ToggleButtonStyleProps {
  children: ReactNode;
  theme?: any;
  onClick?: any;
}
const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))<ToggleButtonStyleProps>(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.customShadows.primary,
  "&:hover": {
    backgroundColor: theme.palette.primary.darker,
  },
}));

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  const { data: conversationChanged } = useConversationChangedSubscription({
    variables: {
      profileId: user.profile.id,
    },
  });

  const { data, loading, error } = useConversationsQuery({
    fetchPolicy: "no-cache",
  });
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [openSidebar, setOpenSidebar] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [isSearchFocused, setSearchFocused] = useState(false);

  const isDesktop = useResponsive("up", "md");

  const displayResults = searchQuery && isSearchFocused;

  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop, pathname]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!openSidebar) {
      return setSearchFocused(false);
    }
  }, [openSidebar]);

  useEffect(() => {
    if (conversationChanged?.conversationChanged) {
      setConversations(
        [
          conversationChanged.conversationChanged as any,
          ...conversations,
        ].filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
      );
    }
    // eslint-disable-next-line consistent-return
  }, [conversationChanged]);

  useEffect(() => {
    if (data?.getConversations?.results?.length > 0) {
      setConversations(data.getConversations.results as any);
    } else {
      setConversations([]);
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery("");
  };

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchSelect = (uuid) => {
    setSearchFocused(false);
    setSearchQuery("");
    navigate(PATH_DASHBOARD.chat.view(uuid));
  };

  const handleSelectContact = (result) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.uuid);
    }
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          {!isCollapse && (
            <>
              <ChatAccount />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={handleToggleSidebar}>
            <Iconify
              width={20}
              height={20}
              icon={
                openSidebar
                  ? "eva:arrow-ios-back-fill"
                  : "eva:arrow-ios-forward-fill"
              }
            />
          </IconButton>

          {!isCollapse && (
            <IconButton onClick={() => navigate(PATH_DASHBOARD.chat.new)}>
              <Iconify icon={"eva:edit-fill"} width={20} height={20} />
            </IconButton>
          )}
        </Stack>

        {!isCollapse && (
          <ChatContactSearch
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar>
        {!displayResults ? (
          <ChatConversationList
            loading={loading}
            conversations={conversations}
            isOpenSidebar={openSidebar}
            sx={{ ...(isSearchFocused && { display: "none" }) }}
          />
        ) : (
          <ChatSearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
          <Iconify width={16} height={16} icon={"eva:people-fill"} />
        </ToggleButtonStyle>
      )}

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant="persistent"
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create("width"),
            "& .MuiDrawer-paper": {
              position: "static",
              width: SIDEBAR_WIDTH,
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              "& .MuiDrawer-paper": {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: "static",
                transform: "none !important",
                visibility: "visible !important",
              },
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}
