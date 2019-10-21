const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  hall: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
