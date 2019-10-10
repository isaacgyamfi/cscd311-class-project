const Student = require('../models/Student');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
exports.getLogin = (req, res) => {
  res.render('login', {
    pageTitle: 'Student login'
  });
};

exports.postLogin = (req, res) => {
  const studentId = req.body.studentId;
  const studentPin = req.body.studentPin;

  Student.findOne({
    studentId,
    studentPin
  })
    .then(student => {
      if (!student) {
        return res.redirect('/');
      }
      console.log('Logged in successfully');
      res.render('booking', {
        pageTitle: 'Book a room',
        student: student,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRegister = (req, res) => {
  res.render('login', {
    pageTitle: 'Student register'
  });
};

exports.postRegister = (req, res) => {
  const studentName = req.body.studentRegisterName;
  const studentId = req.body.studentRegisterId;
  const studentPin = req.body.studentRegisterPin;

  const newStudent = new Student({ studentName, studentId, studentPin });
  newStudent
    .save()
    .then(result => {
      Student.findOne({ studentId }).then(result => {
        console.log(result);
        console.log('New student created');
        res.render('booking', {
          loggedIn: true,
          pageTitle: 'Book a room',
          student: result
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getBooking = (req, res) => {
  res.render('booking', {
    pageTitle: 'Book a room',
    loggedIn: false
  });
};

exports.postBooking = (req, res) => {
  const studentId = req.body.stdID;
  const room = req.body.room;
  const hall = req.body.hall;

  if (studentId == '') {
    res.redirect('/');
  } else if (studentId) {
    Booking.findOne({ studentId })
      .then(result => {
        if (result) {
          console.log('Already made booking');
          return res.send('Already made booking');
        }
        const booking = new Booking({ studentId, room, hall });
        booking
          .save()
          .then(result => {
            console.log('room booked');
            res.redirect('/');
          })
          .catch(err => {
            console.log(err);
          });
        Student.findOne({ studentId })
          .then(std => {
            return std.addToBooking(std);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
