const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const requireRole = require('../middleware/requireRole');

// Routes for managing admin accounts
router.post('/admin', requireRole('super_admin'), adminController.createAdmin);
router.get('/admins', requireRole('super_admin'), adminController.getAllAdmins);
router.delete('/admin/:id', requireRole('super_admin'), adminController.deleteAdmin);

module.exports = router;
