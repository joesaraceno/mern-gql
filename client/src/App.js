import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { Bookings } from './Components/Bookings';
import { AuthPage }from './Components/Auth';
import { Navigation } from './Components/Navigation/Navigation';

import { ApolloLink } from "apollo-link";
// import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({ uri: "http://localhost:44441/graphql" });
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });
  return forward(operation);
});

// use with apollo-client
const link = middlewareLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const Main = styled.main`
  padding-top: 70px;
`

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Navigation />
          <Main>
            <Switch>
              <Redirect exact from="/" to="/auth" />
              <Route path="/bookings" component={Bookings} />
              <Route path="/auth" component={AuthPage} />
            </Switch>
          </Main>
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
