const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies['sessionToken'];
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.id = decoded.id
  next()
}

module.exports = verifyToken;