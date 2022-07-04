import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";
import Iconify from "components/Iconify";
import Page from "components/Page";
import SkeletonProfile from "components/skeleton/SkeletonProfile";
import { useClubQuery } from "generated/graphql";
import useResponsive from "hooks/useResponsive";
import useSettings from "hooks/useSettings";
import useTabs from "hooks/useTabs";
import { FC } from "react";
import { useParams } from "react-router-dom";
import ClubEvents from "../ClubEvents";
import { ClubFormContent } from "../sections";
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
  const { currentTab, onChangeTab } = useTabs("general");
  const isDesktop = useResponsive("up", "md");

  const { data, loading, refetch } = useClubQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id,
    },
    skip: !id,
  });

  if (loading) return <SkeletonProfile />;
  if (!data) return <div>User error</div>;

  const { club } = data;
  const { isAdmin, isMember, isSubAdmin } = club;
  const Club_TABS = [
    {
      value: "general",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <ClubGeneral club={club as any} refreshClub={refetch} />,
    },
    {
      hidden: !isMember,
      value: "events",
      icon: <Iconify icon={"bxs:calendar-star"} width={20} height={20} />,
      component: <ClubEvents club={club as any} />,
    },
    {
      hidden: !isMember,
      value: "members",
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
      icon: (
        <Iconify
          icon={"fluent:task-list-square-add-20-filled"}
          width={20}
          height={20}
        />
      ),
      component: <ClubRequests club={club as any} />,
    },
    {
      hidden: !isAdmin,
      value: "settings",
      icon: <Iconify icon={"mdi:archive-cog-outline"} width={20} height={20} />,
      component: <ClubFormContent currentClub={club as any} isEdit />,
    },
  ];

  return (
    <Page title="Club: Details">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card
          sx={{
            mb: 3,
            height: isDesktop ? 350 : 280,
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
              onChange={onChangeTab}
            >
              {Club_TABS.filter((item) => !item.hidden).map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
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
    </Page>
  );
};

export default ClubPage;
