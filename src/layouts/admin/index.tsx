import { Container, Typography } from "@mui/material";
// @mui
import { MotionContainer, varBounce } from "components/animate";
import useAuth from "hooks/useAuth";
import { Outlet } from "react-router-dom";
// config
// hooks
//
import { ForbiddenIllustration } from "assets";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

interface AdminLayoutProps {}
export default function AdminLayout({}: AdminLayoutProps) {
  const { user } = useAuth();

  if (user.role === "admin") return <Outlet />;
  return (
    <Container component={MotionContainer} sx={{ textAlign: "center" }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          Permission Denied
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: "text.secondary" }}>
          You do not have permission to access this page
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>
    </Container>
  );
}
