import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  console.log("ZOO day", localStorage.getItem("accessToken"));
  // get the authentication token from JWTManager if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
