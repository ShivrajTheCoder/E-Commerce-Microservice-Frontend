import Link from 'next/link';
import React from 'react'
interface AItem {
    _id: string;
    name: string;
    startingBid: number;
    minBidInc: number;
    lastBid: number;
    img_url: string;
    date: string;
    time: string;
}

interface ItemProp extends AItem {
    key: string;
}
export default function AuctionItemCard(props: ItemProp) {

//need to update the date stuff

    const { _id, name, startingBid, minBidInc, lastBid, img_url, date, time } = props;
    const parts = date.split('-');
    const areSameDate = (date1: Date, date2: Date) => {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    const targetDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])); // Set time to 00:00:00
    // Get the current date without time
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const queryParams = { itemName: name, itemId: _id };
    const href = {
        pathname: '/auction/[aucItem]',
        query: queryParams,
    };
    return (
        <div className='rounded-b-xl bg-[#f6f6f6] h-full'>
            <img className='w-full rounded-t-xl' src={img_url} alt={name} />
            <div className='p-5'>
                <h2 className='font-bold text-xl'>{name}</h2>
                <div className='flex font-semibold text-lg'>
                    <h2 className=''>Starting Bid</h2>
                    <p className='ml-auto mr-5'>₹{startingBid}</p>
                </div>
                <div className='flex font-semibold text-lg'>
                    <h2 className=''>Min. Bid</h2>
                    <p className='ml-auto mr-5'>₹{minBidInc}</p>
                </div>
                <div className='flex font-semibold text-lg'>
                    <h2 className=''>Starting at</h2>
                    <p className='ml-auto mr-5'>{time}</p>
                </div>
                {
                    !areSameDate(targetDate, currentDate) &&
                    <div className='flex font-semibold text-lg'>
                        <h2 className=''>Starting on</h2>
                        <p className='ml-auto mr-5'>{date.toString()}</p>
                    </div>
                }
                <div className='mt-5 w-full'>
                    {(areSameDate(targetDate, currentDate)) && <Link className='bg-black my-20 w-full  text-white font-bold text-lg px-4 py-3 rounded-md' href={href} as={`/auction/${_id}`}>Join real</Link>}
                </div>
            </div>
        </div>
    )
}
