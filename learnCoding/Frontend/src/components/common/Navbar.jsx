import React, { useEffect, useState} from 'react'
import { Link, NavLink,  } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import {IoIosArrowDropdownCircle} from "react-icons/io"
import Button from '../common/Button.jsx'
import { apiConnector } from '../../apiServices/apiConnector.js'
import { contactusEndpoint } from '../../apiServices/apis.js'
import UserProfileDropdown from '../Auth/UserProfileDropDown.jsx'

const Navbar = () => {

    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.profile)
    const {total, totalItems} = useSelector(state => state.cart)

    const [category, setCategory] = useState([])
    console.log('category', category);


    // make api calls for category

    useEffect(()=>{

       const getCategory = async () =>{
            try {
                let result = await apiConnector('GET', contactusEndpoint.COURSE_CATEGORIES_API)
                result =   JSON.stringify(result)
                console.log(`categories is ${result.data} `);
                setCategory(result.data)
                
            } catch (error) {
                console.log(`Catogory not fetched ${error}`);
            }
        }
        getCategory()

    }, [])

  
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-richblack-700 shadow-lg">
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* Left logo / name  */}
      <Link to="/">
        {/* <img src='' width={160} height={42} loading='lazy'/> */}
        <h1 className='text-white'>LearnCoding</h1>
      </Link>

      {/* center links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 h-[100px] lg:w-[300px] space-y-2 z-30'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    category && (
                                            category.map( (cate, index) => (
                                                <Link to='/webdev' key={index}>
                                                    <p>{cate.name}</p>
                                                </Link>
                                            ) )
                                    ) 
                                }

                                </div>

                            </div>

                        ) : (
                            <NavLink  to={link?.path}>
                                {/* {`${ matchRoute(link?.path) ? "text-yellow-25" : */}
                                <p className='text-richblack-25'>
                                    {link.title}
                                </p>
                                
                            </NavLink>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


        {/* Right-  Login/SignUp/Dashboard */}

        <div className='flex gap-x-4 justify-center items-center'>

            {
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart className='text-white text-[1.5rem]' />
                        {
                            total > 0 && (
                                <span className='absolute bottom-0 top-[-13px] right-[5px] text-[12px]  text-yellow-100'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <>
                    {/* Login button */}
                        <Button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md' btnText='Log in' linkTo='/login'/>

                    {/* signup button */}
                        <Button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md' btnText='Sign Up' linkTo='/signup'/>
                    </>
                )
            }
            
            {
                token !== null && <UserProfileDropdown />
            }
            
        </div>


      </div>
    </div>
    </div>
  )
}

export default Navbar
