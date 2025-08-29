const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // attach decoded data (id, role, etc.) to request object

    next(); // proceed to next route/controller
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Unauthorized', error: err.message });
  }
};
