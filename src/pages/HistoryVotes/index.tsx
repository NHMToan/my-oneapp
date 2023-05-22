import { Container } from "@mui/material";
import Page from "components/Page";
import useSettings from "hooks/useSettings";
import { FC } from "react";
import VotesList from "./VotesList";

interface HistoryVotesProps {}
const HistoryVotes: FC<HistoryVotesProps> = (props) => {
  const { themeStretch } = useSettings();

  return (
    <Page title="History">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <VotesList />
      </Container>
    </Page>
  );
};

export default HistoryVotes;
