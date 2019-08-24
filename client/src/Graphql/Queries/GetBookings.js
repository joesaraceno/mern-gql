import gql from 'graphql-tag';

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      _id,
      event {
        _id, 
        title,
        description,
        start_time,
        end_time,
      },
      user {
        _id,
        email,
        password
      }
    }
  }
`;

export default GET_BOOKINGS;