import CartProductCard from '@/components/CartComponents/CartProductCard';
import { RootState } from '@/store/reducers';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
export default function cart() {
  const [subTotal,setSubtotal]=useState<number>(0);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const cartItems=[
  //   {_id: '646903414b8c638a4bf7bff0', qty: 1},
  //   {_id: '646bb7a50aa8eac9cec82e73', qty: 1}
  // ]
  console.log(cartItems);
  return (
    <main className='flex flex-row p-10 w-full'>
      {
        (cartItems.length > 0) && <section>
          {
            cartItems?.map(item => (
              <CartProductCard key={item._id} item={item} setSubtotal={setSubtotal}/>
            ))
          }
        </section>
      }
      {
        (cartItems.length > 0) &&
        <div className='rounded-lg h-fit w-full p-10 text-white  bg-[#A3A4A1] font-bold text-xl'>
          Cart summary
          <p className='mb-3'>{Math.round(subTotal/2)} <span>({cartItems.length})</span></p>
          <button className='bg-[#ffd60a] text-black px-3 py-2 rounded-md my-auto'>Proceed To Buy</button>
        </div>
      }

    </main>
  )
}
