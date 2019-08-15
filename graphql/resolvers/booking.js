const Event = require('../../models/event');
const Booking = require('../../models/booking');
const { transformBooking, transformEvent } = require('../../utils/schemaHandlers');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => { 
        return transformBooking(booking);
      });
    } catch (err) {
      throw new Error(err);
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
      return transformBooking(result);
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
  }
}