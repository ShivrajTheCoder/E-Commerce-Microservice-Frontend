import BannerComponent from '@/components/HomeScreenComponents/BannerComponent'
import ProductContainer from '@/components/HomeScreenComponents/ProductContainer'
import SearchBar from '@/components/HomeScreenComponents/SearchBar'
import TreandingProductsComponent from '@/components/TreandingProductsComponent'
import React from 'react'

export default function home() {
  return (
    <div className=''>
      <section className='flex flex-col justify-center items-center'>
        <BannerComponent />
        <SearchBar />
      </section>
      <section className='flex flex-col items-center my-10 mx-10'>
        <h1 className='font-bold text-3xl '>Treanding Products</h1>
        <TreandingProductsComponent />
      </section>
      <section className='flex flex-col items-center my-10 mx-10'>
        <h1 className='font-bold text-3xl '>All Products</h1>
        <ProductContainer />
      </section>
    </div>
  )
}
