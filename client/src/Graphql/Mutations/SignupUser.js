import gql from 'graphql-tag';

const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    createUser(user: {email: $email, password: $password}) {
      _id, 
      email
    }
  }
`;

export default SIGNUP_USER;