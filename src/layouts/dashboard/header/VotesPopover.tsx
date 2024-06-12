import { m } from "framer-motion";
import { useState } from "react";

import { CardHeader, List, Typography, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import { varHover } from "components/animate";
import { useMyConfirmedEventsQuery } from "generated/graphql";
import { useBoolean } from "hooks/use-boolean";
import { useResponsive } from "hooks/use-responsive";
import useLocales from "hooks/useLocales";
import { EventDetailsModal } from "pages/Clubs/sections/event";
import { bgGradient } from "theme/css";
import { fDateTime } from "utils/formatTime";
// ----------------------------------------------------------------------
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
export default function VotesPopover() {
  const drawer = useBoolean();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const { data: myConfirmedEvents, refetch } = useMyConfirmedEventsQuery({
    fetchPolicy: "no-cache",
  });
  const { translate } = useLocales();
  const [event, setEvent] = useState(null);
  const smUp = useResponsive("up", "sm");
  const theme = useTheme();
  const data =
    myConfirmedEvents?.myEvents?.totalCount > 0
      ? myConfirmedEvents?.myEvents?.results?.filter(
          (item) => item.myConfirmedCount > 0
        )
      : [];
  const total = data?.length || 0;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {translate("activity.my_confirmed_event.title")}
      </Typography>

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );
  const renderGeneral = (event) => {
    const { address, time, myConfirmedCount } = event;
    return (
      <div>
        <Stack spacing={1} sx={{ px: 3, pb: 3 }}>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-how-to-vote"} />
            <Typography variant="body2">
              <b>{myConfirmedCount}</b>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              <b> {fDateTime(time)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              <b> {address}</b>
            </Typography>
          </Stack>
        </Stack>
      </div>
    );
  };

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {data?.map((item) => (
          <Stack
            sx={{
              flexGrow: 1,
              ...bgGradient({
                direction: "135deg",
                startColor: alpha(theme.palette["primary"].light, 0.2),
                endColor: alpha(theme.palette["primary"].main, 0.2),
              }),
              borderRadius: 2,
              color: `${"primary"}.darker`,
              backgroundColor: "common.white",
              margin: 2,
            }}
          >
            <CardHeader
              title={item.title}
              action={
                <IconButton
                  onClick={() => {
                    setEvent(item);
                    setIsDetailsOpen(true);
                  }}
                >
                  <Iconify
                    icon={"akar-icons:info-fill"}
                    width={20}
                    height={20}
                  />
                </IconButton>
              }
              sx={{
                mb: 2,
              }}
            />

            {renderGeneral(item)}
          </Stack>
        ))}
      </List>
    </Scrollbar>
  );
  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? "primary" : "default"}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={total} color="error">
          <Iconify icon="mdi:vote-outline" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />
        {renderList}
      </Drawer>
      <EventDetailsModal
        open={isDetailsOpen}
        eventId={event?.id}
        onClose={() => {
          setIsDetailsOpen(false);
        }}
        refetchStats={() => {
          refetch();
        }}
      />
    </>
  );
}
