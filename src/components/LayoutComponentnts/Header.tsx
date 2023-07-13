import { RootState } from '@/store/reducers';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const { items } = useSelector((state: RootState) => state.cart);
  const isAdmin = user.isAdmin;
  const isLoggedIn = user.isLoggedin;
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='flex items-center justify-between md:mx-10 mx-2 my-2 '>
      <Link href='/home' className='md:font-extrabold font-bold font-mono md:text-2xl text-lg'>
        Online.Shopping
      </Link>
      <div className='md:flex justify-center items-center hidden ml-3 space-x-5'>
        {isAdmin && (
          <>
            <Link href='/admin/adminpanel' className='text-lg font-bold text-white bg-[#A3A4A1] rounded-3xl px-5 py-1'>
              Admin Panel
            </Link>
            <Link href='/admin/adauction' className='text-lg font-bold text-white bg-[#A3A4A1] rounded-3xl px-5 py-1'>
              Auction
            </Link>
          </>
        )}
        {!isAdmin && (
          <>
            <Link href='/auction/ongoingauction' className='text-lg font-bold text-white bg-[#A3A4A1] rounded-3xl px-5 py-1'>
              Auction
            </Link>
            <Link href='/auction/ongoingauction' className='text-lg font-bold text-white bg-[#A3A4A1] rounded-3xl px-5 py-1'>
              Ongoing Auction
            </Link>
            <Link href='/user/myorders' className='text-lg font-bold text-white bg-[#A3A4A1] rounded-3xl px-5 py-1'>
              My Orders
            </Link>
          </>
        )}
      </div>
      <div className='ml-auto flex items-center space-x-3'>
        <Link href='/user/cart' className='flex items-center'>
          <AiOutlineShoppingCart size={30} style={{ color: '#03045e' }} />
          {items.length > 0 && (
            <span className='bg-red-500 text-white rounded-full h-fit w-fit px-2'>{items.length}</span>
          )}
        </Link>
        {!isLoggedIn && (
          <Link href='/' className='flex items-center'>
            <BsFillPersonFill size={30} className='text-[#03045e]' />
            <span className='text-xl hidden md:flex font-semibold text-[#03045e]'>Account</span>
          </Link>
        )}
        {isLoggedIn && (
          <div className='relative'>
            <button onClick={toggleDropdown} className='flex items-center'>
              <BsFillPersonFill size={30} className='text-[#03045e]' />
              <span className='text-xl hidden md:flex font-semibold text-[#03045e]'>Account</span>
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 md:w-40 bg-white rounded-md shadow-lg z-10'>
                {/* Add your dropdown links here */}
                <Link href='/user/myorders' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  My Orders
                </Link>
                <Link href='/user/myaucorders' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  Auction Orders
                </Link>
                <Link href='/user/accountdetails' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  My Account
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
