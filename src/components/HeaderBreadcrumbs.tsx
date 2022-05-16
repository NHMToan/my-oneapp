import { Box, Link, SxProps, Typography } from "@mui/material";
import Breadcrumbs, { BreadCrumbLink } from "./Breadcrumbs";
// ----------------------------------------------------------------------

interface HeaderBreadcrumbsProps {
  links?: BreadCrumbLink[];
  action?: any;
  heading: string;
  moreLink?: any;
  sx?: SxProps;
}
export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = "" || [],
  sx,
  ...other
}: HeaderBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          {links?.length > 0 && <Breadcrumbs links={links} {...other} />}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {typeof moreLink === "string" ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
