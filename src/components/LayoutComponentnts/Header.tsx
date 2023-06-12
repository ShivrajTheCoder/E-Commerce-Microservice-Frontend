import { RootState } from '@/store/reducers';
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
export default function Header() {
    const user = useSelector((state: RootState) => state.user);
    console.log(user,"user sate");
    return (
        <nav className='flex mx-10 my-2'>
            <Link className=' font-extrabold font-mono text-2xl' href="/home">Online.Shopping</Link>
            <div className='ml-auto mx-2 flex'>
            <Link href="/home" className='mx-3 flex justify-center '><BsFillPersonFill size={30} style={{color:"#03045e"}}/><span className='text-xl  font-semibold text-[#03045e]'>Account</span></Link>
            <Link href="/user/cart" className='flex'><AiOutlineShoppingCart size={30} style={{color:"#03045e"}}/> <span className='bg-red-500 text-white  rounded-full h-fit w-fit px-2'>2</span></Link>
            </div>
        </nav>
    )
}
