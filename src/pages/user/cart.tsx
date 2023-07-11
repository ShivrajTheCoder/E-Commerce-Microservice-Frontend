import CartProductCard from '@/components/CartComponents/CartProductCard';
import { RootState } from '@/store/reducers';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import * as actions from "../../store/reducers/cartActions";
import { useSelector, useDispatch } from 'react-redux';
interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  ratingCount: number;
  image_url: string;
  qty: number;
}
interface IOrder {
  _id: string;
  qty: number;
}
export default function cart() {
  const router=useRouter();
  const [subTotal, setSubtotal] = useState<number>(0);
  const [cartLocal, setCartLocal] = useState<IProduct[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);
  const dispatch=useDispatch();
  console.log(cartItems, 'from the cart');

  const clearCart=createAction(actions.CLEAR_CART);
  useEffect(() => {
    setSubtotal(0);
    cartItems.forEach(item => {
      setSubtotal((prev) => prev + (item.price * item.qty));
    });
    const fetchFromLocal = () => {
      let cartItemsLocal = localStorage.getItem("onlineShoppingCart");
      if (cartItemsLocal) {
        cartItemsLocal = JSON.parse(cartItemsLocal);
        if (Array.isArray(cartItemsLocal))
          setCartLocal([...cartItemsLocal]);
      }
      console.log(cartItems, "from local")
    }
    fetchFromLocal();
  }, [cartItems])
  const handleProceedToBuy = async () => {
    console.log("I was clicked", user);
    if (cartItems.length < 1) {
      return;
    }
    if (!user.isLoggedin || !user.userId) {
      console.log(true);
      router.push("/");
    }
    else {
      let productIds: IOrder[] = [];
      const { userId } = user;
      cartItems.forEach(item => {
        const { _id, qty } = item;
        productIds.push({ _id, qty });
      })
      const orderData = { prod: productIds, userId };
      console.log(orderData);
      try {
        const resp = await axios.post(`http://localhost:8081/products/products/buy`, orderData)
        console.log(resp.data);
        if(resp.status===200){
          dispatch(clearCart());
          router.push("/user/myorders");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <main className='grid md:grid-cols-12 py-10 px-5 w-full'>
      {
        (cartItems.length > 0) && <section className=' md:col-span-9'>
          {
            cartItems?.map(item => (
              <CartProductCard key={item._id} item={item} />
            ))
          }
        </section>
      }
      {
        (cartItems.length > 0) &&
        <div className='rounded-lg md:col-span-3 h-fit w-full p-10 text-white  bg-[#A3A4A1] font-bold text-xl'>
          Cart summary
          <p className='mb-3'>{subTotal} <span>({cartItems.length})</span></p>
          <button onClick={handleProceedToBuy} className='bg-[#ffd60a] text-black px-3 py-2 rounded-md my-auto'>Proceed To Buy</button>
        </div>
      }
    </main>
  )
}
