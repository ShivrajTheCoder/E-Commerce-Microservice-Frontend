import { RootState } from '@/store/reducers';
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
    const user = useSelector((state: RootState) => state.user);
    console.log(user,"this is the user");
    const { items } = useSelector((state: RootState) => state.cart);
    // console.log(items.length, "front the header")
    const isAdmin = user.isAdmin;
    const isLoggedIn=user.isLoggedin;
    // console.log(user, "user sate");
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <nav className='flex mx-10 my-2'>
            <Link className=' font-extrabold font-mono text-2xl' href="/home">Online.Shopping</Link>
            <div className='mx-10 flex justify-center items-center '>
                {
                    isAdmin &&
                    <>
                        <Link href={"/admin/adminpanel"} className=' text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Admin Panel</Link>
                        <Link href={"/admin/adauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Auction</Link>
                    </>
                }
                {
                    !isAdmin && <Link href={"/auction/ongoingauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Auction</Link>
                }
                {/* temporary link*/}
                {/* <Link href={"/admin/adauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Admin Auction</Link> */}
                {/* <Link href={"/admin/adminpanel"} className=' text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Admin Panel</Link> */}
                <Link href={"/auction/ongoingauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Ongoing Auction</Link>
                <Link href={"/user/myorders"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>My Orders</Link>
            </div>
            <div className='ml-auto mx-2 flex'>
                <Link href="/user/cart" className='flex'><AiOutlineShoppingCart size={30} style={{ color: "#03045e" }} />{
                    items.length > 0 &&
                    <span className='bg-red-500 text-white  rounded-full h-fit w-fit px-2'>{items.length}</span>
                }
                </Link>
                {
                    !isLoggedIn && 
                    <Link href="/" className='mx-3 flex justify-center'>
                        <BsFillPersonFill size={30} className="text-[#03045e]" />
                        <span className='text-xl font-semibold text-[#03045e]'>Account</span>
                    </Link>
                }
                { isLoggedIn && <div className="relative">
                    <button onClick={toggleDropdown} className='mx-3 flex justify-center'>
                        <BsFillPersonFill size={30} className="text-[#03045e]" />
                        <span className='text-xl font-semibold text-[#03045e]'>Account</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                            {/* Add your dropdown links here */}
                            <Link href="/user/myorders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                            <Link href="/user/myaucorders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Auction Orders</Link>
                            <Link href="/user/accountdetails" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                            
                        </div>
                    )}
                </div>}
            </div>
        </nav>
    )
}
