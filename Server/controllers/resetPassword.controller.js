import { User } from "../models/user.model.js";
import mailSender from "../utils/nodemailer";

//forgotPasswordToken
const forgotPasswordToken = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // validate email in db
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: " User not found",
      });
    }

    // generate token using crypto
    const token = crypto.randomUUID();
    console.log(`toekn is ${token}`);

    // store token and expiry in db
    const updateInfo = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        forgotPasswordExpire: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );
    console.log(`update info is ${updateInfo}`);

    // send email
    const url = `http://localhost:3000/update-password/${token}`;

    const mail = await mailSender(
      email,
      "Password reset link",
      `Please click on this link for change password ${url}`
    );
    console.log(`email response is ${mail}`);

    // res
    return res.status(200).json({
      success: true,
      message: "email send successfully for change password",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: " Something wrong while change reset password",
    });
  }
};

//resetPassword
const resetPassword = async (req, res) => {
  try {
    // fetch data
    const { token, password, confirmPassword } = req.body;

     //check user in db with token
     const userDetails = await User.findOne({ token: token });

     //check user in db
     if (!userDetails) {
       return res.status(400).json({
         success: false,
         message: "Token is invalid",
       });
     }

    //validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both password shoulb be same",
      });
    }

   

    //token time check
    if (userDetails.forgotPasswordExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token is expired, please regenerate your token",
      });
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // update password in db
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashPassword,
      },
      { new: true }
    );

    //res
    return res.status(200).json({
      success: true,
      message: "Password reset Successful",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { forgotPasswordToken, resetPassword };
