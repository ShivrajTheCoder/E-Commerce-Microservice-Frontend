import React, { useState, useEffect } from 'react'
import RazorpayButton from '../PaymentComponent/RazorpayButton';
interface IOrder {
  payment: boolean;
  products: string;
  totalPrice: number;
  userId: string;
  _id: string;
  createdAt: Date;
}
interface OrderProps {
  order: IOrder;
}
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
export default function OrderCard({ order }: OrderProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    setProducts(JSON.parse(order.products));
    // console.log(products);
  }, [order]);
  return (
    <div className='p-5 bg-white'>
      <h1 className='py-2 text-3xl font-bold'>Order Id: OnS{order._id}</h1>
      <div className='flex text-lg my-5'>
        <div>Ordered On {`${order.createdAt.toString()}`}</div>
        <div className='border-l-2 bg-blue-500 w-1 h-8 mx-3'></div>
        <div>Estimated Delivery {`Delivery date`}</div>
        <div className='border-l-2 bg-blue-500 w-1 h-8 mx-3'></div>
        <div className='font-bold'>₹ {order.totalPrice}</div>
      </div>
      <hr />
      <section className='grid grid-cols-2 gap-2'>
        {products?.map((prod) => (
          <div key={prod._id} className='grid grid-cols-10 my-5 bg-gray-200 p-4 rounded-md'>
            <img className='cols-span-4 rounded-md' src={prod.image_url} alt={prod.name} />
            <div className='flex flex-col mx-5 col-span-2'>
              <h1 className='font-bold text-2xl'>{prod.name}</h1>

            </div>
            <div className='col-span-5 font-semibold text-lg'><p>{prod.description}</p></div>
            <div className='ml-auto col-span-2'>
              <h4 className='font-bold text-xl'>Price: ₹ {prod.price}</h4>
              <p className='font-semibold text-gray-400'>Qty: {prod.qty}</p>
            </div>
          </div>
        ))}
      </section>
      <hr />
      <div>
        <h1 className='font-bold text-xl'>Payment Status <span className='font-semibold text-lg'>{order.payment ? "Payed" : "Not Payed"}</span></h1>
        {
          !order.payment &&
          <RazorpayButton />
        }

      </div>
    </div>
  );
}
