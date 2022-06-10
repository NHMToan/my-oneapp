import { Avatar, Box, Card, CardContent, Link, Stack } from "@mui/material";
import { paramCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import Iconify from "../../../components/Iconify";
import Image from "../../../components/Image";
import SvgIconStyle from "../../../components/SvgIconStyle";
import TextIconLabel from "../../../components/TextIconLabel";
import TextMaxLine from "../../../components/TextMaxLine";
import { fShortenNumber } from "../../../utils/formatNumber";
import { ClubData } from "../data.t";

// ----------------------------------------------------------------------

interface ClubCardProps {
  index?: number;
  club: ClubData;
}
export default function ClubCard({ club, index }: ClubCardProps) {
  const { cover, title, id, admin } = club;

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: "absolute",
            color: "background.paper",
          }}
        />
        <Avatar
          alt={admin.displayName}
          src={admin.avatar}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: "absolute",
          }}
        />
        <Image alt="cover" src={cover} ratio="16/9" />
      </Box>

      <ClubContent id={id} title={title} />
    </Card>
  );
}

// ----------------------------------------------------------------------
interface ClubContentProps {
  id: string;
  title: string;
  index?: any;
}
export function ClubContent({ id, title, index }: ClubContentProps) {
  const linkTo = PATH_DASHBOARD.club.view(paramCase(id));

  const POST_INFO = [{ number: 100, icon: "eva:share-fill" }];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
      }}
    >
      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant="h5" line={2} persistent>
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
