import AuctionOrderCard from '@/components/OrderComponents/AuctionOrderCard';
import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
interface IAucOrder{
    createdAt:string;
    item:string;
    payment:boolean;
    price:number;
    userId:string;
    _id:string;
    razorpayOrder:string;
}
// createdAt
// : 
// "2023-07-10T19:14:29.695Z"
// item
// : 
// ['{"_id":"64ac58c0f0d8dd808fd45a55","name":"Buulllll…me":"00:45","end":"00:46","active":false,"__v":0}']
// payment
// : 
// false
// price
// : 
// 2100
// razorpayOrder
// : 
// "{\"id\":\"order_MCD6wTeXWexGel\",\"entity\":\"order\",\"amount\":210000,\"amount_paid\":0,\"amount_due\":210000,\"currency\":\"INR\",\"receipt\":null,\"offer_id\":null,\"status\":\"created\",\"attempts\":0,\"notes\":[],\"created_at\":1689016560}"
// userId
// : 
// "64a955667789411068a70ba1"
// __v
// : 
// 0
// _id
// : 
// "64ac58f1e8ead4511203e294"
export default function myaucorders() {
    const [isloading,setIsLoading]=useState<Boolean>(true);
    const [aucOrders,setAucOrders]=useState<IAucOrder[]>([]);
    const [error,setError]=useState<any>();
    const user = useSelector((state: RootState) => state.user);
    const router=useRouter();
    useEffect(()=>{
        const checkLogin=()=>{
            if(!user.isLoggedin && user.userId){
                router.push("/");
            }
        }
        const fetchOrders=async ()=>{
            try{
                // const resp=await axios.get(`http://localhost:8080/orders/getuseraucorders/${user.userId}`)
                const resp=await axios.get(`http://localhost:8080/orders/getuseraucorders/64a955667789411068a70ba1`)
                console.log(resp.data.orders);
                setAucOrders(resp.data.orders);
            }
            catch(error){
                console.log(error);
                setError(error);
            }
            setIsLoading(false);
        }
        // checkLogin();
        fetchOrders();
    },[])
  return (
    <section>
        {
            (!isloading && !error && aucOrders.length>0) && <main>
                {
                    aucOrders.map((order)=>(
                        <AuctionOrderCard key={order._id} order={order}/>
                    ))
                }
            </main>
        }
    </section>
  )
}
