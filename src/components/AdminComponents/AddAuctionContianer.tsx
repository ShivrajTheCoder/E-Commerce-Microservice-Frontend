import InputComponent from '@/components/InputComponent';
import axios from 'axios';
import React, { useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddAuctionContianer() {
    const [inputValues, setInputValues] = useState({
        name: "",
        img_url: "",
        startingBid: "",
        minBidInc: "",
    })
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleTimeChange = (value: string | string[] | null) => {
        const time = value !== null ? value.toString() : ""; // Convert null to empty string
        setSelectedTime(time);
    };
    const { name, img_url, startingBid, minBidInc } = inputValues;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(inputValues, selectedDate, selectedTime);
        if (name && img_url && startingBid && minBidInc && selectedDate && selectedTime) {
            const data = {
                ...inputValues, date: selectedDate.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }), time: selectedTime
            };
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
                    <InputComponent id="img_url"
                        name="img_url"
                        type="text"
                        label="Image Url"
                        value={img_url}
                        onChange={handleChange}
                        placeholder="Enter Image Url" />
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
                <div className='grid grid-cols-2'>
                    <div>
                        <label htmlFor="date" className='font-bold text-lg'>Date</label>
                        <DatePicker id="date"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="bg-white rounded-sm h-10 px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="time" className='font-bold text-lg'>Time</label>
                        <TimePicker
                            id="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="bg-white rounded-sm h-10 px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button className='bg-black my-5 w-fit mx-auto text-white font-bold text-lg px-4 py-3 rounded-md'>Schedule Auction</button>
            </form>
            <ToastContainer />
        </div>
    )
}
