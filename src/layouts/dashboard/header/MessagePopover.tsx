import { Badge, Box, Divider, Typography } from "@mui/material";
import Scrollbar from "components/Scrollbar";
import SvgIconStyle from "components/SvgIconStyle";
import {
  useConversationChangedSubscription,
  useConversationsQuery,
} from "generated/graphql";
import useAuth from "hooks/useAuth";
import { ConversationData } from "pages/Chat/data.t";
import { ChatConversationList } from "pages/Chat/sections";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { IconButtonAnimate } from "../../../components/animate";
import MenuPopover from "../../../components/MenuPopover";
// ----------------------------------------------------------------------

export default function MessagePopover() {
  const { user } = useAuth();
  const [open, setOpen] = useState(null);
  const [conversations, setConversations] = useState<ConversationData[]>([]);

  const { data: conversationChanged } = useConversationChangedSubscription({
    variables: {
      profileId: user.profile.id,
    },
  });

  const { data, loading, refetch } = useConversationsQuery({
    fetchPolicy: "no-cache",
    variables: {
      limit: 5,
      offset: 0,
    },
  });

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

  const handleOpen = (event) => {
    refetch();
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const renderList = () => {
    if (!conversations || conversations.length === 0)
      return (
        <>
          <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">
                <Trans i18nKey="chat.title" />
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 2,
              px: 2.5,
            }}
          >
            <SvgIconStyle
              src={`/assets/icons/navbar/ic_chat.svg`}
              sx={{ width: 50, height: 50 }}
            />
          </Box>
        </>
      );
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              <Trans i18nKey="chat.title" />
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Scrollbar sx={{ height: { xs: 340, sm: 420 } }}>
          <ChatConversationList
            loading={loading}
            conversations={conversations}
            isOpenSidebar={true}
          />
        </Scrollbar>
      </>
    );
  };
  const renderBadge = () => {
    let isUnRead = false;
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].isRead === false) {
        isUnRead = true;
        break;
      }
    }

    if (isUnRead) {
      return (
        <Badge color="error" variant="dot">
          <SvgIconStyle
            src={`/assets/icons/navbar/ic_chat.svg`}
            sx={{ width: 20, height: 20 }}
          />
        </Badge>
      );
    } else {
      return (
        <SvgIconStyle
          src={`/assets/icons/navbar/ic_chat.svg`}
          sx={{ width: 20, height: 20 }}
        />
      );
    }
  };
  return (
    <>
      <IconButtonAnimate
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        {renderBadge()}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        {renderList()}
      </MenuPopover>
    </>
  );
}
