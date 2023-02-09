import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
const UserNotification: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONESIGNAL_APPID,
      allowLocalhostAsSecureOrigin: true,
    }).then(() => {
      setInitialized(true);
      OneSignal.showSlidedownPrompt().then(() => {
        // do other stuff
      });
    });
    OneSignal.getUserId().then(function (userId) {
      setUserId(userId);
    });
    OneSignal.isPushNotificationsEnabled((value) => {
      setIsEnabled(value);
    });
  }, []);

  const subscribeUser = () => {
    setIsLoading(true);
    if (userId) {
      OneSignal.setSubscription(true).then(() => {
        setIsEnabled(true);
        setIsLoading(false);
      });
    } else {
      OneSignal.registerForPushNotifications().then(() => {
        setIsEnabled(true);
        setIsLoading(false);
      });
    }
  };
  const handleUnsubscribe = () => {
    setIsLoading(true);
    OneSignal.setSubscription(false).then(() => {
      setIsEnabled(false);
      setIsLoading(false);
    });
  };
  if (!initialized) return null;
  return (
    <div>
      <LoadingButton
        variant="contained"
        onClick={isEnabled ? handleUnsubscribe : subscribeUser}
        loading={isLoading}
      >
        {isEnabled ? "Un-subscribe" : "Subscribe"}
      </LoadingButton>
    </div>
  );
};

export default UserNotification;
