// @mui
import { Card, CardContent, CardProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

// ----------------------------------------------------------------------
interface RootStyleProps {
  theme?: any;
}
const RootStyle = styled(Card)<RootStyleProps>(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

interface AppWelcomeProps extends CardProps {
  title?: string;
  img?: ReactNode;
  description?: string;
  action?: ReactNode;
}
export default function AppWelcome({
  title,
  description,
  action,
  img,
  ...other
}: AppWelcomeProps) {
  return (
    <RootStyle {...other}>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ whiteSpace: "pre-line" }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" }}
        >
          {description}
        </Typography>

        {action && action}
      </CardContent>

      {img && img}
    </RootStyle>
  );
}
