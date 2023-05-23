import axios from 'axios';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function ProductCard(props: ProductCardProps) {
    const { product, setChanges } = props;
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
        <div className=''>
            <img className='h-96' src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <StarRatingComponent
                name="productRating"
                starCount={5}
                value={product.rating}
                onStarClick={onStarClick}
            />
            <p>Rating Count: {product.ratingCount}</p>
            <ToastContainer />
        </div>
    );
}
