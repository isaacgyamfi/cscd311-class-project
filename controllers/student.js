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
        student: student
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
      console.log('New student created');
      res.redirect('/booking');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getBooking = (req, res) => {
  // res.render('booking', {
  //   pageTitle: 'Book a room'
  // });
};

exports.postBooking = (req, res) => {
  const studentId = req.body.stdID;
  const room = req.body.room;
  const hall = req.body.hall;
  // console.log(studentId, room);
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
      // return req.student.addToBooking(booking);
    })
    .catch(err => console.log(err));
};
