import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // in authheader we get the token from the client
    // Bearer <token>
    const token = authHeader && authHeader.split(' ')[1]; // split the token and bearer and get the token only 

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET); //verify the token with the secret key and get the decoded payload
    // decoded will have the userId and iat and exp
    const user = await User.findById(decoded.userId).select('-password'); 
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};



export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }
    next();
  };
};