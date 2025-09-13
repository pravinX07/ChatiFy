import express from "express"

const router = express.Router();

router.get("/signup",(req,res)=>{
    res.json({
        message:"This is sign up route"
    })
})

router.get("/signin",(req,res)=>{
    res.json({
        message:"This is sign in route"
    })
})


router.get("/logout",(req,res)=>{
    res.json({
        message:"This is logout route"
    })
})





export default router

