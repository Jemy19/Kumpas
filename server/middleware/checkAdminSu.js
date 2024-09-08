const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path as necessary

const checkAdminOrSuperAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user in the database using the decoded user ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }
    // Check if the user has either admin or superadmin role
    if (user.role === 'admin' || user.role === 'super_admin') {
      // Attach user info to req.user
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      next(); // Continue to the next middleware or route handler
    } else {
      return res.status(403).json({ message: 'Forbidden, admin or superadmin role required' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

module.exports = checkAdminOrSuperAdmin;
