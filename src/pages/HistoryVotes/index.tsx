import Page from "components/Page";
import { FC } from "react";
import VotesList from "./VotesList";

interface HistoryVotesProps {}
const HistoryVotes: FC<HistoryVotesProps> = (props) => {
  return (
    <Page title="History">
      <VotesList />
    </Page>
  );
};

export default HistoryVotes;
