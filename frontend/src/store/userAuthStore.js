import {create} from "zustand"
import { axiosInstances } from "../lib/axios"

export const userAuthStore = create((set,get) => ({
 authUser:null,
 isCheckingAuth:true,
 isSigningUp:false,
 isLoggingIn:false,
 socket:null,
 onlineUsers:[],


 checkAuth:async()=>{
    try {
        const res = await axiosInstances.get("auth/check")
        set({authUser:res.data})
        get().connectSocket();
    } catch (error) {
        console.log("Error in auth Check: ",error);
        set({authUser:null})
        
    }finally{
        set({isCheckingAuth:false})
    }
 }
}))