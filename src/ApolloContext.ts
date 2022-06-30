import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import React from 'react';

interface ApolloContextInterface {
  client: ApolloClient<NormalizedCacheObject>;
}

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_HOST,
  cache: new InMemoryCache()
});

export const ApolloContext = React.createContext<ApolloContextInterface | null>(null);
