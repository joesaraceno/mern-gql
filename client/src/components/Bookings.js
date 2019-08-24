import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { Booking } from './Booking';
import { Loader } from './Shared/Loader';

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

export const Bookings = () => {
  const { data, error, loading } = useQuery(getBookings);

  if (loading) {
    return (
      <Loader />
    );
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  
  return (
    <React.Fragment>
      <h3>Bookings List</h3>
      <BookingList>
        {data.bookings.map(booking => {
          return (
            <Booking key={booking._id} booking={booking} />
          )
        })}
      </BookingList>
    </React.Fragment>
  );
};