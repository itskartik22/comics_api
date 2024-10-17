const jwt = require("jsonwebtoken")
const Manager = require("../models/managerModel");
const { comparePassword } = require("../utils/comparePassword");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 2000,
  sameSite: "strict",
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password.",
      });
    }
    const manager = await Manager.findOne({
      email,
    });
    if (!manager) {
      throw new Error("User not found!");
    }
    const passwordMatch = await comparePassword(password, manager.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password!");
    }
    manager.password = undefined;

    //jwt token
    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE, // Token valid for 1 hour
    });

    res.cookie("jwt_token", token);
    res.status(200).json({
      status: "success",
      manager,
      token,
      message: "Login successful.",
    });
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt_token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logout successful.",
  });
};

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt_token) {
            token = req.cookies.jwt_token;
        }
        if (!token) {
            throw new Error("You are not logged in! Please login to get access.");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select("-password -__v -createdAt");
        if (!manager) {
            throw new Error("The user belonging to this token does no longer exist.");
        }
        req.manager = manager;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            message: error.message,
        });
    }
}

module.exports = {
  login,
  logout,
  protect
};
