const Event = require('../models/event')
const User = require('../models/user');
const { transformDate } = require('./dateBuilder');

const transformEvent = event => {
  return {
    ...event._doc,
    createdBy: user.bind(this, event.createdBy),
    start_time: transformDate(event._doc.start_time),
    end_time: transformDate(event._doc.end_time),
  }
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: transformDate(booking._doc.createdAt),
    updatedAt: transformDate(booking._doc.updatedAt),
  }
}

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw new Error(err);
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: {$in: eventIds}})
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) { 
    throw new Error(err) 
  };
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId)
    return { 
      ...user._doc, 
      createdEvents: events.bind(this, user._doc.createdEvents) 
    }
  } catch(err) { 
    throw new Error(err) 
  };
};

module.exports = {
  events, 
  singleEvent,
  transformBooking,
  transformEvent,
  user,
};
