const router = require('express').Router();

const {
  getAdminAddRoom,
  postAdminAddRoom,
  getReport
} = require('../controllers/admin');

const {
  getAdminLogin,
  getAdminRegister,
  postAdminLogin,
  postAdminRegister
} = require('../controllers/auth');

const isAdminAuth = require('../middleware/is-admin-auth');

router.get('/', getAdminLogin);
router.post('/', postAdminLogin);
router.get('/register', getAdminRegister);
router.post('/register', postAdminRegister);

router.get('/add-room', isAdminAuth, getAdminAddRoom);
router.post('/add-room', isAdminAuth, postAdminAddRoom);
router.get('/report', isAdminAuth, getReport);

module.exports = router;
