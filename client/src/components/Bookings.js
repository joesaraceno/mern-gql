import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { Booking } from './Booking';

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

const BookingList = styled.ul`
  list-style-type: none;
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
    <BookingList>
      {data.bookings.map(booking => {
        return (
          <Booking key="booking._id" booking={booking} />
        )
      })}
    </BookingList>
  );
};

export default Bookings;