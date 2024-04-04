import mongoose from "mongoose";
import mailSender from "../utils/nodemailer.js";
import { otpTemplate } from "../mail/templates/emailVerificationTemplate.js";



const otpSchema = new mongoose.Schema({

  email: {
    type: String,
    // required: true
  },

  otp: {
    type: String,
    // required: true
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5*60
  },


  });


// create function for confirmation mail

const sendConfirmationMail = async (email, otp) => {
  try {

    const mail = await mailSender(email, 'Verification mail from learnCoding', otpTemplate(otp))
    console.log('Successfully send mail', mail)

  } catch (error) {
    console.log('error getting when send mail', error)
  }
}


otpSchema.pre('save', async function (next) {

  await sendConfirmationMail(this.email, this.otp)
  next()
})





export const Otp = mongoose.model('Otp', otpSchema)