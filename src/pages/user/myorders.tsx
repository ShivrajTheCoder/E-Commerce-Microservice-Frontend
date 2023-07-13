import OrderCard from '@/components/OrderComponents/OrderCard';
import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import { root } from 'postcss';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function myorders() {
    const [orders, setOrders] = useState<any>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [error, setError] = useState<any>();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
    useEffect(() => {
        if (!user.isLoggedin) {
            router.push("/");
        }
        const fetchAllMyOrders = async () => {
            try {
                if (user.userId) {
                    const response = await axios.get(`${apiUrl}/orders/getuserorders/${user.userId}`);
                    console.log(response.data.orders,response.status);
                    setOrders(response.data.orders);
                }

            }
            catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        fetchAllMyOrders();
    }, [user])
    return (
        <main>
            {
                (!isLoading && orders) && <section className='m-10'>
                    {
                        orders.map((order:any)=>(
                            <OrderCard key={order._id} order={order}/>
                        ))
                    }
                </section>
            }
        </main>
    )
}
