import { Avatar as MUIAvatar, AvatarProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import LightboxModal from "./LightboxModal";

// ----------------------------------------------------------------------
interface IAvatar extends AvatarProps {
  clickable?: boolean;
}
const Avatar = forwardRef(
  (
    { color = "default", children, sx, src, clickable, ...other }: IAvatar,
    ref: any
  ) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const lightBox = () => {
      return (
        <LightboxModal
          images={[src]}
          mainSrc={src}
          isOpen={isOpen}
          onCloseRequest={() => setIsOpen(false)}
        />
      );
    };
    if (color === "default") {
      return (
        <>
          {lightBox()}
          <MUIAvatar
            ref={ref}
            src={src}
            onClick={() => {
              if (src && clickable) setIsOpen(true);
            }}
            sx={{ cursor: "pointer", ...sx }}
            {...other}
          >
            {children}
          </MUIAvatar>
        </>
      );
    }

    return (
      <>
        {lightBox()}
        <MUIAvatar
          ref={ref}
          src={src}
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette[color].contrastText,
            backgroundColor: theme.palette[color].main,
            cursor: "pointer",
            ...sx,
          }}
          onClick={() => {
            if (src && clickable) setIsOpen(true);
          }}
          {...other}
        >
          {children}
        </MUIAvatar>
      </>
    );
  }
);

export default Avatar;
