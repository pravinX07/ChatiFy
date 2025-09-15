import express from "express"

const router = express();


router.get("/contacts",getAllContacts)
// router.get("/chats",getAllChatParteners)
// router.get("/:id",getMessageByUserID)

// router.post("/send/:id",sendMessage)

router.get("/",(req,res)=>{
    res.json({
        message:"this is message route"
    })
})


export default router