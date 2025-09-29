import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./model.js";
import sendResponse from "../../utils/sendResponse.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const response = { status: 409, message: "Email exists" };
      return sendResponse(req, res, response);
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    const response = { status: 201, message: "Registered" };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const response = { status: 401, message: "Invalid credentials" };
      return response(req, res, response);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      const response = { status: 401, message: "Invalid password" };
      return response(req, res, response);
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "JWT_SECRET_KEY",{expiresIn:'30min'}
    );
    const response = {
      status: 200,
      token,
      message: { name: user.name, email: user.email,id:user._id },
    };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};
const getMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user= await User.findById(userId).select('-password');
    
    if (!user) {
      const response = { status: 404, message: "User not found" };
      return sendResponse(req, res, response);
    } 
    const response = { status: 200, message: user };
    return sendResponse(req, res, response);
  } catch (error) {
    const response = { status: 500, message: error.message };
    return sendResponse(req, res, response);
  }
};


const userController = { userRegister, userLogin,getMe};
export default userController;
