import { DialogTitle } from "@mui/material";
import { DialogAnimate } from "components/animate";
import { FC } from "react";
import { RatingCandidateData, RatingData } from "../../data.t";
import CandidateForm from "./CandidateForm";
interface CandidateFormModalProps {
  candidate: RatingCandidateData;
  isOpen: boolean;
  onClose: () => void;
  onPostSave: () => void;
  rating: RatingData;
}
const CandidateFormModal: FC<CandidateFormModalProps> = ({
  candidate,
  onClose,
  isOpen,
  rating,
  onPostSave,
}) => {
  return (
    <DialogAnimate open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {candidate ? "Edit candidate" : "Add new candidate"}
      </DialogTitle>

      <CandidateForm
        candidate={candidate}
        rating={rating}
        onCancel={() => {
          onClose();
        }}
        onPostSave={() => {
          onPostSave();
        }}
      />
    </DialogAnimate>
  );
};

export default CandidateFormModal;
