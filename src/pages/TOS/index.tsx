import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Page from "components/Page";
import useSettings from "hooks/useSettings";
import { FC } from "react";
interface TOSProps {}
const useStyles = makeStyles((theme?: any) => ({
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  subheading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  listItem: {
    marginLeft: theme.spacing(1),
  },
}));
const TOS: FC<TOSProps> = (props) => {
  const classes = useStyles();
  const { themeStretch } = useSettings();
  return (
    <Page title="TOS">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h1">Terms of Service:</Typography>
        <Typography variant="h2" className={classes.subheading}>
          1. Acceptance of Terms:
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing and using this website, you agree to be bound by these
          terms and conditions, as well as any additional guidelines, rules, or
          policies that may be posted on the website from time to time. If you
          do not agree to these terms, please refrain from using the website.
        </Typography>

        <Typography variant="h2" className={classes.subheading}>
          2. Intellectual Property:
        </Typography>
        <Typography variant="body1" paragraph>
          All content on this website, including but not limited to text,
          graphics, logos, images, videos, and software, is the property of the
          website owner and is protected by intellectual property laws. You may
          not use, reproduce, modify, or distribute any of the content without
          prior written permission from the website owner.
        </Typography>

        <Typography variant="h2" className={classes.subheading}>
          3. User Conduct:
        </Typography>
        <Typography variant="body1" paragraph>
          When using this website, you agree to abide by the following
          guidelines:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Do not engage in any unlawful or unauthorized activities"
              className={classes.listItem}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Do not upload or transmit any harmful or offensive content."
              className={classes.listItem}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Do not interfere with the website's functionality or disrupt the user experience."
              className={classes.listItem}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Do not attempt to gain unauthorized access to any part of the website."
              className={classes.listItem}
            />
          </ListItem>
        </List>
        <Typography variant="h2" className={classes.subheading}>
          4. Privacy Policy:
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to protecting your privacy. Please review our Privacy
          Policy to understand how we collect, use, and safeguard your personal
          information.
        </Typography>
        <Typography variant="h2" className={classes.subheading}>
          5. Disclaimer of Warranties:
        </Typography>
        <Typography variant="body1" paragraph>
          This website is provided on an "as is" and "as available" basis. We do
          not make any warranties, express or implied, regarding the website's
          operation or the accuracy, reliability, or completeness of the
          content. We shall not be held responsible for any damages resulting
          from the use or inability to use the website.
        </Typography>
        <Typography variant="h2" className={classes.subheading}>
          6. Limitation of Liability:
        </Typography>
        <Typography variant="body1" paragraph>
          In no event shall we or our affiliates be liable for any direct,
          indirect, incidental, consequential, or punitive damages arising out
          of or in connection with the use of this website, even if we have been
          advised of the possibility of such damages.
        </Typography>
        <Typography variant="h2" className={classes.subheading}>
          7. Governing Law:
        </Typography>
        <Typography variant="body1" paragraph>
          These terms and conditions shall be governed by and construed in
          accordance with the laws of [Jurisdiction]. Any disputes arising from
          the use of this website shall be subject to the exclusive jurisdiction
          of the courts in [Jurisdiction].
        </Typography>
      </Container>
    </Page>
  );
};

export default TOS;
