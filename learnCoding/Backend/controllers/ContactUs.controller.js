import { contactUsEmail } from "../mailTemplates/contactForm.js" 
import mailSender from '../utils/nodemailer.js'

 const contactUsEmailSender = async (req, res) => {
 
  try {
     // fetach all data
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  
    const sendEmail = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Send email response is ", sendEmail)

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error message :", error)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}

export {contactUsEmailSender}