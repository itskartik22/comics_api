const express = require('express');
const router = express.Router();
const { createComic, getComics, getComicById, updateComic, deleteComic } = require('../controllers/comicController');
const { protect } = require('../controllers/authController');

// Comic Book Routes
router.post('/create', protect, createComic);
router.get('/get', getComics);
router.get('/get/:id', protect, getComicById);
router.put('/update/:id', protect, updateComic);
router.delete('/delete/:id', protect, deleteComic);

module.exports = router;
