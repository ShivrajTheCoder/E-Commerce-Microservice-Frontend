import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import RazorpayButton from '../PaymentComponent/RazorpayButton';
interface IAucOrder {
    createdAt: string;
    item: string;
    payment: boolean;
    price: number;
    userId: string;
    _id: string;
    razorpayOrder: string;
}
interface OrderProps {
    order: IAucOrder;
}
interface IProduct {
    name: string;
    description: string;
    startingBid: number;
    minBidInc: number;
    lastBid: number;
    image_url: string;
    date: string;
    time: string;
    lastBidUser: string;
    active: boolean;
    end: string;
    _id: string;

}
export default function AuctionOrderCard({ order }: OrderProps) {
    console.log(order);
    const [item, setItem] = useState<IProduct>();
    const [rzOrder, rzSetOrder] = useState<any>();
    useEffect(() => {
        // console.log("heere is your data")
        if (order.item[0]) {// remove this condition
            setItem(JSON.parse(order.item[0]));

        }
        // console.log(order.item[0]);
        rzSetOrder(order.razorpayOrder);
        // console.log(order.razorpayOrder);
    }, [order]);
    return (
        <section className='m-5'>
            {
                (item && rzOrder) && <main className='m-2 md:p-5 rounded-md '>
                    <h1 className='py-2 md:text-3xl md:font-bold font-semibold text-lg'>Order Id: OnS{order._id}</h1>
                    <div className='flex md:flex-row flex-col text-lg my-5'>
                        <div>Ordered On {`${order.createdAt.toString()}`}</div>
                        <div className='md:border-l-2 md:my-0 my-2 bg-blue-500 md:w-1 w-full h-1 md:h-8 mx-3'></div>
                        <div>Estimated Delivery {`Delivery date`}</div>
                        <div className='md:border-l-2 md:my-0 my-2 bg-blue-500 md:w-1 w-full h-1 md:h-8 mx-3'></div>
                        <div className='font-bold'>Price ₹ {order.price}</div>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                        <img className='col-span-1 rounded-md' src={item.image_url} alt={item.name} />
                        <div className='col-span-2'>
                            <h2 className='font-bold text-3xl'>{item.name}</h2>
                            <div className='col-span-5 font-semibold text-lg'><p>{item.description}</p></div>
                            <div className='font-bold text-xl'>₹ {order.price}</div>
                            <div>
                                <h1 className="font-bold text-xl">
                                    Payment Status <span className="font-semibold text-lg">{order.payment ? 'Paid' : 'Not Paid'}</span>
                                </h1>
                                {!order.payment && rzOrder && (
                                    <RazorpayButton totalPrice={order.price} order_id={rzOrder.id} or_id={order._id} />
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            }
        </section>
    )
}
