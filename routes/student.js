const router = require('express').Router();

const studentController = require('../controllers/student');
const {
  getStudentLogin,
  postStudentLogin,
  getStudentRegister,
  postStudentRegister,
  postStudentLogout
} = require('../controllers/auth');

const isAuth = require('../middleware/is-auth');

router.get('/', getStudentLogin);
router.post('/', postStudentLogin);

router.get('/register', getStudentRegister);
router.post('/register', postStudentRegister);

router.get('/booking', isAuth, studentController.getBooking);
router.post('/booking', isAuth, studentController.postBooking);

router.get('/success', isAuth, studentController.getSuccessPage);

router.post('/logout', postStudentLogout);

module.exports = router;
