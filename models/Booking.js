const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  hall: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
