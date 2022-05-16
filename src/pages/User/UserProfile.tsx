import { Box, Card, Container, Tab, Tabs } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { capitalCase } from "change-case";
import LoadingScreen from "components/LoadingScreen";
import { useMyProfileQuery } from "generated/graphql";
import { Profile, ProfileCover } from "sections/user/profile";
import Iconify from "../../components/Iconify";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import useTabs from "../../hooks/useTabs";

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

  const { currentTab, onChangeTab } = useTabs("profile");
  const { loading, data } = useMyProfileQuery({ fetchPolicy: "no-cache" });
  if (loading) return <LoadingScreen />;
  if (!data) return <div>User error</div>;

  const { myProfile } = data;

  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <Profile myProfile={myProfile} />,
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
          <ProfileCover myProfile={myProfile} />

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
