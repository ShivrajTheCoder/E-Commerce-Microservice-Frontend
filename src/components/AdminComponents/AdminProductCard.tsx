import axios from 'axios';
import React, { useState } from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../InputComponent';
import StarRatingComponent from 'react-star-rating-component';
import LoadingComponent from '../LoadingComponent';
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
export default function AdminProductCard(props: ProductCardProps) {
    const { product, setChanges } = props;
    const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
    const [loading, setLoading] = useState<Boolean>(false);
    const [updateValues, setUpdateValues] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
    })
    const { name, price, description } = updateValues;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const [show, setShow] = useState(false);
    const deleteHandler = async () => {
        setLoading(true);
        await axios.delete(`${apiUrl}/products/product/${product._id}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("success");
                    toast.success("Product Deleted");
                    setChanges(prev => !prev);
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
        setLoading(false);
    }
    const updateHandler = async () => {
        // setShow(true);
        // console.log("I ram");
        setLoading(true);
        if (name && price && description) {
            await axios.put(`http://localhost:8080/products/product/${product._id}`, {
                name, price, description
            })
                .then(response => {
                    if (response.status === 200) {
                        toast.success("Product Updated");
                        setChanges(prev => !prev);
                        setShow(false);
                    }
                    else {
                        toast.error("Failed to update!");
                    }
                })
                .catch(error => {
                    toast.error("Failed to update!");
                })
        }
        // console.log("update");
        setLoading(true);
    }
    return (
        <>
            {!loading &&<div className='rounded-b-xl bg-[#f6f6f6] '>
                <img className='h-96 w-full rounded-t-xl' src={product.image_url} alt={product.name} />
                <div className='px-5'>
                    {
                        <>
                            <div className='flex font-bold text-xl mt-3'>
                                <h2 className=''>{product.name}</h2>
                                <p className='ml-auto mr-5'>₹{product.price}</p>
                            </div>
                            <p className='mt-3 font-semibold text-lg'>{product.description.substring(0, 150) + "..."}</p>
                            <div className='text-3xl flex  items-center'>
                                <StarRatingComponent
                                    name="productRating"
                                    starCount={5}
                                    value={product.rating}
                                />
                                <p className='text-sm'>({product.ratingCount})</p>
                            </div>
                        </>}

                    {
                        show && <div>
                            <InputComponent id="name"
                                name="name"
                                type="text"
                                label="Name"
                                value={name}
                                onChange={handleChange}
                                placeholder="Enter Name" />
                            <InputComponent id="price"
                                name="price"
                                type="number"
                                label="Price"
                                value={price}
                                onChange={handleChange}
                                placeholder="Enter price" />
                            <div>
                                <div className='flex flex-col'>
                                    <label className='font-bold text-lg' htmlFor="description">Description</label>
                                    <textarea
                                        className='rounded-sm bg-white px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                                        id="description"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                        placeholder="Enter description"
                                        cols={20}
                                        rows={5}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !show &&
                        <div className='grid grid-cols-2 gap-4 font-bold text-lg my-3'>
                            <button onClick={deleteHandler} className='flex bg-black text-white rounded-md py-3 px-3 justify-center items-center'><RiDeleteBinFill /> <span className='mx-3'>Delete</span></button>
                            <button className='flex bg-green-500 text-white rounded-md py-3 px-3 justify-center items-center' onClick={() => setShow(true)}><RxUpdate /> <span className='mx-3'>Update</span></button>
                        </div>
                    }
                    {
                        show &&
                        <div className='grid grid-cols-2 gap-4 font-bold text-lg my-3'>
                            <button className='flex bg-black text-white rounded-md py-3 px-3 justify-center items-center' onClick={() => setShow(false)}><span className='mx-3'>Cancel</span></button>
                            <button className='flex bg-green-500 text-white rounded-md py-3 px-3 justify-center items-center' onClick={updateHandler}><span className='mx-3'>Confirm</span></button>
                        </div>
                    }
                </div>
                <ToastContainer />
            </div>}
            {
                loading && <LoadingComponent/>
            }
        </>
    );
}
