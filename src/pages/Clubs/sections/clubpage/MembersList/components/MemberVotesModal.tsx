import {
  CardHeader,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Avatar from "components/Avatar";
import Iconify from "components/Iconify";
import { SimpleSkeleton } from "components/skeleton";
import { useGetMemberVotesQuery } from "generated/graphql";
import { ClubMemberData } from "pages/Clubs/data.t";
import { FC } from "react";
import VoteRow from "./VoteRow";

interface MemberVotesModalProps {
  open: boolean;
  onClose: any;
  member: ClubMemberData;
  isAdmin: boolean;
}

interface ContentProps {
  member: ClubMemberData;
  isAdmin: boolean;
}

function applySortFilter({ tableData }) {
  return tableData;
}

const Content: FC<ContentProps> = ({ member, isAdmin }) => {
  const { data, loading, refetch } = useGetMemberVotesQuery({
    fetchPolicy: "no-cache",
    skip: !member,
    variables: {
      limit: 100,
      offset: 0,
      memberId: member?.id,
    },
  });

  if (!member) return null;

  const renderList = () => {
    const dataFiltered = applySortFilter({
      tableData: data?.getMemberVotes?.results || [],
    });

    if (loading)
      return (
        <Stack spacing={3} sx={{ p: 3 }}>
          <SimpleSkeleton />
        </Stack>
      );

    if (dataFiltered.length === 0)
      return (
        <Typography sx={{ p: 3, color: "text.secondary" }}>
          No data found
        </Typography>
      );

    return (
      <div>
        <Stack spacing={1} sx={{ p: 3 }}>
          {dataFiltered.map((vote, index) => (
            <VoteRow
              vote={vote}
              key={vote.id}
              postActions={() => {
                refetch();
              }}
              isAdmin={isAdmin}
            />
          ))}
        </Stack>
      </div>
    );
  };

  return <div>{renderList()}</div>;
};

const MemberVotesModal: FC<MemberVotesModalProps> = ({
  onClose,
  open,
  member,
  isAdmin,
}) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={member?.profile?.displayName}
              src={member?.profile?.avatar}
              sx={{ width: 40, height: 40 }}
              clickable
            />
            <Typography variant="subtitle2" noWrap>
              {member?.profile?.displayName}
            </Typography>
          </Stack>
        }
        sx={{ p: "12px 24px 6px" }}
        action={
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <Iconify icon={"akar-icons:cross"} width={20} height={20} />
            </IconButton>
          </Stack>
        }
      />
      <Content member={member} isAdmin={isAdmin} />
    </Dialog>
  );
};

export default MemberVotesModal;
