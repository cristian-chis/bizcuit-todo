import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	link: new HttpLink({ uri: process.env.REACT_APP_SERVER_URL }),
	cache: new InMemoryCache()
});

export default client;