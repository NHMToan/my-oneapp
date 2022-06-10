import { Box, Card, Container, Tab, Tabs } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";
import SkeletonProfile from "components/skeleton/SkeletonProfile";
import { useGetProfileQuery } from "generated/graphql";
import { Profile, ProfileCover } from "pages/User/sections/profile";
import { useParams } from "react-router-dom";
import Iconify from "../../components/Iconify";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import useTabs from "../../hooks/useTabs";
import ProfileFollowers from "./sections/profile/ProfileFollowers";
import ProfileFriends from "./sections/profile/ProfileFriends";

// sections

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { id } = useParams();

  const { currentTab, onChangeTab } = useTabs("profile");
  const { loading, data } = useGetProfileQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id,
    },
    skip: !id,
  });
  if (loading) return <SkeletonProfile />;
  if (!data) return <div>User error</div>;

  const { getProfile: profile } = data;

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile profile={profile as any} />,
    },
    {
      value: "followers",
      icon: <Iconify icon={"eva:heart-fill"} width={20} height={20} />,
      component: <ProfileFollowers profile={profile as any} />,
    },
    {
      value: "friends",
      icon: <Iconify icon={"eva:people-fill"} width={20} height={20} />,
      component: <ProfileFriends profile={profile as any} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover myProfile={profile as any} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
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

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
