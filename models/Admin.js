const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminName: {
    type: String,
    required: true
  },
  adminEmail: {
    type: String,
    required: true
  },
  adminPassword: {
    type: String,
    required: true
  },
  hall: {
    type: String,
    required: true
  },
  rooms: {
    availableRooms: [
      {
        roomId: {
          type: Schema.Types.ObjectId,
          ref: 'Room',
          required: true
        },
        numOfBeds: {
          type: Number,
          required: true,
          default: 4
        }
      }
    ]
  }
});

module.exports = mongoose.model('Admin', adminSchema);
