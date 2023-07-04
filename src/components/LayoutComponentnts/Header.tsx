import { RootState } from '@/store/reducers';
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
export default function Header() {
    const user = useSelector((state: RootState) => state.user);
    const { items } = useSelector((state: RootState) => state.cart);
    // console.log(items.length, "front the header")
    const isAdmin = user.isAdmin;
    // console.log(user, "user sate");
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
                <Link href={"/admin/adauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Admin Auction</Link>
                <Link href={"/admin/adminpanel"} className=' text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Admin Panel</Link>
                <Link href={"/auction/ongoingauction"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>Ongoing Auction</Link>
                <Link href={"/user/myorders"} className='mx-5 text-lg font-bold text-white  bg-[#A3A4A1] rounded-3xl px-5 py-1'>My Orders</Link>
            </div>
            <div className='ml-auto mx-2 flex'>
                <Link href="/" className='mx-3 flex justify-center '><BsFillPersonFill size={30} style={{ color: "#03045e" }} /><span className='text-xl  font-semibold text-[#03045e]'>Account</span></Link>
                <Link href="/user/cart" className='flex'><AiOutlineShoppingCart size={30} style={{ color: "#03045e" }} />{
                    items.length > 0 &&
                    <span className='bg-red-500 text-white  rounded-full h-fit w-fit px-2'>{items.length}</span>
                }
                </Link>
            </div>
        </nav>
    )
}
