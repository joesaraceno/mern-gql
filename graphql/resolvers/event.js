const Event = require('../../models/event');
const { transformEvent } = require('../../utils/schemaHandlers');

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
  }
}