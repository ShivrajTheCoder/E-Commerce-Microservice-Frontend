import TimerComponent from '@/components/AuctionScreenComponent/TimerComponent';
import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

interface NewBid {
  amount: number;
  itemId: string;
}

interface AucItemInterface {
  name: string;
  startingBid: number;
  minBidInc: number;
  lastBid: number;
  image_url: string;
  date: string;
  time: string;
  end: string;
  description: string;
}

export default function AuctionItem() {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.user.userId);
  const { itemName, itemId } = router.query;
//   console.log(itemName, itemId);
  const [joined, setJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [aucItem, setAucItem] = useState<AucItemInterface | undefined>();
  const [lastBidReceived, setLastBid] = useState<number | undefined>();
  const [customBid, setCustomBid] = useState<string | undefined>("");
  const [timer, setTimer] = useState<string>("");

  const socketRef = useRef<any>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const checkLogin = () => {
      if (!userId) {
        router.push("/");
      }
    };
    checkLogin();
    const socket = io("http://localhost:8085");
    socketRef.current = socket;

    socket.emit("room:start", { itemName, itemId });
    setJoined(true);

    const handleNewBid = (payload: NewBid) => {
      console.log("New bid received:", payload);
      const { amount, itemId } = payload;
      setLastBid(Number(amount));
    };

    socket.on("newbid", handleNewBid);

    const getItemDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auction/getitem/${itemId}`);
        if (response.status === 200) {
        //   console.log(response.data.result[0]);
          setAucItem(response.data.result[0]);
        } else {
          toast.error("Something went wrong!");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    };

    getItemDetails();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("newbid");
        socketRef.current.disconnect();
      }
    };
  }, [itemName, itemId, socketRef.current, customBid, userId]);


  const sattaHandler = () => {
    if (aucItem && socketRef.current) {
      let lastBid: number;
      if (lastBidReceived) {
        lastBid = lastBidReceived;
      } else {
        lastBid = aucItem.startingBid;
      }
      const bid = Number(lastBid) + Number(aucItem.minBidInc);
      if (Number(customBid) && Number(customBid) > Number(aucItem.minBidInc)) {
        socketRef.current.emit("bid:newbid", {
          bid: Number(customBid),
          itemId,
          userId,
          itemName,
        });
      } else {
        socketRef.current.emit("bid:newbid", {
          bid,
          itemId,
          userId,
          itemName,
        });
      }
    }
    setCustomBid("");
  };

  return (
    <div className="mx-20">
      {joined && !loading && aucItem ? (
        <section className="my-20 w-fit bg-[#f6f6f6] p-5 rounded-md shadow-lg grid grid-cols-2">
          <div>
            <img
              className="rounded-md"
              src={aucItem.image_url}
              alt="auction item"
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="font-extrabold text-3xl">Current Auction</h1>
            <h1 className="font-extrabold text-2xl mt-5 mb-3">{aucItem.name}</h1>
            <div className="grid grid-cols-2 gap-5 font-bold text-xl my-2">
              <div>Minimum Bid</div>
              <div>{aucItem.minBidInc}</div>
            </div>
            <div className="grid grid-cols-2 gap-5 font-bold text-xl my-2">
              <div>Starting Bid</div>
              <div>{Number(aucItem.startingBid)}</div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <input
                className="bg-white rounded-sm h-10 px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-md"
                type="number"
                name="nextbid"
                id="nextbid"
                value={customBid ? customBid : ""}
                placeholder="Custom Bid"
                onChange={(e) => {
                  setCustomBid(e.target.value);
                }}
              />
              <button
                className="bg-black w-full shadow-md text-white font-bold text-lg px-4 py-2 rounded-sm"
                onClick={sattaHandler}
              >
                Next Bid
              </button>
            </div>
            <div className="grid grid-cols-2 font-bold text-xl w-full mt-10">
              <div className="flex justify-center items-center">Top Bid</div>
              <div className="flex justify-center items-center">
                {lastBidReceived ? lastBidReceived : aucItem.lastBid}
              </div>
            </div>
            <TimerComponent endTime={aucItem.end}/>
          </div>
          <div className="col-span-2 my-2 text-xl font-semibold">
            <p>{aucItem.description}</p>
          </div>
        </section>
      ) : (
        <div>The item is not available</div>
      )}
      <ToastContainer />
    </div>
  );
}
