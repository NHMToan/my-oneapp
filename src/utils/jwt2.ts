import jwtDecode from "jwt-decode";

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(getRefreshToken, timeLeft);
};

const setSession = (accessToken?) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    //setToken

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken) as any; // ~5 days by minimals server
    handleTokenExpired(exp);
  } else {
    //Remove token
    localStorage.removeItem("accessToken");
  }
};

const getRefreshToken = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}refresh_token`,
      {
        credentials: "include",
      }
    );

    const data = (await response.json()) as {
      success: boolean;
      accessToken: string;
    };

    localStorage.setItem("accessToken", data.accessToken);

    return true;
  } catch (error) {
    console.log("UNAUTHENTICATED", error);
    return false;
  }
};

export { isValidToken, setSession, getRefreshToken };
