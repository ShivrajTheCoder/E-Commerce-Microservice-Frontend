import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className='bg-black h-64 hidden  md:flex flex-col  items-center'>
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
      <footer className='w-full bg-black text-white'>
        <section className='grid grid-cols-2 gap-2'>
          <div className='px-10 border-r-2 my-5'>
            <h3 className='font-bold text-2xl'>Social</h3>
            <ul className='font-semibold text-lg'>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div className='px-10 border-r-2 my-5'>
            <h3 className='font-bold text-2xl'>Support</h3>
            <ul className='font-semibold text-lg'>
              <li>Phone</li>
              <li>Email</li>
            </ul>
          </div>
          <div className=' mb-5 col-span-2 flex justify-center items-center flex-col'>
            <div>
              <h3 className='font-bold text-2xl'>Quick Links</h3>
              <ul className='font-semibold text-lg'>
                <li>Cart</li>
                <li>My Orders</li>
              </ul>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
