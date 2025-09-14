import { resendCleint, sender } from "../utils/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js" 
export const sendWelcomeEmail = async(sendWelcomeEmail,name,clientURL)=>{
    const {data, error} = await resendCleint.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to Chatify!",
        html:createWelcomeEmailTemplate(name,clientURL)
    })

    if(error){
        console.error("Error sending welcome email",error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email send successfully", data);
    
}