const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUploads');
const authMiddleware = require('../utils/authMiddleware');

const AuthController = require('../controllers/auth.controller');

router.post('/register', imageUpload.single('avatar'), AuthController.registration);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.delete('/logout', authMiddleware, AuthController.logout);

module.exports = router;