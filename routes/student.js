const router = require('express').Router();

const studentController = require('../controllers/student');

router.get('/', studentController.getLogin);
router.post('/', studentController.postLogin);

router.get('/register', studentController.getRegister);
router.post('/register', studentController.postRegister);

router.get('/booking', studentController.getBooking);
router.post('/booking', studentController.postBooking);

module.exports = router;
