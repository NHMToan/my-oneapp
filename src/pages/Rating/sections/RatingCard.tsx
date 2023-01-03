import { Container } from "@mui/material";
import useSettings from "hooks/useSettings";
import { RatingData } from "pages/Admin/Rating/data.t";
import { FC } from "react";
import Candidates from "./Candidates";

interface RatingCardProps {
  data: RatingData;
  postVoted: any;
}
const RatingCard: FC<RatingCardProps> = ({ data, postVoted }) => {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Candidates rating={data} postVoted={postVoted} />
    </Container>
  );
};

export default RatingCard;
