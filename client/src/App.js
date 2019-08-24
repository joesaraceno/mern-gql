import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { Bookings } from './components/Bookings';
import { AuthPage }from './components/Auth';
import { Navigation } from './components/Navigation/Navigation';
const client = new ApolloClient({
  uri: 'http://localhost:44441/graphql',
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
