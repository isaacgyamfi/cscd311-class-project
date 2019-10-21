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
  studentRoom: {
    room: [
      {
        roomId: {
          type: Schema.Types.ObjectId,
          ref: 'Room',
          required: true
        }
      }
    ]
  }
});

studentSchema.methods.addRoom = function(student) {
  // assign room
};

module.exports = mongoose.model('Student', studentSchema);
