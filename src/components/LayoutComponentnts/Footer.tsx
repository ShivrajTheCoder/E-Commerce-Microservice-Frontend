import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-black h-64 flex flex-col  items-center'>
      <div className='flex justify-center items-center sm:w-[70%] bg-green-500 text-white sm:h-[70%] rounded-b-xl'>
        <div className='px-10 border-r-2'>
          <h3 className='font-bold text-2xl'>Social</h3>
          <ul className='font-semibold text-lg'>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
        <div className='px-10 border-r-2'>
          <h3 className='font-bold text-2xl'>Support</h3>
          <ul className='font-semibold text-lg'>
            <li>Phone</li>
            <li>Email</li>
          </ul>
        </div>
        <div className='mx-10'>
          <h3 className='font-bold text-2xl'>Quick Links</h3>
          <ul className='font-semibold text-lg'>
            <li>Cart</li>
            <li>My Orders</li>
          </ul>
        </div>
      </div>
      <div className='text-white font-bold my-auto'>Developed By- Shivraj Thapliyal</div>
    </footer>
  )
}
