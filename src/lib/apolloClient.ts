import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import JWTManager from "../utils/jwt";
export function useApollo() {
  const errorLink = onError((errors) => {
    if (
      errors.graphQLErrors &&
      errors.graphQLErrors[0].extensions?.code === "UNAUTHENTICATED" &&
      errors.response
    ) {
      errors.response.errors = undefined;
      console.log(errors);
    }
  });

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_GRAPHQL_URL,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from JWTManager if it exists
    const token = JWTManager.getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: from([errorLink, httpLink, authLink]),
    cache: new InMemoryCache(),
  });
  return client;
}
