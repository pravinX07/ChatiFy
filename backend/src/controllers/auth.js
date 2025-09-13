import bcrypt from "bcryptjs";
import User from "../models/User.js"
// import becrypt from "bcryptjs"
import { generateToken } from "../utils/jwt.js";
export const signup = async(req,res) => {
   const {fullName, email, password} = req.body;

   try {
     if(!fullName || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
     }

     if(password.length < 6){
         return res.status(400).json({
            message:"Password must be at least 6 characters "
        })
     }

     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
     if(!emailRegex.test(email)){
         return res.status(400).json({
            message:"Invalid email format"
        })
     }
     const user = await User.findOne({email});
     if(user){
        return res.status(400).json({
            message:"email already exist"
        })
    }

    const hasedPass = await bcrypt.hash(password,10);
    const newUser = new User({
        fullName,
        email,
        password:hasedPass
    })

    if(newUser){
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            
        })
    }else{
        res.status(400).json({
            message:"Invalid user data or user sign up failed"
        })
    }

   } catch (error) {
    
  console.log("Error in signup route ", error);
  res.status(500).json({
    message:'Internal server error'+ error.message
  })
   }
}