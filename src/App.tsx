import { ApolloProvider } from "@apollo/client";
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
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
