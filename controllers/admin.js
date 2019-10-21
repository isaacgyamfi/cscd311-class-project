const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');

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

exports.getAdminLogin = (req, res) => {
  res.render('admin/admin-login', { pageTitle: 'Admin login' });
};

exports.postAdminLogin = (req, res) => {
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPwd;

  Admin.findOne({ adminEmail: adminEmail })
    .then(admin => {
      bcrypt.compare(adminPassword, admin.adminPassword).then(result => {
        return res.redirect('/admin/add-room');
      });
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
  const hall = req.body.adminHallRegisterName;

  bcrypt
    .hash(adminPassword, 12)
    .then(hashedPassword => {
      const admin = new Admin({
        adminEmail,
        adminName,
        adminPassword: hashedPassword,
        hall
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

exports.getAdminAddRoom = (req, res) => {
  res.render('admin/rooms', {
    pageTitle: 'Add a room'
  });
};

exports.postAdminAddRoom = (req, res) => {};
