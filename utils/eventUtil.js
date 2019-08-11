const { transformDate } = require('./dateBuilder');
const { user } = require('./schemaHandlers');

module.exports = {
  transformEvent: (event) => {
    return {
      ...event._doc,
      createdBy: user.bind(this, event.createdBy),
      start_time: transformDate(event._doc.start_time),
      end_time: transformDate(event._doc.end_time),
    }
  }
}