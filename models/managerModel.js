const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Manager must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Manager must have an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Manager must have a password"],
    trim: true,
  },
  role: {
    type: String,
    default: "manager",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
