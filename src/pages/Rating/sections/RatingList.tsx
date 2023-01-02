import { Container, Stack } from "@mui/material";
import { FC } from "react";

interface RatingListProps {}
const RatingList: FC<RatingListProps> = (props) => {
  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Stack direction="column" justifyContent="center" spacing={4}></Stack>
    </Container>
  );
};

export default RatingList;
