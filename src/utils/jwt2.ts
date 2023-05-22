import jwtDecode from "jwt-decode";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number): void => {
  let expiredTimer: NodeJS.Timeout;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(getRefreshToken, timeLeft);
};

const setSession = (accessToken?: string): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);

    const { exp } = jwtDecode(accessToken) as { exp: number };
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const getRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}refresh_token`, {
      credentials: "include",
    });

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
