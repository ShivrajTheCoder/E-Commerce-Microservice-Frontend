import React from 'react'

export default function SearchBar() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <input className='w-full bg-[#f6f6f6] rounded-xl mt-10 text-black px-32 py-5 ' type="text" name="search-params" id="search-param" placeholder='What do you want today?' />
    </div>
  )
}
