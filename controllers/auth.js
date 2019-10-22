const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.getStudentLogin = (req, res) => {
  res.render('student/login', {
    pageTitle: 'Student login'
  });
};

exports.getStudentRegister = (req, res, next) => {
  res.render('student/login', {
    pageTitle: 'Student register'
  });
};

exports.postStudentLogin = (req, res, next) => {
  const studentId = req.body.studentId;
  const studentPin = req.body.studentPin;

  Student.findOne({
    studentId: studentId
  })
    .then(student => {
      if (!student) {
        return res.redirect('/');
      }
      bcrypt
        .compare(studentPin, student.studentPin)
        .then(match => {
          if (match) {
            console.log('Logged in successfully');
            req.session.loggedIn = true;
            req.session.student = student;
            return req.session.save(err => {
              res.redirect('/booking');
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
};

exports.postStudentRegister = (req, res, next) => {
  const studentName = req.body.studentRegisterName;
  const studentId = req.body.studentRegisterId;
  const studentPin = req.body.studentRegisterPin;

  bcrypt
    .hash(studentPin, 12)
    .then(hashedPin => {
      const newStudent = new Student({
        studentName: studentName,
        studentId: studentId,
        studentPin: hashedPin,
        studentRoom: { roomId: [] }
      });
      return newStudent.save();
    })
    .then(result => {
      res.redirect('/booking');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postStudentLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getAdminLogin = (req, res) => {
  res.render('admin/admin-login', { pageTitle: 'Admin login' });
};

exports.postAdminLogin = (req, res) => {
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPwd;

  Admin.findOne({ adminEmail: adminEmail })
    .then(admin => {
      if (!admin) {
        return res.redirect('/admin/');
      }
      bcrypt
        .compare(adminPassword, admin.adminPassword)
        .then(ifMatch => {
          if (ifMatch) {
            console.log('Admin logged in successfully');
            req.session.adminLoggedIn = true;
            req.session.admin = admin;
            return req.session.save(err => {
              res.redirect('/admin/add-room');
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAdminRegister = (req, res) => {
  res.render('admin/admin-login', { pageTitle: 'Admin register' });
};

exports.postAdminRegister = (req, res) => {
  const adminEmail = req.body.adminRegisterEmail;
  const adminName = req.body.adminRegisterName;
  const adminPassword = req.body.adminRegisterPwd;
  const hall = req.body.adminRegisterHallName;
  console.log(hall);
  bcrypt
    .hash(adminPassword, 12)
    .then(hashedPassword => {
      const admin = new Admin({
        adminEmail: adminEmail,
        adminName: adminName,
        adminPassword: hashedPassword,
        hall: hall
      });
      return admin.save();
    })
    .then(result => {
      console.log(result);
      res.redirect('/admin/add-room');
    })
    .catch(err => {
      console.log(err);
    });
};
