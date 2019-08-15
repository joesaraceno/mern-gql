import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Bookings from './components/Bookings';
import AuthPage from './components/Auth';
const client = new ApolloClient({
  uri: 'http://localhost:44441/graphql',
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Switch>
            <Redirect exact from="/" to="/auth" />
            <Route path="/bookings" component={Bookings} />
            <Route path="/auth" component={AuthPage} />
          </Switch>
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
