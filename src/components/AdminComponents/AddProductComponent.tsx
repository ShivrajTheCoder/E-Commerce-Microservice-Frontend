import React, { ChangeEvent, FormEvent, useState } from 'react'
import InputComponent from '../InputComponent';
import axios from "axios"
export default function AddProductComponent() {
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
    // console.log(apiUrl,"idladsjlfa");
    const [productValues, setProductValues] = useState({
        name: "",
        price: 500,
        description: "",
    })
    const { name, price, description } = productValues;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleAddProduct = async (event: FormEvent) => {
        event.preventDefault();
        console.log("HIii");
        const productData = new FormData();
        console.log(selectedImage, productValues);
        if (name && price && description) {
            // productData.append('file', selectedImage, selectedImage.name);
            // productData.append("name", name);
            // productData.append("price", price.toString());
            // productData.append("description", description);
            // const sendData = {
            //     name: 'ldfjsdlf',
            //     boobs: "lsfjdldsk"
            // }
            await axios.post(`http://localhost:8080/products/addproduct`, {
                name, price, description
            })
                .then(response => {
                    if (response.status === 201 || response.status === 200) {
                        console.log(response, "sucess");
                    }
                    else {
                        console.log(response, "failed");
                    }
                })
                .catch(error => {
                    console.log("error");
                    if (error.response) {
                        // Request was made and server responded with a status code
                        console.error('Server Error:', error.response.data);
                    } else if (error.request) {
                        // Request was made but no response was received
                        console.error('Request Error:', error.request);
                    } else {
                        // Something else happened while setting up the request
                        console.error('Error:', error.message);
                    }
                })
        }
        else {
            console.log("something went wrong!");
        }

    }
    return (
        <div className='my-10 border-2 flex flex-col items-center bg-[#f6f6f6] w-[70%] px-10 py-5 rounded-lg shadow-lg'>
            <h2 className='font-bold text-2xl '>Add Product</h2>
            <form onSubmit={handleAddProduct} className='w-full'>

                <InputComponent id="name"
                    name="name"
                    type="text"
                    label="Name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter Name" />
                <div className='grid grid-cols-3'>
                    <div className='col-span-2'>
                        <InputComponent id="price"
                            name="price"
                            type="number"
                            label="Price"
                            value={price}
                            onChange={handleChange}
                            placeholder="Enter price" />
                    </div>
                    <div className='w-full h-fit py-3 flex flex-col'>
                        <label className='bg-blue-500 w-fit mx-auto text-white font-bold text-lg px-4 py-3 rounded-md' htmlFor="productimage">Select Image</label>
                        <input className='hidden' type="file" accept='images/*' name="productimage" id="productimage" onChange={handleImageChange} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor="description" className='font-bold text-lg'>Description</label>
                    <textarea
                        className='rounded-sm bg-white px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescChange}
                        placeholder="Enter description"
                        cols={30}
                        rows={10}
                    ></textarea>
                </div>
                <button className='bg-black my-5 w-fit mx-auto text-white font-bold text-lg px-4 py-3 rounded-md' type="submit">Add Product</button>
            </form>
        </div>
    )
}
