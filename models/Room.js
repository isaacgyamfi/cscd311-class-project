const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  hall: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  bed: {
    type: Number,
    required: true
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

module.exports = mongoose.model('Room', roomSchema);
