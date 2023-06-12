import AuctionItemCard from '@/components/AuctionScreenComponent/AuctionItemCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface AItem {
  _id:string;
  name: string;
  startingBid: number;
  minBidInc: number;
  lastBid: number;
  img_url: string;
  date: string;
  time: string;
}
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ongoingauction() {
  const [aucItems, setAucItems] = useState<AItem[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    axios.get(`http://localhost:8085/auction/getavailauction`)
      .then(resp => {
        if (resp.status === 200 && resp.data.result.length > 0) {
          setAucItems(resp.data.result)
          console.log(resp.data.result);
        }
        else {
          console.log("error");
          toast.error("Something went wrong");
        }
      })
      .catch(error => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])
  return (
    <div>
      <h1>On Going Auctions</h1>
      {
        (!loading && aucItems) &&
        <div>
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

