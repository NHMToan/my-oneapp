import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
// @mui
import { alpha, styled } from "@mui/material/styles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useGetFriendsQuery } from "generated/graphql";
import useAuth from "hooks/useAuth";
import { useRef, useState } from "react";
import { IProfile } from "types/user";
// components
import Iconify from "../../../components/Iconify";
import SearchNotFound from "../../../components/SearchNotFound";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
}));

const AutocompleteStyle = styled("div")(({ theme }: { theme: any }) => ({
  "& .MuiAutocomplete-root": {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    "&.Mui-focused .MuiAutocomplete-inputRoot": {
      boxShadow: theme.customShadows.z8,
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    transition: theme.transitions.create("box-shadow", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "& fieldset": {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
}));

// ----------------------------------------------------------------------

interface ChatHeaderComposeProps {
  onAddRecipients: (profiles: IProfile[]) => void;
}
export default function ChatHeaderCompose({
  onAddRecipients,
}: ChatHeaderComposeProps) {
  const [query, setQuery] = useState(null);
  const { user } = useAuth();
  const typingTimeoutRef = useRef(null);
  const { data, loading } = useGetFriendsQuery({
    variables: {
      profileId: user.profile.id,
      limit: 50,
      offset: 0,
    },
    fetchPolicy: "no-cache",
  });
  const recipients = data?.getFriends?.results;

  const handleAddRecipients = (recipients) => {
    setQuery(null);
    onAddRecipients(recipients);
  };
  const _onSearch = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setQuery(value);
    }, 500);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        To:
      </Typography>

      <AutocompleteStyle>
        <Autocomplete
          loading={loading}
          multiple
          size="small"
          disablePortal
          popupIcon={null}
          noOptionsText={<SearchNotFound searchQuery={query} />}
          onChange={(event, value) => {
            handleAddRecipients(value);
          }}
          onInputChange={(event, value) => {
            _onSearch(value);
          }}
          options={recipients || []}
          getOptionLabel={(recipient: any) => recipient?.displayName}
          renderOption={(props, recipient, { inputValue, selected }) => {
            if (!recipient) return null;
            const { displayName, avatar } = recipient;
            const matches = match(displayName, inputValue);
            const parts = parse(displayName, matches);
            return (
              <Box component="li" sx={{ p: "12px !important" }} {...props}>
                <Box
                  sx={{
                    mr: 1.5,
                    width: 32,
                    height: 32,
                    overflow: "hidden",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  <Avatar alt={displayName} src={avatar} />
                  <Box
                    sx={{
                      top: 0,
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                      transition: (theme) =>
                        theme.transitions.create("opacity", {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter,
                        }),
                      ...(selected && {
                        opacity: 1,
                        color: "primary.main",
                      }),
                    }}
                  >
                    <Iconify icon="eva:checkmark-fill" width={20} height={20} />
                  </Box>
                </Box>

                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    variant="subtitle2"
                    color={part.highlight ? "primary" : "textPrimary"}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Box>
            );
          }}
          renderTags={(recipients, getTagProps) => {
            return recipients?.map((recipient, index) => {
              const { id, displayName, avatar } = recipient;
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={id}
                  size="small"
                  label={displayName}
                  color="info"
                  avatar={<Avatar alt={displayName} src={avatar} />}
                />
              );
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={recipients?.length === 0 ? "Recipients" : ""}
            />
          )}
        />
      </AutocompleteStyle>
    </RootStyle>
  );
}
