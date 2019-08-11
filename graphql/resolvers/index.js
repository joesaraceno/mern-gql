const bcrypt = require('bcryptjs');
const _ = require ("lodash");

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const { transformDate } = require("../../utils/dateBuilder");
const { singleEvent, events, user, transformEvent } = require('../../utils/schemaHandlers');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      // const bookingEvent = Event.find()
      return bookings.map(booking => ({ 
        ...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: transformDate(booking._doc.createdAt),
        updatedAt: transformDate(booking._doc.updatedAt),
      }));
    } catch (err) {
      throw new Error(err);
    }
  },
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event)
      });
    } catch( err) {
      throw new Error(err);
    }
  },
  createEvent: async args => {
    const newEvent = new Event({
      title: args.event.title,
      cost: args.event.cost,
      start_time: args.event.start_time,
      end_time: args.event.end_time,
      description: args.event.description,
      createdBy: "5d506b8211d8d52593017ad9" // dummy user to be removed later
    });
    let createdEvent = {};
    try {
      const result = await newEvent.save();
      createdEvent = transformEvent (result);
      const createdBy = await User.findById('5d506b8211d8d52593017ad9') // hardoced update to dummy user's createdEvents array
      if (!createdBy) {
        console.log(`failed to update ${createdBy}: Error: ${err}}`);
        throw new Error (`no user ${user} found for event: ${result._id}`);
      }
      createdBy.createdEvents.push(newEvent);
      await createdBy.save();
      return createdEvent;
    } catch(err) {
      console.log(`failed to save ${newEvent}: Error: ${err}}`);
      throw new Error(err);
    }
  },
  users: async () => {
    try {
      const users = await User.find()
      return users.map(u => (_.omit({ ...u._doc, createdEvents: events.bind(this, u._doc.createdEvents) }, 'password')));
    } catch (err) {
      console.log(`failed to get ${users}: Error: ${err}}`);
      throw new Error(err);
    }
  },
  createUser: async args => {
    try {
      const userExists = await User.findOne({ email: args.user.email })
      if(userExists) {
        throw new Error(`user with ${args.user.email} already exists`);
      }
      const hashed = await bcrypt.hash(args.user.password, 12);
      const newUser = new User({
        email: args.user.email,
        password: hashed,
      });
      const savedUser = await newUser.save()
      return _.omit({ ...savedUser._doc }, 'password');
    } catch (err) {
      throw new Error(err)
    }
  },
  bookEvent: async args => {
    try {
      const bookingEvent = await Event.findById(args.eventId);
      const booking = new Booking({
        user: '5d506b8211d8d52593017ad9',
        event: bookingEvent,
      });
      const result = await booking.save();
      return { 
        ...result._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: transformDate(result._doc.createdAt),
        updatedAt: transformDate(result._doc.updatedAt),
        
      }
    } catch(err) {
      throw new Error(err);
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw new Error(err);
    }
  },
};