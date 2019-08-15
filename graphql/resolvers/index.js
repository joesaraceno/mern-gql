const userResolver  = require ('./user');
const bookingResolver  = require ('./booking');
const eventResolver = require ('./event');

module.exports = {
  ...userResolver, ...bookingResolver, ...eventResolver
};