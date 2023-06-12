import AddAuctionContianer from '@/components/AdminComponents/AddAuctionContianer'
import AdminProductContainer from '@/components/AdminComponents/AdminProductContainer'
import React from 'react'

export default function adauction() {
  return (
    <div className='flex flex-col justify-center items-center mx-20 my-20'>
      <AddAuctionContianer />
      <h2 className='font-bold text-3xl '>All Products</h2>
      <AdminProductContainer />
    </div>
  )
}
