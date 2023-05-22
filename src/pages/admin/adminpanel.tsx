import AddProductComponent from '@/components/AdminComponents/AddProductComponent'
import AdminProductContainer from '@/components/AdminComponents/AdminProductContainer'
import React from 'react'

export default function adminpanel() {
  return (
    <div>
      I am an admin
      <AddProductComponent/>
      <AdminProductContainer/>
    </div>
  )
}
