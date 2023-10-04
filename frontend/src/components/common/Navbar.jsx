import React from 'react'
import { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { BsChevronDown, BsFillPersonFill } from "react-icons/bs"
import {AiOutlineMenu, AiOutlineShoppingCart} from 'react-icons/ai'
import { useSelector } from "react-redux"
import logo from "../../assets/Logo/logo.png"
import { fetchProductCategories } from '../../services/operations/categoryApi'
import { NavbarLinks } from "../../data/navbar-links"

import { ROLE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

const Navbar = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const {cart} = useSelector((state) => state.cart)
    const totalCartProduct = cart.length;

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation();

    useEffect(() => {
        // Calling fetchCourseDetails fucntion to fetch the details
        ;(async () => {
            setLoading(true);
            try {
                const res = await fetchProductCategories();
                setSubLinks(res);
            } catch (error) {
                console.log(error);
                console.log("Could not fetch category")
            }
            setLoading(false);
        })()
    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='w-full flex h-[95px] items-center justify-center shadow '>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Image */}
                <Link to="/">
                    <img src={logo} alt='logo' width={240} height={70} loading='lazy' className='mb-4'/>
                </Link>

                <nav className='hidden md:flex'>
                    <ul className='flex gap-x-6 text-black font-sans font-light'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "All Categories" ? 
                                        (
                                            <>
                                                <div
                                                    className={`group relative flex cursor-pointer items-center gap-1 `}
                                                    >
                                                    <p>{link.title}</p>
                                                    <BsChevronDown />
                                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] shadow-2xl flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-secondColor p-4 text-black opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-[#FFCE67]"></div>
                                                        {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                        ) : subLinks.length ? (
                                                        <>
                                                            {subLinks
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                to={`/category/`}
                                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-[#FDEDCA]"
                                                                key={i}
                                                                >
                                                                <p>{subLink.categoryName}</p>
                                                                </Link>
                                                            ))}
                                                        </>
                                                        ) : (
                                                        <p className="text-center ">No Category Found</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </> 
                                        ) : 
                                        (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-primaryColor" : "text-black"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }

                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='hidden gap-x-4 items-center md:flex'>
                    {user && user?.role !== ROLE.ADMIN && (
                        <Link to="/dashboard/cart" className="relative">
                        <div className='relative'>
                            {/* <span className='absolute bottom-2 left-4 px-2 py-1 text-primaryColor rounded-full'>{totalCartProduct}</span> */}
                            <AiOutlineShoppingCart className="text-3xl text-black" />
                            {totalCartProduct > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-secondColor text-center text-xs font-bold">
                                {totalCartProduct}
                                </span>
                            )}
                        </div>
                        {1 > 0 && (
                            <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            </span>
                        )}
                        </Link>
                    )}

                    {token == null && (
                        <Link to="/login">
                            <button className='flex border border-shadowColor items-center gap-x-2 shadow-lg shadow-shadowColor bg-white px-[20px] py-[10px] text-primaryColor rounded-md'>
                                <BsFillPersonFill className='text-xl'/> Log in
                            </button>
                        </Link>
                    )}
                    {token == null && (
                        <Link to="/signup">
                            <button className='flex border border-shadowColor items-center gap-x-2 shadow-lg shadow-shadowColor bg-white px-[20px] py-[10px] text-primaryColor rounded-md'>
                                <BsFillPersonFill className='text-xl'/> Sign Up
                            </button>
                        </Link>
                    )}

                    {token !== null && <ProfileDropdown />}
                </div>
                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={30} fill="#AFB2BF" />
                </button>
            </div>
        </div>
    )
}

export default Navbar