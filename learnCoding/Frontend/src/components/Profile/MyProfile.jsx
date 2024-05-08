import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { dateFormatter } from "../../utils/dateFormatter"
import IconBtn from "../common/IconBtn"
import {useSelector} from 'react-redux'
import { useEffect } from "react"
import Button from "../common/Button"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)


useEffect(()=>{

})

  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex sm:order-1 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-3 sm:p-8 px-3 sm:px-12">
        <div className="flex items-center gap-x-1 sm:gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] sm:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <Button
          btnText="Edit"
          className=' bg-yellow-50 '
          onClick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </Button>
      </div>

      {/* about section */}
      <div className="my-10 flex flex-col justify-center items-center gap-y-2 sm:gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800  py-3 sm:p-8 px-3 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <Button
            btnText="Edit"
            className='bg-yellow-50'
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </Button>
        </div>
        <div
          className={`${
            user?.data?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium text-left w-full`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </div>
      </div>

      {/* personal details section */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <Button
            btnText="Edit"
            className='bg-yellow-50'
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </Button>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div className="text-[10px]">
              <p className="mb-2  text-richblack-600">First Name</p>
              <p className="sm:text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {dateFormatter(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}