import ErrorComponent from '@/components/ErrorComponent';
import AuctionOrderCard from '@/components/OrderComponents/AuctionOrderCard';
import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
interface IAucOrder {
    createdAt: string;
    item: string;
    payment: boolean;
    price: number;
    userId: string;
    _id: string;
    razorpayOrder: string;
}
export default function myaucorders() {
    const [isloading, setIsLoading] = useState<Boolean>(true);
    const [aucOrders, setAucOrders] = useState<IAucOrder[]>([]);
    const [error, setError] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
    useEffect(() => {
        const checkLogin = () => {
            if (!user.isLoggedin && user.userId) {
                router.push("/");
            }
        }
        const fetchOrders = async () => {
            try {
                const resp = await axios.get(`${apiUrl}/orders/getuseraucorders/${user.userId}`)
                if (resp.status === 200) {
                    console.log(resp.data.orders);
                    setAucOrders(resp.data.orders);
                }
                else {
                    setError("Something went wrong!");
                }
            }
            catch (error) {
                // console.log(error);
                setError("No auction won!");
            }
        }
        checkLogin();
        setIsLoading(false);
        fetchOrders();
    }, [])
    return (
        <section>
            {
                (!isloading && !error && aucOrders.length > 0) && <main>
                    {
                        aucOrders.map((order) => (
                            <AuctionOrderCard key={order._id} order={order} />
                        ))
                    }
                </main>
            }{
                (!isloading && error) && 
                <div className='mx-10 my-10'>
                <ErrorComponent message={error} />
                </div>
            }
        </section>
    )
}
