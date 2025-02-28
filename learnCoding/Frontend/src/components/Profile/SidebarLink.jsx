import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../store/slices/courseSlice.js"



export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (

    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-2 sm:px-8 py-2 text-sm  font-medium ${
        matchRoute(link.path)
          ? "sm:bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] sm:bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      
      <div className="flex text-[.8rem] sm:text-[1rem] items-center  gap-x-2">
        <Icon className="text-lg hidden sm:block" />
        <span>{link.name}</span>
      </div>

    </NavLink>
  )
}