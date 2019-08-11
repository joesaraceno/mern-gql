const Event = require('../models/event')
const User = require('../models/user');
// const Booking = require('../../models/booking');

// basically implmenting our own populate like mongo
// to force a requery when we need to grab an item in a related table
module.exports = {

  sngleEvent: async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      return transformEvent(event);
    } catch (err) {
      throw new Error(err);
    }
  },
  
  events: async (eventIds) => {
    try {
      const events = await Event.find({ _id: {$in: eventIds}})
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) { 
      throw new Error(err) 
    };
  },
  
  user: async (userId) => {
    try {
      const user = await User.findById(userId)
      return { 
        ...user._doc, 
        createdEvents: events.bind(this, user._doc.createdEvents) 
      }
    } catch(err) { 
      throw new Error(err) 
    };
  },

};
