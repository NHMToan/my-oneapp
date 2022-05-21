import {
  Avatar,
  AvatarGroup,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
} from "@mui/material";
import { useLikeMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { PostData } from "types/post";
import Iconify from "../../../components/Iconify";
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

interface BlogPostTagsProps {
  post: PostData;
  refreshPost: () => void;
}
export default function BlogPostTags({ post, refreshPost }: BlogPostTagsProps) {
  const { favorite, tags, favoritePerson, id } = post;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [onLikeChange] = useLikeMutation();

  return (
    <Box sx={{ py: 3 }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              disabled={isLoading}
              checked={!!favoritePerson?.find((p) => p.id === user.id)}
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
              onChange={async () => {
                setIsLoading(true);
                const res = await onLikeChange({
                  variables: {
                    postId: id,
                  },
                });

                if (res.data?.like?.success) {
                  refreshPost();
                }

                setIsLoading(false);
              }}
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
