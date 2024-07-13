const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const requireRole = require('../helpers/requireRoles');
const authMiddleware = require('../middleware/authMiddleware'); // Import your authentication middleware
const cors = require('cors');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
);

// Routes for managing admin accounts
router.post('/admin', authMiddleware, requireRole('super_admin'), adminController.createAdmin);
router.get('/admins', authMiddleware, requireRole('super_admin'), adminController.getAllAdmins);
router.delete('/admin/:id', authMiddleware, requireRole('super_admin'), adminController.deleteAdmin);

module.exports = router;
