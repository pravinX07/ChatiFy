import {Resend} from "resend"
import "dotenv/config"


export const resendCleint = new Resend(process.env.RESEND_API_KEY);


export const sender = {
    email: process.env.EMAIL,
    name: process.env.EMAIL_NAME
}