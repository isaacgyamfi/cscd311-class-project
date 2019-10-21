const router = require('express').Router();

const studentController = require('../controllers/student');
const studentAuthController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

router.get('/', studentAuthController.getStudentLogin);
router.post('/', studentAuthController.postStudentLogin);

router.get('/register', studentAuthController.getStudentRegister);
router.post('/register', studentAuthController.postStudentRegister);

router.get('/booking', isAuth, studentController.getBooking);
router.post('/booking', isAuth, studentController.postBooking);

router.get('/success', isAuth, studentController.getSuccessPage);

router.post('/logout', studentAuthController.postStudentLogout);

module.exports = router;
