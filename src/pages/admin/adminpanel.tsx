import AddProductComponent from '@/components/AdminComponents/AddProductComponent'
import AdminProductContainer from '@/components/AdminComponents/AdminProductContainer'
import BannerComponent from '@/components/HomeScreenComponents/BannerComponent'
import SearchBar from '@/components/HomeScreenComponents/SearchBar'
import React from 'react'

export default function adminpanel() {
  return (
    <>
      <BannerComponent />
      <main className='flex flex-col justify-center items-center'>
        <h1 className='font-bold text-5xl mt-10 h-10'>Hello Admin</h1>
        <div className='w-fit'>
          <SearchBar />
        </div>
        <AddProductComponent />
        <AdminProductContainer />
      </main>
    </>
  )
}
