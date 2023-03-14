import { Box, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/Iconify";
import LightboxModal from "components/LightboxModal";
import Markdown from "components/Markdown";
import { MultiFilePreview } from "components/upload";
import { useState } from "react";
import { fDate } from "utils/formatTime";

interface Props {
  note: any;
}
const SPEED = 160;
const ClubNoteCard: React.FC<Props> = ({ note }) => {
  const theme: any = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const handleCloseLightbox = () => {
    setIsOpen(false);
  };
  const imagesLightbox = note?.images;
  return (
    <Box
      sx={{
        p: 2,
        boxShadow: 0,
        color: theme.palette["warning"].darker,
        bgcolor: theme.palette["warning"].lighter,
        borderRadius: 3,
      }}
    >
      <CardHeader
        title={`${note.club.title}`}
        subheader={fDate(note?.createdAt)}
        avatar={<Iconify icon="mingcute:notification-fill" />}
        sx={{ p: 1 }}
      />
      <Box sx={{ px: 2 }}>
        <Markdown children={note?.description || ""} />
      </Box>
      {note?.images?.length > 0 && (
        <MultiFilePreview
          files={note.images}
          thumbnail={true}
          onClick={(file) => {
            setSelectedImage(imagesLightbox.findIndex((item) => item === file));
            setIsOpen(true);
          }}
        />
      )}
      <LightboxModal
        animationDuration={SPEED}
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={isOpen}
        onCloseRequest={handleCloseLightbox}
        onMovePrevRequest={() => {
          setSelectedImage(
            (selectedImage + imagesLightbox.length - 1) % imagesLightbox.length
          );
        }}
        onMoveNextRequest={() => {
          setSelectedImage((selectedImage + 1) % imagesLightbox.length);
        }}
      />
    </Box>
  );
};

export default ClubNoteCard;
