import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import * as actions from "../../store/reducers/cartActions";
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
    const increaseQty = () => {
        console.log("increase");
        dispatch(changeQty({ ...item, qty: qty + 1 }));
    }
    const reduceQty = () => {
        console.log("reduce")
        dispatch(changeQty({ ...item, qty: qty -1 }));
    }
    return (
        <section className=''>
            {
                (product && !loading && !error) &&
                <div className='grid grid-cols-10 px-5 py-3'>
                    <img src={product.image_url} className='grid-cols-4 rounded-md' alt="" />
                    <div className='grid-cols-6'>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <div className='text-3xl flex  items-center'>
                            <StarRatingComponent
                                name="productRating"
                                starCount={5}
                                value={product.rating}
                            />
                            <p className='text-sm'>({product.ratingCount})</p>
                        </div>
                        <div>
                            <button onClick={increaseQty}>+</button>
                            <span>{qty}</span>
                            <button onClick={reduceQty}>-</button>
                        </div>
                    </div>
                    <button>Remove Item</button>
                </div>
            }
        </section>
    )
}
