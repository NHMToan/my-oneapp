import { ApolloProvider } from "@apollo/client";
import { MotionLazyContainer } from "components/animate";
import ScrollToTop from "components/ScrollToTop";
import ThemeSettings from "components/settings";
import { useEffect } from "react";
import Router from "Router";
import ThemeProvider from "theme";
import { useAuthContext } from "./contexts/AuthContext";
import { useApollo } from "./lib/apolloClient";
function App() {
  const { checkAuth } = useAuthContext();
  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
    };

    authenticate();
  }, [checkAuth]);
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <ScrollToTop />
            <Router />
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
    </ApolloProvider>
  );
}

export default App;
