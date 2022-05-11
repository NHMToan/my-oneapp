import { Box, SxProps } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
//
import Image from "../Image";
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }: { theme: any }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

export interface UploadSingleFileProps extends DropzoneOptions {
  error?: boolean;
  file?: any;
  helperText?: ReactNode;
  sx?: SxProps;
}
export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  ...other
}: UploadSingleFileProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />

        {file && (
          <Image
            alt="file preview"
            src={typeof file === "string" ? file : file.preview}
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText && helperText}
    </Box>
  );
}
