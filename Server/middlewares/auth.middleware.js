import jwt from 'jsonwebtoken'
import {config} from 'dotenv'

const verifyJWT = async (req, res, next) => {

    try {
            // fetch token 
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '')
        console.log(`Token is ${token}`)

        // validate token
        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Unathorized user'
            })
        }


       try {
        // verify token
        const decodeToken =   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(`decode Token is ${decodeToken}`)
        req.user = decodeToken
       } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'Token is invalid'
        })
       }

       next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: ' Invalid access token'
        })
    }
}


//isStudent
const isStudent = (req, res, next) =>{
    try {
        // verify request
        if(req.body.accountType !== 'Student'){
            return res.status(401).json({
                success: false,
                message: ' This route only for Student'
            })
        }

        next()

    } catch (error) {
        console.log(`user not verify ${error}`)
        return res.status(401).json({
            success: false,
            message: ' Invalid user'
        })
    }
}


//isInstructor
const isInstructor = (req, res, next) =>{
    try {
        // verify request
        if(req.body.accountType !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: ' This route only for Instructor'
            })
        }

        next()

    } catch (error) {
        console.log(`user not verify ${error}`)
        return res.status(401).json({
            success: false,
            message: ' Invalid user'
        })
    }
}

//isAdmin
const isAdmin = (req, res, next) =>{
    try {
        // verify request
        if(req.body.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: ' This route only for Admin'
            })
        }

        next()

    } catch (error) {
        console.log(`user not verify ${error}`)
        return res.status(401).json({
            success: false,
            message: ' Invalid user'
        })
    }
}



export {verifyJWT, isStudent, isAdmin, isInstructor}