import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import LOGIN_USER from '../Graphql/Queries/LoginUser';
import SIGNUP_USER from '../Graphql/Mutations/SignupUser';

let formError = false;

const LoginForm = styled.form`
  width: 18rem;
  margin: 5rem auto;
  padding: 0 1rem;
  .form-control {
    label, input {
      width: 100%;
      display: block;
    }
  }
  .form-control label {
    margin-bottom: .5rem;
  }
  .form-control {
    margin-bottom: 1rem;
    padding-right: 5px;
    input {
      height: 2rem;
      border-radius: 4px;
      font-size: 25px;
      line-height: 25px;
    }
  }
  .form-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      background: #011011;
      font: inherit;
      border: 1px solid #011011;
      border-radius: 3px;
      padding: .25rem 1rem;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.26);
      color: white;
      cursor: pointer;
      &:hover, &:active {
        background: #01A7A7;
        border-color: #01A7A7;
      }
    }
  }
`;

const setLoggedInUser = ({login}) => {
  console.log(login);
}

let emailElement = React.createRef();
let passwordElement = React.createRef();
export const AuthPage = () => {

  const [ isLoginState, setLoginState ]                          = useState(true);
  
  const [ loginUser, 
    { data, loading, error } ]                            = useLazyQuery(LOGIN_USER);
  
  const [ signupUser,
    { loading: mutationLoading, error: mutationError } ]  = useMutation(SIGNUP_USER);

  if(data) {
    setLoggedInUser(data);
  }

  if(!isLoginState) {
    return (
      <React.Fragment>
        <h3>Signup</h3>
        <LoginForm onSubmit={e => {
          e.preventDefault();
          const email = emailElement.current.value;
          const password = passwordElement.current.value;
          if (email.trim() === '' || typeof email === 'undefined' || email.trim().length < 1) {
            formError = true;
          }
          if (password.trim() === '' || typeof password === 'undefined' || password.trim().length < 1) {
            formError = true;
          }
          if (!formError) {
            signupUser({variables: {email, password}});      
          }
        }}>
          <div className="form-control">
            <label htmlFor="email">E-mail</ label>
            <input type="text" id="email" ref={emailElement}/>
          </div>
          <div className="form-control">
            <label htmlFor="password" >Password</ label>
            <input type="text" id="password" ref={passwordElement}/>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => {setLoginState(true)}}>Switch to Login</button>
            <button type="submit">Create User</button>
          </div>
          { formError && <div>Email or password are invalid...</div> }
          { mutationLoading && <p>Signup in progress...</p> }
          { mutationError && <p>Error... Please try again</p> }
        </LoginForm>
      </React.Fragment>
    )
  } else {

    return (
      <React.Fragment>
        <h3>Log in</h3>
        <LoginForm onSubmit={e => {
          e.preventDefault();
          const email = emailElement.current.value.toLowerCase();
          const password = passwordElement.current.value.toLowerCase();
          if (email.trim() === '' || typeof email === 'undefined' || email.trim().length < 1) {
            formError = true;
          }
          if (password.trim() === '' || typeof password === 'undefined' || password.trim().length < 1) {
            formError = true;
          }
          if (!formError) {
            loginUser({ variables: { email, password }});
          }
        }}>
          <div className="form-control">
            <label htmlFor="email">E-mail</ label>
            <input type="text" id="email" ref={emailElement}/>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</ label>
            <input type="text" id="password" ref={passwordElement}/>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => {setLoginState(false)}}>Switch to Signup</button>
            <button type="submit">Login</button>
          </div>
          { error && <div>Email or password are invalid...{JSON.stringify(error)}</div> }
          { loading && <p>Logging you in...</p> }
        </LoginForm>
      </React.Fragment>
    )
  }
}

export default AuthPage;