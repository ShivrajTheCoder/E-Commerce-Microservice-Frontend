import axios from 'axios';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "../store/reducers/cartActions";
import { RootState } from '@/store/reducers';
import { createAction } from '@reduxjs/toolkit';
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

interface ProductCardProps {
    product: IProduct;
    setChanges: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ItemPayload {
    _id: string;
    qty: number;
}
export default function ProductCard(props: ProductCardProps) {
    const { product, setChanges } = props;
    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();

    const addItem = createAction<ItemPayload>(actions.ADD_ITEM);
    const addToCartHandler = () => {
        const newItem = {
            _id: product._id,
            qty: 1,
        }
        dispatch(addItem(newItem));
    }

    const onStarClick = async (
        nextValue: number,
        prevValue: number,
        name: string
    ) => {
        console.log(`Selected rating: ${nextValue}`);
        await axios.put(`http://localhost:8080/products/rating/${product._id}`, {
            userRating: nextValue,
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    toast.success("Raitng added");
                    setChanges(prev => !prev);
                }
                else {
                    toast.error("Something went wrong!");
                }
            })
            .catch(err => {
                toast.error("Something went wrong!");
            })
    };
    return (
        <div className='rounded-b-xl bg-[#f6f6f6]'>
            <img className='h-96 w-full rounded-t-xl' src={product.image_url} alt={product.name} />
            <div className='p-5'>
                <div className='flex font-bold text-xl'>
                    <h2 className=''>{product.name}</h2>
                    <p className='ml-auto mr-5'>₹{product.price}</p>
                </div>

                <p className='mt-3 font-semibold text-lg'>{product.description.substring(0, 150) + "..."}</p>
                <div className='text-3xl flex  items-center'>
                    <StarRatingComponent
                        name="productRating"
                        starCount={5}
                        value={product.rating}
                        onStarClick={onStarClick}
                    />
                    <p className='text-sm'>({product.ratingCount})</p>
                </div>

                <button className='font-bold mt-auto text-xl bg-black text-white hover:bg-white hover:text-black px-5 py-3 rounded-md' onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <ToastContainer />
        </div>
    );
}
