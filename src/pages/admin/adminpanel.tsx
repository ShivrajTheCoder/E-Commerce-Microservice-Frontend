import AddProductComponent from '@/components/AdminComponents/AddProductComponent'
import AdminProductContainer from '@/components/AdminComponents/AdminProductContainer'
import BannerComponent from '@/components/HomeScreenComponents/BannerComponent'
import ProductContainer from '@/components/HomeScreenComponents/ProductContainer'
import SearchBar from '@/components/HomeScreenComponents/SearchBar'
import { RootState } from '@/store/reducers'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function adminpanel() {
  // const user = useSelector((state: RootState) => state.user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (!(user.isAdmin && user.isLoggedin)) {
  //     router.push("/");
  //   }
  // }, [user]);
  return (
    <>
      <BannerComponent />
      <main className='flex flex-col justify-center items-center'>
        <h1 className='font-bold text-5xl mt-10 h-10'>Hello Admin</h1>
        <div className='w-fit'>
          <SearchBar />
        </div>
        <AddProductComponent />
        <section className='flex flex-col items-center my-10 mx-10'>
            <h1 className='font-bold text-3xl '>All Products</h1>
            <AdminProductContainer/>
        </section>
      </main>
    </>
  )
}
