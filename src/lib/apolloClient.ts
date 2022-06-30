import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { createClient } from "graphql-ws";

// const httpLink = createHttpLink({
//   uri: process.env.REACT_APP_API_GRAPHQL_URL,
//   credentials: "include",
// });
const token = localStorage.getItem("accessToken");

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_WS_URL,
    connectionParams: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
);

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_GRAPHQL_URL,
  credentials: "include",
});
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadLink
);
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
  link: ApolloLink.from([errorLink, authLink, link]),
  cache,
});
export default client;
