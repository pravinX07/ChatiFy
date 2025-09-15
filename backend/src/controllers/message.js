import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../utils/cloudinary";
import { json } from "express";

export const getAllContacts = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("error in getAllContacts", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMessageByUserID = async(req,res)=> {
    try {
        
        const myId = req.user._id;
        const {id:userToChatId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderId:myId,recieverId:userToChatId},
                {senderId:userToChatId,recieverId:myId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {

        console.log("Error in getMessage By user id", error);

        res.status(500).json({message:"Internal server error ", error})
        
    }
}


export const sendMessage = async(req,res)=>{
    try {
        
        const {text,image} = req.body;
        const {senderId} = req.user._id;
        const {id:recieverId} = req.params;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        })
        await newMessage.save();


        // todo : send message in real time if user is online 

        res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in send message By user id", error);

        res.status(500).json({message:"Internal server error ", error})
    }
}


export const getAllChatParteners = async(req,res) => {
    try {
        
        const loggedInUserId = req.user._id;

        //find all the message where the  loggedin user is either sender or reciver

        const message = await Message.find({
            $or:[
                {senderId:loggedInUserId},{recieverId:loggedInUserId}
            ]
        })

        const chatPartnerIds = [
            ...new Set(
                message.map((msg) =>{
                    msg.senderId.toString === loggedInUserId.toString() 
                     ? msg.recieverId.toString()
                     : msg.senderId.toString()
                })
            )
        ];

        const chatPartners = await User.find({_id: { $in: chatPartnerIds}}).select(".password");

        res.status(200).json(chatPartners)
    } catch (error) {
        console.error("Error in getChaetpartners", error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}