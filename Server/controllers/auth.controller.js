// import all require package and files
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from 'cookie-parser'

//sendOTP

const sendOTP = async (req, res) => {
  try {
    // fetch email form body
    const { email } = req.body;

    // check email in db
    const existEmail = await User.findOne({ email: email });
    console.log(`exist email in db is ${email}`);

    // send res if email exist
    if (existEmail) {
      res.status(401).json({
        Success: false,
        Message: "User already registred with this email",
      });
    }

    // generate otp
    const generatedOTP = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    console.log(`Generated OTP is ${generatedOTP}`);

    // check otp in db
    let existOTP = await Otp.findOne({ otp: generatedOTP });

    while (existOTP) {
      generatedOTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      existOTP = await Otp.findOne({ otp: generatedOTP });
    }

    // save email and OTP in DB
    let savedOTPEmail = await Otp.create({ email: email, otp: generatedOTP });
    console.log(`Saved data is ${savedOTPEmail}`);

    // send res
    res.status(200).json({
      Success: true,
      Message: "OTP Generate Successfully",
    });
  } catch (error) {
    console.log(`OTP is not gererated ${error}`);
    res.status(500).json({
      Success: false,
      Message: `OTP is not gererated ${error}`,
    });
  }
};

//signUp
const singUp = async (req, res) => {
  try {
    // fetch all data from body
    const {
      firstName,
      email,
      password,
      confirmPassword,
      otp,
      accountType,
      gender,
      contactNubmer,
      about,
      dateOfBirth,
    } = req.body;

    // validate data
    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType ||
      !gender ||
      contactNubmer ||
      !dateOfBirth ||
      !about
    ) {
      return res.status(403).json({
        Success: false,
        Message: `All field is required`,
      });
    }

    // check password and confirmpassword are same
    if (password !== confirmPassword) {
      return res.status(400).json({
        Success: false,
        Message: `Password and ConfirmPassword  should be same`,
      });
    }

    // check user in db
    const existedUser = await User.findOne({ email: email });
    console.log(`existedUser is ${existedUser}`);

    if (existedUser) {
      return res.status(400).json({
        Success: false,
        Message: `This User is already registred with ${existedUser}`,
      });
    }

    // check recent OTP
    const recentOTP = await Otp.findOne({ otp: otp, email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(`Recent OTP is ${recentOTP}`);

    if (recentOTP.length === "") {
      return res.status(400).json({
        Success: false,
        Message: `OTP not found `,
      });
    } else if (recentOTP.otp !== otp) {
      return res.status(400).json({
        Success: false,
        Message: `Invalid OTP `,
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(`hash password is ${hashPassword}`);

    // create user
    const user = await User.create({
      firstName,
      email,
      password: hashPassword,
      confirmPassword,
      otp,
      accountType,
      gender,
      contactNubmer,
      about,
      dateOfBirth,
    });

    // check user created or not
    const createdUser = await User.findById(user._id).select("-password");

    return res.status(200).json({
      Success: true,
      CreatedUser: createdUser,
      Message: `User created Successfully`,
    });
  } catch (error) {
    console.log(`User is not registered, Please try again ${error}`);
    return res.status(500).json({
      Success: true,
      Message: `User is not registered, Please try again `,
    });
  }
};

//Login

const login = async (req, res) => {
  try {
    // fetch data from body
    const { email, password } = req.body;

    // validate data
    if (!email && !password) {
      return res.status(400).json({
        Success: false,
        Message: "email or password is required",
      });
    }

    // check data in db
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        Success: false,
        Message: "user not exist",
      });
    }

    // compare password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({
        Success: false,
        Message: "Invalid password",
      });
    }

    // Generate jwt token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.accountType,
    };

    const token = jwt.sign(
      payload, 
      process.env.ACCESS_TOKEN_SECRET, 
      {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    console.log(`Generated Token is ${token}`)

    const loggedUser = await User.findById(user._id).select('-password')

    // create cookie 
    const options = {
      expires: new Date(Date.now() + 3*24*60*60*1000 ),
      httpOnly: true
    }
    return res.cookie('token', token, options).status(200).json(
      {
        Success: true,
        token,
        loggedUser,
        Message: ' User loggedIn Successfully '
      }
    )
    

  } catch (error) {
    console.log(`user not logged in ${error}`)
    return res.status(500).json(
      {
        Success: false,
        Message: ' User not login '
      }
    )
}
};


//changePassword

// export all function

export { sendOTP, singUp , login}
