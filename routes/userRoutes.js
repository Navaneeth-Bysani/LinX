const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/confirmSignUp', authController.confirmSignUp);
router.post('/resendCode', authController.resendCode);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/getUser/:username', userController.getUser);
module.exports = router;