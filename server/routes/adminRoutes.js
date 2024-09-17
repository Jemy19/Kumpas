const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const requireRole = require('../helpers/requireRoles');
const authMiddleware = require('../middleware/authMiddleware'); // Import your authentication middleware

// Routes for managing admin accounts
router.post('/admin', authMiddleware, requireRole('super_admin'), adminController.createAdmin);
router.get('/admins', authMiddleware, requireRole('super_admin'), adminController.getAllAdmins);
router.delete('/admin/:id', authMiddleware, requireRole('super_admin'), adminController.deleteAdmin);
router.put('/admins/:id', authMiddleware, requireRole('super_admin'), adminController.updateAdmin);
router.get('/logs', authMiddleware, requireRole('super_admin'), adminController.logs);
router.get('/getfeedback', authMiddleware, requireRole('super_admin'), adminController.getfeedback);
module.exports = router;
