const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../Errors");

const auth = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.chat = { senderID: payload.senderID, receiverID: payload.receiverID };
    next()
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

module.exports = auth