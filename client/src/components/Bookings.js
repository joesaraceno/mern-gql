import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const getBookings = gql`
  {
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

const Bookings = () => {
  const { data, error, loading } = useQuery(getBookings);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  
  return (
    <ul>
      {data.bookings.map(booking => {
        const { event, user } = booking;
        return (  
          <li key="booking._id">      
            <p>
              EVENT: { JSON.stringify(event) }
            </p>
            <p>
              USER: { JSON.stringify(user) }
            </p>
          </li>
        )
      })}
    </ul>
  );
};

export default Bookings;