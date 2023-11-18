const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUploads');
const authMiddleware = require('../utils/authMiddleware');

const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);
router.post('/ads', imageUpload.single('photo'), authMiddleware, AdsController.post);
router.put('/ads/:id', imageUpload.single('photo'), authMiddleware, AdsController.put);
router.delete('/ads/:id', authMiddleware, AdsController.delete);

module.exports = router;