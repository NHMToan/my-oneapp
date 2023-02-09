import { Box, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/Iconify";
import Markdown from "components/Markdown";
import useLocales from "hooks/useLocales";
import { fDate } from "utils/formatTime";
interface Props {
  note: any;
}

const ClubNoteCard: React.FC<Props> = ({ note }) => {
  const theme: any = useTheme();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        p: 2,
        boxShadow: 0,
        color: theme.palette["warning"].darker,
        bgcolor: theme.palette["warning"].lighter,
        borderRadius: 3,
      }}
    >
      <CardHeader
        title={`${translate("club.note.info.title")} - ${note.club.title}`}
        subheader={fDate(note?.createdAt)}
        avatar={<Iconify icon="mingcute:notification-fill" />}
        sx={{ p: 2 }}
      />
      <Box sx={{ px: 2 }}>
        <Markdown children={note?.description || ""} />
      </Box>
    </Box>
  );
};

export default ClubNoteCard;
