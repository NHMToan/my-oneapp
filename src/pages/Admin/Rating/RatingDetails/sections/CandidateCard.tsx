import {
  Box,
  Button,
  CardHeader,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import Image from "components/Image";
import Markdown from "components/Markdown";
import PopConfirm from "components/PopConfirm";
import { useDeleteCandidateMutation } from "generated/graphql";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { RatingCandidateData } from "../../data.t";
import VotedList from "./VotedList";

interface CandidateCardProps {
  data: RatingCandidateData;
  postDeleted: () => void;
  onEdit: () => void;
}
const CandidateCard: FC<CandidateCardProps> = ({
  data,
  postDeleted,
  onEdit,
}) => {
  const { photo1, name, bio, votedCount } = data;
  const [onDeleteCandidate] = useDeleteCandidateMutation({
    fetchPolicy: "no-cache",
  });
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: "background.neutral" }}>
      <Box sx={{ p: 1, position: "relative" }}>
        <Image
          alt="cover"
          src={photo1}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
        />
      </Box>
      <Stack spacing={2.5} sx={{ p: 2, pt: 2.5 }}>
        <Stack direction="column" spacing={1}>
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">
                {name} ({votedCount})
              </Typography>
              <DropdownMenu
                actions={
                  <>
                    <MenuItem
                      onClick={() => {
                        setOpenDetails(true);
                      }}
                    >
                      Voted list
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        onEdit();
                      }}
                    >
                      Edit
                    </MenuItem>
                    <PopConfirm
                      open={openDelete}
                      onClose={() => setOpenDelete(false)}
                      title={
                        <CardHeader
                          title="Are you sure to delete the candidate?"
                          subheader="The data related to the candidate will be deleted also!"
                        />
                      }
                      actions={
                        <>
                          <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => setOpenDelete(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={async () => {
                              try {
                                const deleteRes = await onDeleteCandidate({
                                  variables: {
                                    id: data.id,
                                  },
                                });
                                if (deleteRes?.data?.deleteCandidate?.success) {
                                  enqueueSnackbar("Unvote slot successfully!");
                                  postDeleted();
                                }
                              } catch (e) {
                                console.error(e);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      }
                    >
                      <MenuItem
                        sx={{ color: "error.main" }}
                        onClick={() => {
                          setOpenDelete(true);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </PopConfirm>
                  </>
                }
              >
                <Iconify
                  icon={"eva:more-horizontal-fill"}
                  width={20}
                  height={20}
                />
              </DropdownMenu>
            </Stack>
          </div>
          <div>
            <Markdown children={bio} />
          </div>
        </Stack>
      </Stack>
      <VotedList
        open={openDetails}
        onClose={() => {
          setOpenDetails(false);
        }}
        candidate={data}
      />
    </Paper>
  );
};

export default CandidateCard;
