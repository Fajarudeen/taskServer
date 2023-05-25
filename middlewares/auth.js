const User = require("../models/userauth");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = await jwt.verify(token, "1234");
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token error",
    });
  }
};
