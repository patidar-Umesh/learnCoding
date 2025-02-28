import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { sendPasswordResetToken } from "../apiServices/apiHandler/authAPI"
import Input from "../components/common/Input"
import Button from "../components/common/Button"

function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  
  const { loading } = useSelector((state) => state.auth)

  // send token handler
  const tokenHanlder = (e) => {
    e.preventDefault()
    dispatch(sendPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form >
            {!emailSent && (
                <Input
                  label=" Email Address"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  astrick='true'
                  placeholder="Enter email address"
                />
            )}
            
            <Button
              type="submit"
              onClick={tokenHanlder}
              className='bg-yellow-50 mt-4 w-full'
              btnText={`${emailSent ? "Resend Email" : "Send Email"}`}
            />

          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage