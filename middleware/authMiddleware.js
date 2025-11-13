const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY; // Using environment variable
require('dotenv').config();

// Logging the JWT key for debugging
console.log("JWT_KEY from env:", secretKey);
const authMiddleware = {
    // authenticateToken middleware to ensure JWT token is verified
authenticateToken: (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user;  // Attach user info (user_id) to the request
    next();
  });
},

authenticateTokenCustomer: (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // "Bearer <token>"

  // Log the token for debugging
  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  // Verify the token using jwt.verify
  jwt.verify(token, secretKey, (err, customer) => {
    if (err) {
      console.log("Token verification error:", err);  // Log the error for debugging
      return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
    
    // Attach the decoded customer info to the request object
    req.customer = customer;
    console.log("Decoded customer data:", customer);  // Log decoded customer data for debugging

    next();  // Proceed to the next middleware or route handler
  });
},

  };
  



module.exports = authMiddleware;
