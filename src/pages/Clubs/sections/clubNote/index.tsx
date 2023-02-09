import { Grid } from "@mui/material";
import { useClubNotesQuery } from "generated/graphql";
import { ClubData } from "pages/Clubs/data.t";
import { FC, useState } from "react";
import ClubNoteForm from "./ClubNoteForm";
import ClubNotesList from "./ClubNotesList";

interface ClubNotesProps {
  club: ClubData;
}
const ClubNotes: FC<ClubNotesProps> = ({ club }) => {
  const { data, loading, refetch } = useClubNotesQuery({
    variables: { limit: 1000, offset: 0, clubId: club.id },
    fetchPolicy: "no-cache",
  });
  const [selectedRow, setSelectedRow] = useState<any>(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ClubNotesList
          notes={data?.clubNotes?.results}
          loading={loading}
          refetch={refetch}
          onEdit={(row) => setSelectedRow(row)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ClubNoteForm
          club={club}
          postCreated={(note) => {
            setSelectedRow(null);
            refetch();
          }}
          postUpdated={(note) => {
            setSelectedRow(null);
            refetch();
          }}
          currentNote={selectedRow}
          onCancel={() => setSelectedRow(null)}
        />
      </Grid>
    </Grid>
  );
};

export default ClubNotes;
