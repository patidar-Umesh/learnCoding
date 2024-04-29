import jwt from 'jsonwebtoken'

const verifyJWT = async (req, res, next) => {

    try {
            // fetch token 
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '')
        // console.log(`Token is  ${token}` )

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
        if(req.user.accountType !== 'Student'){
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
        if(req.user.accountType !== 'Instructor'){
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
        console.log('jwt verify ',req.user.accountType )
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: ' This your are not athorized for this route'
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