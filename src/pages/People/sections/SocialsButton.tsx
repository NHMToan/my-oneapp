import {
  Button,
  IconButton,
  Link,
  Stack,
  SxProps,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Iconify from "components/Iconify";

// ----------------------------------------------------------------------

interface LinkProps {
  name: string;
  icon: string;
  socialColor: string;
  path: string;
}
interface SocialsButtonProps {
  sx?: SxProps;
  simple?: boolean;
  links: LinkProps[];
  initialColor?: boolean;
}
export default function SocialsButton({
  initialColor = false,
  simple = true,
  links = [],
  sx,
  ...other
}: SocialsButtonProps) {
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {links.map((social) => {
        const { name, icon, path, socialColor } = social;
        if (!path) return null;
        return simple ? (
          <Link
            key={name}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    "&:hover": {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                "&:hover": {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
