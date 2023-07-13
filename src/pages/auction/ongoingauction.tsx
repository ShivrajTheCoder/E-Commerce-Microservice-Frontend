import AuctionItemCard from '@/components/AuctionScreenComponent/AuctionItemCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface AItem {
  _id:string;
  name: string;
  startingBid: number;
  minBidInc: number;
  lastBid: number;
  image_url: string;
  date: string;
  time: string;
  description:string;
  active:boolean;
  end:string;
}
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ongoingauction() {
  const [aucItems, setAucItems] = useState<AItem[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
  useEffect(() => {
    // console.log("i ran")
    axios.get(`${apiUrl}/auction/getavailauction`)
      .then(resp => {
        if (resp.status === 200 && resp.data.result.length > 0) {
          setAucItems(resp.data.result)
          // console.log(resp.data.result);
        }
        else {
          // console.log("error");
          toast.error("No Auction is live");
        }
      })
      .catch(error => {
        // console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])
  return (
    <div className='mx-20 my-10 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-3xl my-10'>On Going Auctions</h1>
      {
        (!loading && aucItems) &&
        <div className=' w-full my-3'>
          {
            aucItems?.map(item => {
              return (<AuctionItemCard {...item} key={item._id}/>)
            })
          }
        </div>
      }
      <ToastContainer />
    </div>
  )
}

