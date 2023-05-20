import ProductContainer from '@/components/HomeScreenComponents/ProductContainer'
import SearchBar from '@/components/HomeScreenComponents/SearchBar'
import React from 'react'

export default function home() {
  return (
    <div>
        <section>
            <h1>Top Section</h1>
            <SearchBar/>
        </section>
        <section>
            <h1>All Products</h1>
            <ProductContainer/>
        </section>
    </div>
  )
}
