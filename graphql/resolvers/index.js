const bcrypt = require('bcryptjs');
const _ = require ("lodash");

const Event = require('../../models/event');
const User = require('../../models/user');

// basically implmenting our own populate like mongo
// to force a requery when we need to grab an item in a related table
const events = async eventIds => {
  try {
    const events = await Event.find({ _id: {$in: eventIds}})
    return events.map(event => {
      return { 
        ...event._doc, 
        createdBy: user.bind(this, event._doc.createdBy) 
      }
    });
  } catch (err) { 
    throw new Error(err) 
  };
}

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return { 
      ...user._doc, 
      createdEvents: events.bind(this, user._doc.createdEvents) 
    }
  } catch(err) { 
    throw new Error(err) 
  };
}

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(ev => ({ ...ev._doc, createdBy: user.bind(this, ev._doc.createdBy )}));
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
      createdBy: "5d4e42e98bea670bda76ce81" // dummy user to be removed later
    });
    let createdEvent = {};
    try {
      const result = await newEvent.save();
      createdEvent = { ...result._doc, createdBy: user.bind(this, result._doc.createdBy) };
      const createdBy = await User.findById('5d4e42e98bea670bda76ce81') // hardoced update to dummy user's createdEvents array
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
  }
};