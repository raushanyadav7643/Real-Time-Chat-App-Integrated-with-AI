import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import { sendOTP } from "../lib/nodemailer.js";

// Signup a new user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
      isVerified: true
    });

    const token = generateToken(newUser._id);
    res.json({
      success: true,
      message: "Signup successful",
      userData: newUser,
      token
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Verify OTP
// Verify OTP (Deprecated since direct login is enabled)
export const verifyOTP = async (req, res) => {
  res.json({ success: false, message: "OTP verification is disabled. Please login directly." });
};

// Controller to login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);
    return res.json({ 
      success: true, 
      userData,
      token,
      message: "Login successful" 
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// Controller to update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    const currentProfilePic = req.user.profilePic;
    let uploadResponse = null;

    // Only upload to Cloudinary if it's a new base64 image (starts with 'data:image')
    if (profilePic && profilePic.startsWith('data:image')) {
      uploadResponse = await cloudinary.uploader.upload(profilePic);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profilePic: uploadResponse ? uploadResponse.secure_url : profilePic, 
        bio, 
        fullName: fullName || req.user.fullName 
      },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Update profile error:", error);
    res.json({ success: false, message: error.message });
  }
};
