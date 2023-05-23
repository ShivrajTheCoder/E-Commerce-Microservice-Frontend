import axios from 'axios';
import React, { useState } from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from '../InputComponent';
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
    const { product,setChanges } = props;
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
        await axios.delete(`http://localhost:8080/products/product/${product._id}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("success");
                    toast.success("Product Deleted");
                    setChanges(prev=>!prev);
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
    const updateHandler = async() => {
        // setShow(true);
        console.log("I ram");
        if(name && price && description){
            await axios.put(`http://localhost:8080/products/product/${product._id}`,{
                name,price,description
            })
            .then(response=>{
                if(response.status===200){
                    toast.success("Product Updated");
                    setChanges(prev=>!prev);
                    setShow(false);
                }
                else{
                    toast.error("Failed to update!");
                }
            })
            .catch(error=>{
                toast.error("Failed to update!");
            })
        }
        console.log("update");
    }
    return (
        <div className=''>
            <img className='h-96' src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            {
                show && <InputComponent id="name"
                    name="name"
                    type="text"
                    label="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter Name" />
            }
            <p>{product.description}</p>
            {
                show && <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        cols={20}
                        rows={5}
                    ></textarea>
                </div>

            }

            <p>Price: ${product.price}</p>
            {
                show && <InputComponent id="price"
                    name="price"
                    type="number"
                    label="price"
                    value={price}
                    onChange={handleChange}
                    placeholder="Enter price" />
            }
            <p>Rating: {product.rating}</p>
            <p>Rating Count: {product.ratingCount}</p>

            {
                !show &&
                <div>
                    <button onClick={deleteHandler} ><RiDeleteBinFill /> Delete</button>
                    <button onClick={()=>setShow(true)}><RxUpdate /> Update</button>
                </div>
            }
            {
                show &&
                <div>
                    <button onClick={() => setShow(false)}>Cancel</button>
                    <button onClick={updateHandler }>Confirm</button>
                </div>
            }
            <ToastContainer />
        </div>
    );
}
