import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
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

export default function AuctionItem() {
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.userId);
    const { itemName, itemId } = router.query;
    console.log(itemName, itemId)

    const [joined, setJoined] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [aucItem, setAucItem] = useState<AucItemInterface | undefined>();
    const [lastBidReceived, setLastBid] = useState<number | undefined>();
    const socketRef = useRef<any>(null);

    useEffect(() => {
        const socket = io('http://localhost:8085');
        socketRef.current = socket;

        socket.emit('room:start', { itemName, itemId });
        setJoined(true);

        const handleNewBid = (payload: NewBid) => {
            console.log('New bid received:', payload);
            console.log(payload);
            const { amount, itemId } = payload;
            setLastBid(Number(amount));
            // Handle the new bid event for the specific room here
        };

        socket.on('newbid', handleNewBid);

        const getItemDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/auction/getitem/${itemId}`);
                if (response.status === 200) {
                    console.log(response.data.result);
                    setAucItem(response.data.result);
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        getItemDetails();

        return () => {
            if (socketRef.current) {
                socketRef.current.off('newbid');
                socketRef.current.disconnect();
            }
        };

    }, [itemName, itemId, socketRef.current]);

    const sattaHandler = () => {
        console.log(lastBidReceived, "this is the last bid received");
        if (aucItem && socketRef.current) {
            let lastBid: number;
            if (lastBidReceived) {
                lastBid = lastBidReceived;
            } else {
                lastBid = aucItem.startingBid;
            }
            const bid = Number(lastBid) + Number(aucItem.minBidInc);
            console.log(aucItem.minBidInc, bid);
            socketRef.current.emit("bid:newbid", { bid, itemId, userId, itemName });
        } else {
            console.log("galat");
        }
    };

    return (
        <div>
            I am an item
            {(joined && !loading && aucItem) && <button onClick={sattaHandler}>satta laga</button>}
        </div>
    );
}
