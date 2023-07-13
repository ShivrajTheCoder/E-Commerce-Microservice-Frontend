import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface IOrder {
  payment: boolean;
  products: string;
  totalPrice: number;
  userId: string;
  _id: string;
  createdAt: Date;
  razorpayOrder: string;
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
  }, [order]);

  return (
    <div className='md:p-5 bg-white'>
      <h1 className='py-2 text-3xl font-bold md:block hidden'>Order Id: OnS{order._id}</h1>
      <div className='flex md:flex-row flex-col text-lg my-5'>
        <div>Ordered On {`${order.createdAt.toString()}`}</div>
        <div className='md:border-l-2 md:my-0 my-2 bg-blue-500 md:w-1 w-full h-1 md:h-8 mx-3'></div>
        <div>Estimated Delivery {`Delivery date`}</div>
        <div className='md:border-l-2 md:my-0 my-2 bg-blue-500 md:w-1 w-full h-1 md:h-8 mx-3'></div>
        <div className='font-bold'>Price ₹ {order.totalPrice}</div>
      </div>
      <hr />
      <section className='grid md:grid-cols-2 gap-2 w-full'>
        {products?.map((prod) => (
          <div key={prod._id} className='grid md:grid-cols-10 grid-cols-1 gap-4 my-5 bg-gray-200 p-4 rounded-md'>
            <img className='md:col-span-4 col-span-1 rounded-md' src={prod.image_url} alt={prod.name} />
            <div className='md:col-span-3 col-span-1 flex flex-col justify-center'>
              <h1 className='font-bold text-2xl'>{prod.name}</h1>
              <div className='md:hidden'>
                <h4 className='font-bold text-xl'>Price: ₹ {prod.price}</h4>
                <p className='font-semibold text-gray-400'>Qty: {prod.qty}</p>
              </div>
            </div>
            <div className='md:col-span-3 md:hidden col-span-1 font-semibold text-lg'>
              <p>{prod.description.substring(0, 100)}...</p>
              <div className='hidden md:block'>
                <h4 className='font-bold text-xl'>Price: ₹ {prod.price}</h4>
                <p className='font-semibold text-gray-400'>Qty: {prod.qty}</p>
              </div>
            </div>
            <div className='md:col-span-2 hidden  col-span-1 md:flex flex-col justify-center items-end'>
              <h4 className='font-bold text-xl'>Price: ₹ {prod.price}</h4>
              <p className='font-semibold text-gray-400'>Qty: {prod.qty}</p>
            </div>
          </div>
        ))}
      </section>
      <hr />
      <div className='h-fit'>
        <h1 className='font-bold text-xl'>Payment Status <span className='font-semibold text-lg mb-5'>{order.payment ? "Payed" : "Not Payed"}</span></h1>
        <div className='py-4'>
          <Link className="py-2 px-3 bg-green-500 text-white font-bold text-lg rounded-md" href="/user/[order]" as={`/user/${order._id}`} passHref>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
