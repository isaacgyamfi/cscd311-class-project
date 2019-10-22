const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hallSchema = new Schema({
  hallName: {
    type: String,
    required: true
  },
  block: {
    type: String,
    required: true
  },
  numOfRoomsAvailable: {
    type: Number,
    required: true
  },
  hallAdmin: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Hall', hallSchema);
