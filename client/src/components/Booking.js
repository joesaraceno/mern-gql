import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns'

const BookingItem = styled.li`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Booking = props => {
  const { event, user } = props.booking;
  const { title, description, start_time, end_time } = event;
  const start_date = format(start_time, 'MM/DD/YY')
  const formatted_times = {
    start: format(start_time, 'H:MMa'),
    end: format(end_time, 'H:MMa'),
  }
  const { email } = user
  return (
    <BookingItem key={props.booking._id}>     
      <p>
        <b>
          { start_date  }
        </b>
      </p>
      <p>
        title: { title }. desc: { description }, time: { formatted_times.start } - { formatted_times.end }
      </p>
      <p>
        USER: { email }
      </p>
    </BookingItem>
  );
};

