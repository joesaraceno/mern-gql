import gql from 'graphql-tag';

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId,
      token,
      tokenExpiration
    }
  }
`;

export default LOGIN_USER;