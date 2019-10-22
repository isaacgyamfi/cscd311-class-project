const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const MongoDBStore = require('connect-mongodb-session')(session);

const Student = require('./models/Student');
const Admin = require('./models/Admin');

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/residential-booking';
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

const adminStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'admin-sessions'
});

app.use(
  session({
    secret: 'admin-secret',
    resave: false,
    saveUninitialized: false,
    store: adminStore
  })
);

app.use((req, res, next) => {
  res.locals.authenticated = req.session.loggedIn;
  next();
});

app.use((req, res, next) => {
  res.locals.adminAuthenticated = req.session.adminLoggedIn;
  next();
});

app.use((req, res, next) => {
  if (!req.session.student) {
    return next();
  }
  Student.findById(req.session.student._id)
    .then(student => {
      if (!student) {
        return next();
      }
      req.student = student;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findById(req.session.admin._id)
    .then(admin => {
      if (!admin) {
        return next();
      }
      req.admin = admin;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// import routes
app.use(studentRoutes);
app.use('/admin', adminRoutes);

const PORT = 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('DB connected');
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Connection successful on http://localhost:${PORT}`);
});
