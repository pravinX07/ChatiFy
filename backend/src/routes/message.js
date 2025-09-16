import express from "express";
import { getAllContacts, getMessageByUserID, sendMessage,getAllChatParteners } from "../controllers/message.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express();

router.use(protectRoute)

router.get("/contacts",  getAllContacts);
router.get("/chats",getAllChatParteners)
router.get("/:id", getMessageByUserID);

router.post("/send/:id", sendMessage);

export default router;
