import React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Something from './components/Bookings';
const client = new ApolloClient({
  uri: 'http://localhost:44441/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <div className="App">
          <Something />
        </div>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
