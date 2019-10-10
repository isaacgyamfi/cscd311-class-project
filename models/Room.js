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
    required: true,
    default: 4
  }
});

module.exports = mongoose.model('Room', roomSchema);
