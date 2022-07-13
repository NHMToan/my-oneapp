import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "components/Iconify";
import useLocales from "hooks/useLocales";
import useResponsive from "hooks/useResponsive";
import { fDate } from "utils/formatTime";

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  {
    value: "dayGridMonth",
    label: "club.details.events.btn.month",
    icon: "ic:round-view-module",
  },
  {
    value: "timeGridWeek",
    label: "club.details.events.btn.week",
    icon: "ic:round-view-week",
  },
  {
    value: "timeGridDay",
    label: "club.details.events.btn.day",
    icon: "ic:round-view-day",
  },
  {
    value: "listWeek",
    label: "club.details.events.btn.agenda",
    icon: "ic:round-view-agenda",
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(2.5),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

interface CalendarToolbarProps {
  date?: any;
  onToday?: (val?) => void;
  onNextDate?: (val?) => void;
  onPrevDate?: (val?) => void;
  onChangeView?: (val?) => void;
  view?: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek" | string;
}
export default function CalendarToolbar({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
}: CalendarToolbarProps) {
  const isDesktop = useResponsive("up", "sm");
  const { translate } = useLocales();
  return (
    <RootStyle>
      {isDesktop && (
        <Stack direction="row" spacing={0.5}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={translate(viewOption.label)}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0, border: 0 }}
              >
                <Iconify icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={onPrevDate}>
          <Iconify icon="eva:arrow-ios-back-fill" width={20} height={20} />
        </IconButton>

        <Typography variant="h5">{fDate(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon="eva:arrow-ios-forward-fill" width={20} height={20} />
        </IconButton>
      </Stack>

      {isDesktop && (
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={onToday}
        >
          {translate("club.details.events.btn.today")}
        </Button>
      )}
    </RootStyle>
  );
}
