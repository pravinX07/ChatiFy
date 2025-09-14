import express from "express"
import { signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup",signup)

// router.get("/signin",)


router.get("/logout",(req,res)=>{
    res.json({
        message:"This is logout route"
    })
})





export default router

