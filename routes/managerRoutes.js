const express = require('express');
const router = express.Router();
const { login, logout, protect } = require('../controllers/authController');
const { deleteManager, updateManager, getManagerById, createManager, getManagers } = require('../controllers/managerController');

// Auth Routes
router.post("/login", login);
router.post("/logout", logout);

// Manager Routes
router.post('/create', createManager);
router.get('/get', protect, getManagers);
router.get('/get/:id', protect, getManagerById);
router.put('/update/:id', protect, updateManager);
router.delete('/delete/:id', protect, deleteManager);

module.exports = router;
