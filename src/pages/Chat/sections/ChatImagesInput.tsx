import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MultiFilePreview } from "components/upload";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }: { theme: any }) => ({
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------
export interface ChatImagesInputProps extends DropzoneOptions {
  files?: any[];
  onRemove?: any;
  children?: ReactNode;
}
export default function ChatImagesInput({
  files,

  onRemove,

  children,
  ...other
}: ChatImagesInputProps) {
  const { getRootProps } = useDropzone({
    ...other,
    multiple: true,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <DropZoneStyle {...getRootProps()}>{children}</DropZoneStyle>

      <MultiFilePreview files={files} showPreview={true} onRemove={onRemove} />
    </Box>
  );
}
