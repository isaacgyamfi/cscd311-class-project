const Booking = require('../models/Booking');
const Student = require('../models/Student');

exports.getBooking = (req, res) => {
  const studentId = req.session.student._id;
  console.log(studentId);
  Student.findOne(studentId)
    .then(student => {
      if (!student) {
        console.log('logged out');
        return res.redirect('/');
      }
      res.render('student/booking', {
        pageTitle: 'Book a room',
        student: student,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postBooking = (req, res) => {
  const studentId = req.body.stdID;
  const room = req.body.room;
  const hall = req.body.hall;
  // const studentUserId = req.body.studentUserId;

  if (studentId == '') {
    res.redirect('/');
  } else if (studentId) {
    Booking.findOne({ studentId })
      .then(result => {
        if (result) {
          console.log('Already made booking');
          return res.send('Already made booking');
        }
        const booking = new Booking({
          studentId: studentId,
          room: room,
          hall: hall,
          student: req.student
        });
        booking
          .save()
          .then(result => {
            res.render();
            res.redirect('/');
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

exports.getSuccessPage = (req, res) => {
  res.render('student/success', {
    pageTitle: 'Booking success'
  });
};
