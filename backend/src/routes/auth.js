import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile",protectRoute, updateProfile)

router.get("/check",protectRoute,(req,res)=>res.status(200).json({message:"User is authenticated"}, req.user))






export default router;
