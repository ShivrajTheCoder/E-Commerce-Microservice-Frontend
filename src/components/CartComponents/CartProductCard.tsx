import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import * as actions from "../../store/reducers/cartActions";
import { TbTruckDelivery } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratingCount: number;
    image_url: string;
    qty:number;
}
interface ProductProps {
    item: IProduct;
}
interface ItemPayload {
    _id: string;
    qty: number;
}
interface RemoveItemPayload {
    itemId: string;
}


export default function CartProductCard({ item }: ProductProps) {
    // console.log(item, "fom the card");
    const dispatch=useDispatch();
    const changeQty = createAction<ItemPayload>(actions.UPDATE_QT);
    const removeItem = createAction<RemoveItemPayload>(actions.REMOVE_ITEM);
    const increaseQty = () => {
        // console.log("increase");
        dispatch(changeQty({ ...item, qty: item.qty + 1 }));
    }
    const reduceQty = () => {
        // console.log("reduce")
        dispatch(changeQty({ ...item, qty: item.qty - 1 }));
    }
    const removeItemHandler = () => {
        console.log(item._id);
        dispatch(removeItem({ itemId: item._id }));
    }
    return (
        <section className=''>
            {
                <div className='grid grid-cols-5 px-5 py-3'>
                <img src={item.image_url} className=' rounded-md col-span-1 ' alt="" />
                <div className='flex flex-col px-5 py-3 col-span-3'>
                    <h1 className=' font-bold text-3xl'>{item.name}</h1>
                    <p className='text-lg my-5'>{item.description}</p>

                    <div className='text-3xl flex mt-auto items-center'>
                        <StarRatingComponent
                            name="productRating"
                            starCount={5}
                            value={item.rating}
                        />
                        <p className='text-sm'>({item.ratingCount})</p>
                    </div>

                    <div className='my-2'>
                        <button className='px-4 py-2 rounded-md bg-slate-100 text-black font-extrabold' onClick={increaseQty}>+</button>
                        <span className='px-4 font-extrabold'>{item.qty}</span>
                        <button className='px-4 py-2 rounded-md bg-slate-100 text-black font-extrabold' onClick={reduceQty}>-</button>
                    </div>
                    <div className='mt-3'>
                        <button className='bg-green-500 text-white px-4 py-2 font-bold rounded-md flex items-center'><span className='mx-2'> Free Delivery </span><TbTruckDelivery size={30} /> </button>
                    </div>
                    {/* <button>Remove Item</button> */}
                </div>
                <div className='px-5 py-3 font-bold text-xl'>
                    <div>₹ {item.price}</div>
                    <button className='bg-[#ffd60a] text-black py-3 px-3 rounded-md' onClick={removeItemHandler}>Remove Item</button>
                </div>
            </div>
            }
        </section>
    )
}
