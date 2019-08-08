const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: {
      type: String, 
      required: true
    },
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
});

module.exports = mongoose.model('Event', eventSchema);