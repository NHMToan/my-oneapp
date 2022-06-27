// @mui
import { Box } from "@mui/material";
import { FC, forwardRef, ReactNode } from "react";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

interface PageProps {
  children?: ReactNode;
  title?: string;
  meta?: ReactNode;
}
const Page: FC<PageProps> = forwardRef(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} | VSG`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
