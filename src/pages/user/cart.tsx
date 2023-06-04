import CartProductCard from '@/components/CartComponents/CartProductCard';
import { RootState } from '@/store/reducers';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
export default function cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems);
  return (
    <>
      {
        (cartItems.length > 0) && <section>
          {
            cartItems?.map(item => (
              <CartProductCard key={item._id} item={item} />
            ))
          }
        </section>
      }
    </>
  )
}
