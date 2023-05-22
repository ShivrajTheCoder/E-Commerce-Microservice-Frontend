import axios from 'axios';
import React, { useState } from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';
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
}
export default function AdminProductCard(props: ProductCardProps) {
    const [show, setShow] = useState(false);
    const { product } = props;
    const deleteHandler = async () => {
        await axios.delete(`http://localhost:8080/products/product/${product._id}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("success");
                    toast.success("Product Deleted")
                }
                else {
                    console.log("failure");
                    toast.error("Something went wrong!")
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong!")
            })
        // console.log("deleter");
    }
    const updateHandler = () => {
        setShow(true);
        console.log("update");
    }
    return (
        <div className=''>
            <img className='h-96' src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Rating Count: {product.ratingCount}</p>
            <button onClick={deleteHandler} ><RiDeleteBinFill /> Delete</button>
            <button onClick={updateHandler}><RxUpdate /> Update</button>
            <ToastContainer />
        </div>
    );
}
