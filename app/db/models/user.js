const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validators");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Email jest nieprawidłowy"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Hasło powinno posiadać minimum 8 znaków"],
  },
  refreshToken: String,
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
