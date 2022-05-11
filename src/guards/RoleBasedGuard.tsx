// @mui
import { Container, Typography } from "@mui/material";
import { m } from "framer-motion";
import { ReactNode } from "react";
import { ForbiddenIllustration } from "../assets";
import { MotionContainer, varBounce } from "../components/animate";
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

interface RoleBasedGuardProps {
  hasContent?: boolean;
  roles?: string[];
  children: ReactNode;
}
export default function RoleBasedGuard({
  hasContent,
  roles,
  children,
}: RoleBasedGuardProps) {
  // Logic here to get current user role
  const { user } = useAuth();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
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
    ) : null;
  }

  return <>{children}</>;
}
