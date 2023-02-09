import { Stack } from "@mui/material";
import { useMyClubNotesQuery } from "generated/graphql";
import ClubNoteCard from "pages/Clubs/sections/clubNote/ClubNoteCard";
import { FC } from "react";

interface MyNotesProps {}
const MyNotes: FC<MyNotesProps> = (props) => {
  const { data } = useMyClubNotesQuery({
    fetchPolicy: "no-cache",
  });
  return (
    <Stack direction="column" justifyContent="center" spacing={4}>
      {data?.myClubNotes?.results?.map((note: any) => {
        return <ClubNoteCard note={note} key={note.id} />;
      })}
    </Stack>
  );
};

export default MyNotes;
