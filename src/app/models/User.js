// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }
  );

  // User.prototype.checkPassword = function(password) {
  //   return bcrypt.compare(password, this.password_hash);
  // };

  // User.prototype.generateToken = function() {
  //   return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  // };

  return User;
};
