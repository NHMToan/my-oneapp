import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
interface PolicyModalProps {
  open: boolean;
  onClose: any;
}

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

const PolicyModal: FC<PolicyModalProps> = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Privacy Policy</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          This Privacy Policy explains how we collect, use, disclose, and
          protect the personal information you provide when you log in using
          Facebook authentication on our website or app. We value your privacy
          and are committed to protecting your personal information.
          <Typography variant="h2" className={classes.subheading}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            When you log in using Facebook authentication, we may collect the
            following information from your Facebook account:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Your public profile information, including your name, profile picture."
                className={classes.listItem}
              />
            </ListItem>
          </List>
          <Typography variant="h2" className={classes.subheading}>
            2. Use of Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect for the following purposes:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="To authenticate your identity and provide you with access to our website or app."
                className={classes.listItem}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="To personalize your experience and display your name and profile picture within our platform."
                className={classes.listItem}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="To communicate with you regarding updates, notifications, and account-related information."
                className={classes.listItem}
              />
            </ListItem>
          </List>
          <Typography variant="h2" className={classes.subheading}>
            3. Data Sharing and Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            We do not share your personal information obtained through Facebook
            authentication with third parties, except in the following
            circumstances:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="With your explicit consent or as required by law."
                className={classes.listItem}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="       When necessary to protect our rights, safety, or property, or that
                of others."
                className={classes.listItem}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="    In the event of a merger, acquisition, or sale of all or a portion
                of our assets, your personal information may be transferred to the
                acquiring entity."
                className={classes.listItem}
              />
            </ListItem>
          </List>
          <Typography variant="h2" className={classes.subheading}>
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, use, or disclosure. However,
            please be aware that no data transmission over the internet or
            storage method is 100% secure, and we cannot guarantee absolute
            security.
          </Typography>
          <Typography variant="h2" className={classes.subheading}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to access, update, correct, or delete the
            personal information we have obtained through Facebook
            authentication. You can exercise these rights by contacting us using
            the information provided below.
          </Typography>
          <Typography variant="h2" className={classes.subheading}>
            6. Facebook Policies
          </Typography>
          <Typography variant="body1" paragraph>
            Please note that when you log in using Facebook authentication, you
            are subject to Facebook's Terms of Service and Data Policy. We
            encourage you to review Facebook's policies to understand how your
            information is collected, used, and shared on their platform.
          </Typography>
          <Typography variant="h2" className={classes.subheading}>
            7. Changes to this Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any material changes by posting the updated policy on our website
            or app.
          </Typography>
          <Typography variant="h2" className={classes.subheading}>
            8. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us at{" "}
            <a href="mailto: vietsportmates@gmail.com">
              vietsportmates@gmail.com
            </a>{" "}
            .
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyModal;
