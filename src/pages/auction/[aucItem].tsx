import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
interface NewBid {
    amount: number;
    itemId: string;
}
const socket = io('http://localhost:8085');
export default function auctionItem() {
    const router = useRouter();
    const { itemName, itemId } = router.query;
    console.log(itemName, itemId)
    // console.log(aucItem, router.query.itemName);
    const [joined, setJoined] = useState<Boolean>(false);
    useEffect(() => {
        // Join the specific room
        socket.emit('room:start', { itemName, itemId });

        // Listen for the "newbid" event
        const handleNewBid = (payload: NewBid) => {
            console.log('New bid received:', payload);
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
        socket.emit("bid:newbid", { bid: 500000, itemId, userId: "644fdbd33c9c279dacf19324", itemName })
        console.log("Laga diya")
    }
    return (
        <div>
            I am an item
            <button onClick={sattaHandler}>satta laga</button>
        </div>
    )
}
