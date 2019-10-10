const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Room = require('./models/Room');

const app = express();
const MONGODB_URI = 'mongodb://localhost:27017/residential-booking';
const studentRoutes = require('./routes/student');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// import routes
app.use(studentRoutes);

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

// Room.create({ hall: 'Sarbah', roomNumber: '5', bed: 4 })
//   .then(result => {
//     console.log('room created');
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.listen(PORT, () => {
  console.log(`Connection successful on http://localhost:${PORT}`);
});
