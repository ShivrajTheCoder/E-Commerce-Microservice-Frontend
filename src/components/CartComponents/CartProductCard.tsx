import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import * as actions from "../../store/reducers/cartActions";
import { TbTruckDelivery } from 'react-icons/tb';
interface IProduct {
    _id: string;
    _v: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratingCount: number;
    image_url: string;
}
interface ItemPayload {
    _id: string;
    qty: number;
}
interface RemoveItemPayload {
    itemId: string;
}
interface ProductProps {
    item: {
        _id: string;
        qty: number;
    };
    setSubtotal: React.Dispatch<React.SetStateAction<number>>;
}

export default function CartProductCard(props: ProductProps) {
    const { item, setSubtotal } = props;
    const { _id, qty } = item;
    const dispatch = useDispatch();
    // console.log(_id, qty, "product details")
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>();
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/products/product/${_id}`);
                if (resp.status === 200) {
                    setProduct(resp.data.product);
                    setSubtotal((prevSubtotal) => prevSubtotal + qty * Number(resp.data.product.price));
                } else {
                    setError(resp.data);
                }
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchItem();
    }, [_id, qty, setSubtotal]);
    const changeQty = createAction<ItemPayload>(actions.UPDATE_QT);
    const removeItem=createAction<RemoveItemPayload>(actions.REMOVE_ITEM);
    const increaseQty = () => {
        // console.log("increase");
        dispatch(changeQty({ ...item, qty: qty + 1 }));
    }
    const reduceQty = () => {
        // console.log("reduce")
        dispatch(changeQty({ ...item, qty: qty - 1 }));
    }
    const removeItemHandler=()=>{
        console.log(_id);
        dispatch(removeItem({itemId:_id}));
    }
    return (
        <section className=''>
            {
                (product && !loading && !error) &&
                <div className='grid grid-cols-5 px-5 py-3'>
                    <img src={product.image_url} className=' rounded-md col-span-1 ' alt="" />
                    <div className='flex flex-col px-5 py-3 col-span-3'>
                        <h1 className=' font-bold text-3xl'>{product.name}</h1>
                        <p className='text-lg my-5'>{product.description}</p>

                        <div className='text-3xl flex mt-auto items-center'>
                            <StarRatingComponent
                                name="productRating"
                                starCount={5}
                                value={product.rating}
                            />
                            <p className='text-sm'>({product.ratingCount})</p>
                        </div>

                        <div className='my-2'>
                            <button className='px-4 py-2 rounded-md bg-slate-100 text-black font-extrabold' onClick={increaseQty}>+</button>
                            <span className='px-4 font-extrabold'>{qty}</span>
                            <button className='px-4 py-2 rounded-md bg-slate-100 text-black font-extrabold' onClick={reduceQty}>-</button>
                        </div>
                        <div className='mt-3'>
                            <button className='bg-green-500 text-white px-4 py-2 font-bold rounded-md flex items-center'><span className='mx-2'> Free Delivery </span><TbTruckDelivery size={30} /> </button>
                        </div>
                        {/* <button>Remove Item</button> */}
                    </div>
                    <div className='px-5 py-3 font-bold text-xl'>
                        <div>₹ {product.price}</div>
                        <button className='bg-[#ffd60a] text-black py-3 px-3 rounded-md' onClick={removeItemHandler}>Remove Item</button>
                    </div>
                </div>
            }
        </section>
    )
}
