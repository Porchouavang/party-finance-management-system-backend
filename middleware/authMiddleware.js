require('dotenv').config();         // load .env at the top

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

console.log("JWT_KEY:", secretKey);

const authMiddleware = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token is missing" });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      req.user = user; // attached decoded user info
      next();
    });
  },
};

module.exports = authMiddleware;
