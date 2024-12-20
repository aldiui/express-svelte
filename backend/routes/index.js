const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');
const { validateRegister, validateLogin } = require('../utils/validators/auth');

router.post('/register', validateRegister, registerController.register);
router.post('/login', validateLogin, loginController.login);
router.get('/admin/users', verifyToken, userController.findUsers);
router.post('/admin/users', verifyToken, userController.createUser);
router.get('/admin/users/:id', verifyToken, userController.findUserById);
router.put('/admin/users/:id', verifyToken, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, userController.deleteUser);

module.exports = router;