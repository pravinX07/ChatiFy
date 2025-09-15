import bcrypt from "bcryptjs";
import User from "../models/User.js";
// import becrypt from "bcryptjs"
import { generateToken } from "../utils/jwt.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters ",
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already exist",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPass,
    });

    if (newUser) {
      // generateToken(newUser._id, res);
      // await newUser.save();

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.error("Error to send welcome error", error);
      }
    } else {
      res.status(400).json({
        message: "Invalid user data or user sign up failed",
      });
    }
  } catch (error) {
    console.log("Error in signup route ", error);
    res.status(500).json({
      message: "Internal server error " + error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    // never tell the client which one is incorrect : password or email;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.cookie(200).json({ message: "Logout successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return resizeBy.status(400).json({
        message: "Profile pic is required",
      });

    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const uploadUser = await User.findOneAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(uploadUser);
  } catch (error) {
    console.log("Error un update profile ", error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
