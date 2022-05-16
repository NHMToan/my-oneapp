import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
} from "@mui/material";
import { PostData } from "types/post";
import Iconify from "../../../components/Iconify";
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

interface BlogPostTagsProps {
  post: PostData;
}
export default function BlogPostTags({ post }: BlogPostTagsProps) {
  const { favorite, tags, favoritePerson } = post;

  return (
    <Box sx={{ py: 3 }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite || 0)}
        />
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": { width: 32, height: 32 },
          }}
        >
          {favoritePerson?.map((person) => (
            <Avatar
              key={person.displayName}
              alt={person.displayName}
              src={person.avatar}
            />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}
