// @mui
import { Box, Stack, Tooltip } from "@mui/material";
//
import DownloadButton from "./DownloadButton";
import { fileData, fileFormat, fileThumb } from "./utils";

// ----------------------------------------------------------------------

interface FileThumbnailProps {
  file?: any;
  sx?: any;
  imgSx?: any;
  tooltip?: any;
  imageView?: any;
  onDownload?: any;
  onClick?: any;
}
export default function FileThumbnail({
  file,
  tooltip,
  imageView,
  onDownload,
  sx,
  imgSx,
  onClick,
}: FileThumbnailProps) {
  const { name = "", path = "", preview = "" } = fileData(file);

  const format = fileFormat(path || preview);

  const renderContent =
    format === "image" && imageView ? (
      <Box
        component="img"
        src={preview}
        sx={{
          width: 1,
          height: 1,
          flexShrink: 0,
          objectFit: "cover",
          ...imgSx,
          cursor: onClick && "zoom-in",
        }}
        onClick={() => {
          if (onClick) onClick(file);
        }}
      />
    ) : (
      <Box
        component="img"
        src={fileThumb(format)}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          ...sx,
        }}
      />
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "fit-content",
            height: "inherit",
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
