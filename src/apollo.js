import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
// import dotenv from 'dotenv';
// dotenv.config();

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default apolloClient