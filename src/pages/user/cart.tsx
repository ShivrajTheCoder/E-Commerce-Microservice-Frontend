import CartProductCard from '@/components/CartComponents/CartProductCard';
import { RootState } from '@/store/reducers';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
interface IProduct{
  _id:string;
  name:string;
  price:number;
  description:string;
  rating:number;
  ratingCount:number;
  image_url:string;
}
export default function cart() {
  const [subTotal, setSubtotal] = useState<number>(0);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems, 'from the cart');
  useEffect(()=>{
    setSubtotal(0);
    cartItems.forEach(item => {
      setSubtotal((prev)=>prev+(item.price*item.qty));
    });
  },[cartItems])
  return (
    <main className='grid grid-cols-12 py-10 px-5 w-full'>
      {
        (cartItems.length > 0) && <section className=' col-span-9'>
          {
            cartItems?.map(item => (
              <CartProductCard key={item._id} item={item}  />
            ))
          }
        </section>
      }
      {
        (cartItems.length > 0) &&
        <div className='rounded-lg col-span-3 h-fit w-full p-10 text-white  bg-[#A3A4A1] font-bold text-xl'>
          Cart summary
          <p className='mb-3'>{subTotal} <span>({cartItems.length})</span></p>
          <button className='bg-[#ffd60a] text-black px-3 py-2 rounded-md my-auto'>Proceed To Buy</button>
        </div>
      }
    </main>
  )
}
