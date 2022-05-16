import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

// const httpLink = createHttpLink({
//   uri: process.env.REACT_APP_API_GRAPHQL_URL,
//   credentials: "include",
// });

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_GRAPHQL_URL,
  credentials: "include",
});
const errorLink: any = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
const authLink = setContext((_, { headers, ...context }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
    ...context,
  };
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache,
});
export default client;
