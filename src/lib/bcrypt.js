const bcrypt = require("bcrypt");

const hash = (string) => {
  return bcrypt.hash(string, Number(process.env.HASH_SALT) || 10);
};

const compare = (string, hashedPassword) => {
  return bcrypt.compare(string, hashedPassword);
};

module.exports = {
  hash,
  compare,
};
