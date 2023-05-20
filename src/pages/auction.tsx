import React, { useEffect } from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:8085');

interface NewBid{
  amount:number;
}
export default function auction() {
  useEffect(() => {
    const handleNewBid=(payload:NewBid)=>{
      console.log(payload,"from the server");
    }
    socket.on("newbid", handleNewBid);
    return ()=>{
      socket.on("newbid", handleNewBid);
    }
  }, [])
  const sattaHandler=()=>{
    socket.emit("bid:newbid",50000)
  }
  return (
    <div>
      hii
      <button onClick={sattaHandler}>satta laga</button>
    </div>
  )
}
