const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String, 
      required: true, 
    },
    cost: {
      type: Number, 
      required: true,
    },
    start_time: {
      type: String, 
      required: true
    },
    end_time: {
      type: String, 
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    }
});

module.exports = mongoose.model('Event', eventSchema);