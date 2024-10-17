const bcrypt = require("bcryptjs");
const comparePassword = async (password, hashPassword) => {
  const valid = await bcrypt.compare(password, hashPassword)
  return valid;
};

module.exports = {
  comparePassword,
};
