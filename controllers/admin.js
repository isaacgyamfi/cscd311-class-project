const Booking = require('../models/Booking');

exports.getReport = (req, res) => {
  Booking.find()
    .then(result => {
      res.render('report', {
        result: result,
        pageTitle: 'Bookings'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
