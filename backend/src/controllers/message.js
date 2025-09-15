import User from "../models/User";

export const getAllContacts = async(req,res) => {
try {
    
    const loggedUser = req.user._id;
    const filterUsers = await User.find({_id:{}})
} catch (error) {
    
}
}