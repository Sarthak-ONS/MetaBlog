const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authheader = req.get("Authorization");

  if (!authheader) {
    const error = new Error("Not Authenticated");
    error.httpStatusCode = 401;
    throw error;
  }

  const token = req.get("Authorization").split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (!decodedToken) {
      const error = new Error("Not Authenticated");
      error.httpStatusCode = 500;
      throw err;
    }
  } catch (error) {
    const e = new Error("Not Authenticated");
    e.httpStatusCode = 401;
    throw e;
  }

  req.userId = decodedToken.userId;
  next();
};
