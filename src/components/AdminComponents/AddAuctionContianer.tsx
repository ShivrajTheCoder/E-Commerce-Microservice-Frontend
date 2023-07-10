import InputComponent from '@/components/InputComponent';
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddAuctionContianer() {
    const [inputValues, setInputValues] = useState({
        name: "",
        startingBid: "",
        minBidInc: "",
        date: "",
        time: "",
        end:"",
        description: "",
    })
    const { name, startingBid, minBidInc, date, time, description,end } = inputValues;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
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
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(inputValues, selectedDate, selectedTime);
        if (name && selectedImage && startingBid && minBidInc && date && time && description && end) {
            // const data = {
            //     ...inputValues
            // };
            const data = new FormData();
            data.append("name", name);
            data.append("startingBid", startingBid);
            data.append("minBidInc", minBidInc);
            data.append("date", date);
            data.append("time", time);
            data.append("img", selectedImage);
            data.append("description", description);
            data.append("end",end);
            console.log(data);
            await axios.post(`http://localhost:8085/auction/createauction`, data)
                .then(resp => {
                    console.log(resp);
                    if (resp.status === 201) {
                        toast.success("Created");
                    }
                    else {
                        toast.error("Something went wrong!");
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Something went wrong!");
                })
        }
    }
    return (
        <div className='my-10 border-2 flex flex-col items-center bg-[#f6f6f6] w-[70%] px-10 py-5 rounded-lg shadow-lg'>
            <h2 className='font-bold text-2xl '>Add Auction</h2>
            <form onSubmit={submitHandler} className='w-full'>
                <div className='grid grid-cols-2 gap-5'>
                    <InputComponent id="name"
                        name="name"
                        type="text"
                        label="Name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter name" />
                    <div className='w-full h-fit py-3 flex flex-col'>
                        <p className='font-bold text-lg  mx-5'>Product Image</p>
                        <label htmlFor="img" className='bg-green-500 w-full text-white font-bold text-lg px-4 py-2 mx-5 rounded-md'>Choose Image</label>
                        <input className='hidden' onChange={handleImageChange} type="file" name="img" id="img" />
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
                <div className='grid grid-cols-2 gap-5'>

                    <InputComponent id="startingBid"
                        name="startingBid"
                        type="number"
                        label="Starting Bid"
                        value={startingBid}
                        onChange={handleChange}
                        placeholder="Enter Starting Bid" />
                    <InputComponent id="minBidInc"
                        name="minBidInc"
                        type="number"
                        label="Minimum Bid"
                        value={minBidInc}
                        onChange={handleChange}
                        placeholder="Enter minimum Bid Increment" />
                </div>
                <div className=''>
                    <div className='grid grid-cols-3 gap-2'>
                        <InputComponent id="date"
                            name="date"
                            type="date"
                            label="Starting Date"
                            value={date}
                            onChange={handleChange}
                            placeholder="Choose Date" />
                        <InputComponent id="time"
                            name="time"
                            type="time"
                            label="Start time"
                            value={time}
                            onChange={handleChange}
                            placeholder="Enter time" />
                        <InputComponent id="end"
                            name="end"
                            type="time"
                            label="End time"
                            value={end}
                            onChange={handleChange}
                            placeholder="Enter time" />
                    </div>
                </div>
                <button className='bg-black my-5 w-fit mx-auto text-white font-bold text-lg px-4 py-3 rounded-md'>Schedule Auction</button>
            </form>
            <ToastContainer />
        </div>
    )
}
