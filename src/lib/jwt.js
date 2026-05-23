const jwt = require("jsonwebtoken");

function sign(token, isLongTime = false) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 120 * (isLongTime ? 420 : 120);

  return jwt.sign(token, process.env.JWT_SECRET_KEY, {
    expiresIn: exp,
    algorithm: "HS256",
  });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    return null;
  }
}

module.exports = {
  sign,
  verify,
};
