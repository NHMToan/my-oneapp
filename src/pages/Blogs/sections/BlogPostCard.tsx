import {
  Avatar,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { paramCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { PostData } from "types/post";
import Iconify from "../../../components/Iconify";
import Image from "../../../components/Image";
import TextIconLabel from "../../../components/TextIconLabel";
import TextMaxLine from "../../../components/TextMaxLine";
import useResponsive from "../../../hooks/useResponsive";
import { fShortenNumber } from "../../../utils/formatNumber";
import { fDate } from "../../../utils/formatTime";

// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

interface BlogPostCardProps {
  index?: number;
  post: PostData;
}
export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const { cover, title, favorite, comment, share, author, createdAt, id } =
    post;

  return (
    <Card>
      <Avatar
        alt={author.displayName}
        src={author.avatar}
        sx={{
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
          position: "absolute",
        }}
      />
      <PostContent
        id={id}
        title={title}
        favorite={favorite}
        comment={comment}
        share={share}
        createdAt={createdAt}
        index={index}
      />
      <OverlayStyle />
      <Image alt="cover" src={cover} sx={{ height: 360 }} />
    </Card>
  );
}

// ----------------------------------------------------------------------
interface PostContentProps {
  comment?: number;
  createdAt?: string;
  index?: number;
  share?: number;
  title?: string;
  favorite?: number;
  id: string;
}
export function PostContent({
  title,
  favorite,
  comment,
  share,
  createdAt,
  index,
  id,
}: PostContentProps) {
  const isDesktop = useResponsive("up", "md");

  const linkTo = PATH_DASHBOARD.blog.view(paramCase(id));

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: "eva:message-circle-fill" },
    { number: favorite, icon: "eva:heart-fill" },
    { number: share, icon: "eva:share-fill" },
  ];

  return (
    <CardContent
      sx={{
        width: 1,
        pt: 0,
        zIndex: 9,
        bottom: 0,
        position: "absolute",
        color: "common.white",
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          opacity: 0.64,
          color: "common.white",
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine
          variant={isDesktop && latestPostLarge ? "h5" : "subtitle2"}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: "text.disabled",
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: "common.white",
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={
              <Iconify
                icon={info.icon}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
            }
            value={fShortenNumber(info.number)}
            sx={{ typography: "caption", ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
