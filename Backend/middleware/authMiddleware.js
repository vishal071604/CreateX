const jwt = require("jsonwebtoken");
// Middleware to protect routes
const protect = (req, res, next) => {
  try {
    // Get Authorization header
    // Example: "Bearer eyJhbGciOi..."
    const authHeader = req.headers.authorization;

    // Check if token is present
    if (!authHeader) {
      return res.status(401).json({
        message: "Please login",
      });
    }

    // Get only the token
    // "Bearer TOKEN" → "TOKEN"
    const token = authHeader.split(" ")[1];

    // Verify whether token is valid
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get user ID from decoded token
    req.userId = decoded.userId;

    // Token is valid → continue to controller
    next();

  } catch (error) {
    // Token is invalid or expired
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;