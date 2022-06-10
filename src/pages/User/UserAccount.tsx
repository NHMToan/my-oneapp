import { Box, Container, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import Iconify from "components/Iconify";
import { SkeletonCommon } from "components/skeleton";
import { useMyProfileQuery } from "generated/graphql";
import {
  AccountChangePassword,
  AccountGeneral,
  AccountSocialLinks,
} from "pages/User/sections/account";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import useTabs from "../../hooks/useTabs";

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { loading, data } = useMyProfileQuery({ fetchPolicy: "no-cache" });

  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs("general");

  if (loading) return <SkeletonCommon />;
  if (!data) return <div>User error</div>;

  const ACCOUNT_TABS = [
    {
      value: "general",
      icon: <Iconify icon={"ic:round-account-box"} width={20} height={20} />,
      component: <AccountGeneral profile={data?.myProfile as any} />,
    },
    {
      value: "social_links",
      icon: <Iconify icon={"eva:share-fill"} width={20} height={20} />,
      component: <AccountSocialLinks profile={data?.myProfile as any} />,
    },
    {
      value: "change_password",
      icon: <Iconify icon={"ic:round-vpn-key"} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
