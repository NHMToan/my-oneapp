import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "components/Iconify";
import Label from "components/Label";
import SkeletonProfile from "components/skeleton/SkeletonProfile";
import {
  useClubQuery,
  useGetClubRequestingNumberQuery,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useNavigateSearch } from "hooks/useNavigateSearch";
import useResponsive from "hooks/useResponsive";
import useSettings from "hooks/useSettings";
import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getValueFromUrlParams } from "utils/location";
import ClubEvents from "../ClubEvents";
import { ClubFormContent } from "../sections";
import ClubNotes from "../sections/clubNote";
import ClubAdmins from "../sections/clubpage/ClubAdmins";
import ClubCover from "../sections/clubpage/ClubCover";
import ClubGeneral from "../sections/clubpage/ClubGeneral";
import ClubMembers from "../sections/clubpage/ClubMembers";
import ClubRequests from "../sections/clubpage/ClubRequests";
interface ClubPageProps {}

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));
const ClubPage: FC<ClubPageProps> = (props) => {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const location = useLocation();
  const currentTab = getValueFromUrlParams(location.search, "tab") || "general";
  const navigateSearch = useNavigateSearch();
  const { translate } = useLocales();
  const isDesktop = useResponsive("up", "md");

  const { data, loading, refetch } = useClubQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id,
    },
    skip: !id,
  });
  const { data: requestCount, refetch: refetchRequestCount } =
    useGetClubRequestingNumberQuery({
      fetchPolicy: "no-cache",
      variables: { clubId: id },
    });
  if (loading) return <SkeletonProfile />;
  if (!data) return <div>User error</div>;

  const { club } = data;
  const { isAdmin, isMember, isSubAdmin } = club;

  const Club_TABS = [
    {
      value: "general",
      label: translate("club.details.general.menu_label"),
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <ClubGeneral club={club as any} refreshClub={refetch} />,
    },
    {
      hidden: !isMember,
      value: "events",
      label: translate("club.details.events.menu_label"),
      icon: <Iconify icon={"bxs:calendar-star"} width={20} height={20} />,
      component: <ClubEvents club={club as any} />,
    },
    {
      hidden: !isMember,
      value: "members",
      label: translate("club.details.members.menu_label"),
      icon: (
        <Iconify icon={"gridicons:multiple-users"} width={20} height={20} />
      ),
      component: (
        <div>
          <ClubAdmins club={club as any} />
          <ClubMembers club={club as any} />
        </div>
      ),
    },
    {
      hidden: !isSubAdmin && !isAdmin,
      value: "requesting",
      label: translate("club.details.requesting.menu_label"),
      icon: (
        <Iconify
          icon={"fluent:task-list-square-add-20-filled"}
          width={20}
          height={20}
        />
      ),
      component: (
        <ClubRequests
          club={club as any}
          postActions={() => {
            refetchRequestCount();
          }}
        />
      ),
      waning: requestCount?.getClubRequestingNumber && (
        <Label color="error" sx={{ marginLeft: 1 }}>
          {requestCount?.getClubRequestingNumber || 0}
        </Label>
      ),
    },
    {
      hidden: !isAdmin,
      value: "notes",
      label: translate("club.details.settings.notes"),
      icon: (
        <Iconify icon={"mdi:notification-settings"} width={20} height={20} />
      ),
      component: <ClubNotes club={club as any} />,
    },
    {
      hidden: !isAdmin,
      value: "settings",
      label: translate("club.details.settings.menu_label"),
      icon: <Iconify icon={"mdi:archive-cog-outline"} width={20} height={20} />,
      component: <ClubFormContent currentClub={club as any} isEdit />,
    },
  ];

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Card
        sx={{
          mb: 3,
          height: isDesktop ? 450 : 280,
          position: "relative",
        }}
      >
        <ClubCover club={club as any} />

        <TabsWrapperStyle>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={(event, newValue) => {
              navigateSearch(location.pathname, { tab: newValue });
            }}
          >
            {Club_TABS.filter((item) => !item.hidden).map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={
                  <>
                    {tab.label}
                    {tab.waning || null}
                  </>
                }
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {Club_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
};

export default ClubPage;
