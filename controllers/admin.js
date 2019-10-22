// const Admin = require('../models/Admin');
const Booking = require('../models/Booking');

exports.getReport = (req, res) => {
  Booking.find()
    .then(result => {
      res.render('admin/report', {
        result: result,
        pageTitle: 'Bookings'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAdminAddRoom = (req, res) => {
  const adminId = req.session.admin;
  console.log(adminId);
  res.render('admin/rooms', {
    pageTitle: 'Add a room'
    // admin: admin
  });
};

exports.postAdminAddRoom = (req, res) => {};
