const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = function (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && (req.user.team || req.user.isResoSuperAdmin || req.user.isResoSocietyAdmin)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  });
};

const verifyToken = function (req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
    console.log(process.env.JWT_SEC);
    jwt.verify(token, process.env.JWT_SEC, function (err, user) {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).send({
          success: false,
          message: "Token Expired. Login again.",
          authenticated: false,
        });
      }

      req.user = user;
      console.log("Decoded User:", user);
      next();
    });
  } else {
    console.log("No Authorization Header");
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: "Session Expired. Please login again.",
    });
  }
};

const verifyTokenAndAuthorization = function (req, res, next) {
  verifyToken(req, res, function () {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
  });
};

module.exports = { isAdmin, verifyToken, verifyTokenAndAuthorization };
