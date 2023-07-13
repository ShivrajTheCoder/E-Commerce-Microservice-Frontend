import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RazorpayButton from '@/components/PaymentComponent/RazorpayButton';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IItem {
  _id: string;
  name: string;
  startingBid: number;
  minBidInc: number;
  lastBid: number;
  image_url: string;
  date: string;
  time: string;
  lastBidUser: string;
  active: boolean;
  end: string;
  description: string;
}

interface IOrder {
  payment: boolean;
  item: string;
  price: number;
  userId: string;
  _id: string;
  createdAt: Date;
  razorpayOrder: string;
}

export default function auctionOrderScreen() {
  const router = useRouter();
  const orderId = router.query.auction;
  const [loading, setLoading] = useState<Boolean>(true);
  const [item, setItem] = useState<IItem>();
  const [rzOrder, rzSetOrder] = useState<any>();
  const [order, setOrder] = useState<IOrder>();
  const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${apiUrl}/orders/getaucorder/${orderId}`);
        console.log(res.data.order, "auc order");
        setOrder(res.data.order);
        setItem(JSON.parse(res.data.order.item));
        rzSetOrder(JSON.parse(res.data.order.razorpayOrder));
        setLoading(false);
      } catch (error: any) {
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
            <div className="font-bold">₹ {order.price}</div>
          </div>
          <hr />
          {
            item && <section className="w-full">

              <div key={item._id} className=" my-5 bg-gray-200 p-4 rounded-md">
                <img className=" rounded-md" src={item.image_url} alt={item.name} />
                <div className="flex flex-col">
                  <h1 className="font-bold text-3xl">{item.name}</h1>
                </div>
                <div className="col-span-5 font-semibold text-lg">
                  <p>{item.description}</p>
                </div>
              </div>

            </section>
          }
          {
            !item && <div className='font-bold text-xl w-full flex justify-center items-center'>
              Unable to fetch Item
            </div>
          }
          <hr />
          <div>
            <h1 className="font-bold text-xl">
              Payment Status <span className="font-semibold text-lg">{order.payment ? 'Paid' : 'Not Paid'}</span>
            </h1>
            {!order.payment && rzOrder && (
              <RazorpayButton totalPrice={order.price} order_id={rzOrder.id} or_id={order._id} isAucOrder={true}/>
            )}
          </div>

          <ToastContainer />
        </div>
      )}
    </>
  );
}
