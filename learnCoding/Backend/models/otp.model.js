import mongoose from "mongoose";
import mailSender from "../utils/nodemailer.js";
import { otpTemplate } from "../mailTemplates/emailVerificationTemplate.js";



// const otpSchema = new mongoose.Schema({

//   email: {
//     type: String,
//     // required: true
//   },

//   otp: {
//     type: String,
//     // required: true
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now(),
//     expires: 5*60*100
//   },


//   });


// // create function for confirmation mail

// const sendConfirmationMail = async (email, otp) => {
//   try {

//     const sentEmail = await mailSender(email, 'Verification mail from learnCoding', otpTemplate(otp))
//     console.log('Successfully send mail', sentEmail)

//   } catch (error) {
//     console.log('error getting when send email', error)
//   }
// }


// otpSchema.pre('save', async function (next) {

//   await sendConfirmationMail(this.email, this.otp)
//   next()
// })





// export const Otp = mongoose.model('Otp', otpSchema)