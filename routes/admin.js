const router = require('express').Router();

const {
  getAdminAddRoom,
  getAdminLogin,
  getAdminRegister,
  getReport,
  postAdminAddRoom,
  postAdminLogin,
  postAdminRegister
} = require('../controllers/admin');

router.get('/report', getReport);
router.get('/', getAdminLogin);
router.post('/', postAdminLogin);
router.get('/register', getAdminRegister);
router.post('/register', postAdminRegister);
router.get('/add-room', getAdminAddRoom);
router.post('/add-room', postAdminAddRoom);

module.exports = router;
