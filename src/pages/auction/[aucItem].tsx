import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
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
    img_url: string;
    date: string;
    time: string;
}
const socket = io('http://localhost:8085');
export default function auctionItem() {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.userId);
    const { itemName, itemId } = router.query;
    console.log(itemName, itemId)
    // console.log(aucItem, router.query.itemName);
    const [joined, setJoined] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(true);
    const [aucItem, setAucItem] = useState<AucItemInterface>();
    const [lastBidRecieved, setLastBid] = useState<number | undefined>();

    useEffect(() => {
        // Join the specific room
        const getItemDetails = async () => {
            await axios.get(`http://localhost:8085/auction/getitem/${itemId}`)
                .then(resp => {
                    if (resp.status == 200) {
                        console.log(resp.data.result);
                        setAucItem(resp.data.result);
                    }
                    else {
                        console.log("error");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            setLoading(false);
        }
        getItemDetails();
        socket.emit('room:start', { itemName, itemId });
        setJoined(true);
        // Listen for the "newbid" event
        const handleNewBid = (payload: NewBid) => {
            console.log('New bid received:', payload);
            console.log(payload);
            const {amount}=payload;
            setLastBid(Number(amount));
            // Handle the new bid event for the specific room here
        };
        socket.on('newbid', handleNewBid);

        return () => {
            // Leave the room when the component unmounts
            socket.emit('room:stop', { itemName, itemId });

            // Clean up the event listener
            socket.off('newbid', handleNewBid);
        };
    }, [])
    const sattaHandler = () => {
        console.log(lastBidRecieved,"this is the last bid received");
        if (aucItem) {
            let lastBid: number;
            if (lastBidRecieved) {
                lastBid = lastBidRecieved;
            }
            else {
                lastBid = aucItem.startingBid;
            }
            const bid = Number(lastBid) +Number(aucItem.minBidInc) ;
            console.log(aucItem.minBidInc, bid);
            socket.emit("bid:newbid", { bid, itemId, userId, itemName })
            // console.log("Laga diya")
        }
        else {
            console.log("galat")
        }
        //     socket.emit("bid:newbid", { bid: aucItem.lastBid+ aucItem.minBidInc , itemId, userId, itemName })
        // console.log("Laga diya")
    }
    return (
        <div>
            I am an item
            {(joined && !loading && aucItem) && <button onClick={sattaHandler}>satta laga</button>}
        </div>
    )
}
