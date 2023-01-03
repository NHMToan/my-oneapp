import { Box, Button, Stack, SxProps } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
//
import BlockContent from "./BlockContent";
import MultiFilePreview from "./MultiFilePreview";
import RejectionFiles from "./RejectionFiles";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }: { theme: any }) => ({
  outline: "none",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------
export interface UploadMultiFileProps extends DropzoneOptions {
  files?: any[];
  error?: boolean;
  showPreview?: boolean;
  onUpload?: any;
  onRemove?: any;
  onRemoveAll?: any;
  helperText?: ReactNode;
  sx?: SxProps;
  thumbnail?: boolean;
}
export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  thumbnail,
  ...other
}: UploadMultiFileProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
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
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections?.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
        thumbnail={thumbnail}
      />

      {files?.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          {onUpload && (
            <Button size="small" variant="contained" onClick={onUpload}>
              Upload files
            </Button>
          )}
        </Stack>
      )}

      {helperText && helperText}
    </Box>
  );
}
