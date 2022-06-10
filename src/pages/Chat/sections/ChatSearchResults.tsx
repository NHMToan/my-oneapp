// @mui
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { IProfile } from "types/user";
//
import SearchNotFound from "../../../components/SearchNotFound";

// ----------------------------------------------------------------------
interface ChatSearchResultsProps {
  query: string;
  results?: IProfile[];
  onSelectContact: (contact: IProfile) => void;
}

export default function ChatSearchResults({
  query,
  results,
  onSelectContact,
}: ChatSearchResultsProps) {
  const isFound = results.length > 0;

  return (
    <>
      <Typography
        paragraph
        variant="subtitle1"
        sx={{ px: 3, color: "text.secondary" }}
      >
        Contacts
      </Typography>

      <List disablePadding>
        {results.map((result) => (
          <ListItemButton
            key={result.id}
            onClick={() => onSelectContact(result)}
            sx={{
              py: 1.5,
              px: 3,
            }}
          >
            <ListItemAvatar>
              <Avatar alt={result.displayName} src={result.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={result.displayName}
              primaryTypographyProps={{
                noWrap: true,
                variant: "subtitle2",
              }}
            />
          </ListItemButton>
        ))}
      </List>
      {!isFound && (
        <SearchNotFound
          searchQuery={query}
          sx={{
            p: 3,
            mx: "auto",
            width: `calc(100% - 48px)`,
            bgcolor: "background.neutral",
          }}
        />
      )}
    </>
  );
}
