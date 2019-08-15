const User = require('../../models/user');
const _ = require('lodash');
const { events } = require('./event');
const bcrypt = require('bcryptjs');

module.exports = {
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
};