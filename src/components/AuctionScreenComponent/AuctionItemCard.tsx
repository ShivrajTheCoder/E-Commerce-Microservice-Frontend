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



    const { _id, name, startingBid, minBidInc, lastBid, img_url, date, time } = props;
    const parts = date.split('/');
    const areSameDate = (date1: Date, date2: Date) => {
        return (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate());
    }
    const targetDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])); // Set time to 00:00:00
    // Get the current date without time
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const queryParams = { itemName: name, itemId: _id };
    const href = {
        pathname: '/auction/[aucItem]',
        query: queryParams,
      };
    return (
        <div>
            <img src="" alt={img_url} />
            <h1>{name}</h1>

            <div>
                <h2>Starting Bid : {startingBid}</h2>
            </div>
            <div>
                <h2>Minimum Bid:{minBidInc}</h2>
            </div>
            {
                <h1>{time}</h1>
            }
            <Link href={href} as={`/auction/${_id}`}>Join real</Link>
            {(areSameDate(targetDate, currentDate)) && <button>Join Now</button>}
            {
                !areSameDate(targetDate, currentDate) && <div>
                    <h2>Starting on: {date.toString()} {time}</h2>
                </div>
            }
        </div>
    )
}
