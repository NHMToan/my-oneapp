// @mui
import { Box, Container } from "@mui/material";
import { useProfilesQuery } from "generated/graphql";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import UserCard from "./sections/UserCard";

// ----------------------------------------------------------------------

export default function People() {
  const { themeStretch } = useSettings();
  const { data, loading, error } = useProfilesQuery({
    variables: {
      limit: 50,
      offset: 0,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>...</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <Page title="User: Find friends">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {data?.getProfiles?.results?.map((profile: any) => (
            <UserCard key={profile.id} profile={profile} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
