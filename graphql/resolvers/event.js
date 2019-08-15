const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('../../utils/schemaHandlers');
const { transformDate } = require('../../utils/dateBuilder');

module.exports = {
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
  createEvent: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthorized', 403);
    }
    const newEvent = new Event({
      title: args.event.title,
      cost: args.event.cost,
      start_time: transformDate(args.event.start_time),
      end_time: transformDate(args.event.end_time),
      description: args.event.description,
      createdBy: req.userId
    });
    let createdEvent = {};
    try {
      const result = await newEvent.save();
      createdEvent = transformEvent (result);
      const createdBy = await User.findById(req.userId);
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
  }
}