import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import AuthContextProvider, { useAuthContext } from "./contexts/AuthContext";
import { useApollo } from "./lib/apolloClient";
import Root from "./pages/Root";
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
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </ApolloProvider>
  );
}

export default App;
