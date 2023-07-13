import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RazorpayButton from '@/components/PaymentComponent/RazorpayButton';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  payment: boolean;
  products: string;
  totalPrice: number;
  userId: string;
  _id: string;
  createdAt: Date;
  razorpayOrder: string;
}

export default function OrderScreen() {
  const router = useRouter();
  const orderId = router.query.order;
  const [loading, setLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [rzOrder, rzSetOrder] = useState<any>();
  const [order, setOrder] = useState<IOrder>();
  const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${apiUrl}/orders/getoder/${orderId}`);
        setOrder(res.data.order);
        setProducts(JSON.parse(res.data.order.products));
        rzSetOrder(JSON.parse(res.data.order.razorpayOrder));
        setLoading(false);
      } catch (error:any) {
        // console.log(error);
        toast.error(error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return (
    <>
      {!loading && order && (
        <div className="p-5 bg-white">
          <h1 className="py-2 text-3xl font-bold">Order Id: OnS{order._id}</h1>
          <div className="flex text-lg my-5">
            <div>Ordered On {`${order.createdAt.toString()}`}</div>
            <div className="border-l-2 bg-blue-500 w-1 h-8 mx-3"></div>
            <div>Estimated Delivery {`Delivery date`}</div>
            <div className="border-l-2 bg-blue-500 w-1 h-8 mx-3"></div>
            <div className="font-bold">₹ {order.totalPrice}</div>
          </div>
          <hr />
          <section className="grid grid-cols-2 gap-2">
            {products.map((prod) => (
              <div key={prod._id} className="grid grid-cols-10 my-5 bg-gray-200 p-4 rounded-md">
                <img className="col-span-4 rounded-md" src={prod.image_url} alt={prod.name} />
                <div className="flex flex-col mx-5 col-span-2">
                  <h1 className="font-bold text-2xl">{prod.name}</h1>
                </div>
                <div className="col-span-5 font-semibold text-lg">
                  <p>{prod.description}</p>
                </div>
                <div className="ml-auto col-span-2">
                  <h4 className="font-bold text-xl">Price: ₹ {prod.price}</h4>
                  <p className="font-semibold text-gray-400">Qty: {prod.qty}</p>
                </div>
              </div>
            ))}
          </section>
          <hr />
          <div>
            <h1 className="font-bold text-xl">
              Payment Status <span className="font-semibold text-lg">{order.payment ? 'Paid' : 'Not Paid'}</span>
            </h1>
            {!order.payment && rzOrder && (
              <RazorpayButton totalPrice={order.totalPrice} order_id={rzOrder.id} or_id={order._id} />
            )}
          </div>
          <ToastContainer/>
        </div>
      )}
    </>
  );
}
