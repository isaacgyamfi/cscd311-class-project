const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentPin: {
    type: String,
    required: true
  },
  studentBooking: {
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking'
    }
  }
});

studentSchema.methods.addToBooking = function(bookRoom) {
  const bookingRoom = { ...this.studentBooking.booking };
  if (!bookingRoom) {
    const updatedBooking = { studentBooking: bookRoom };
    this.studentBooking = updatedBooking;
    return this.save();
  }
};

module.exports = mongoose.model('Student', studentSchema);
