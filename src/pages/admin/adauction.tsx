import InputComponent from '@/components/InputComponent';
import axios from 'axios';
import React, { useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function adauction() {
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
            const data={
                ...inputValues, date: selectedDate.toLocaleDateString('en-IN',  { day: '2-digit', month: '2-digit', year: 'numeric' }), time: selectedTime
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
        <div>
            <form onSubmit={submitHandler}>
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
                    label="img_url"
                    value={img_url}
                    onChange={handleChange}
                    placeholder="Enter Image Url" />
                <InputComponent id="startingBid"
                    name="startingBid"
                    type="number"
                    label="startingBid"
                    value={startingBid}
                    onChange={handleChange}
                    placeholder="Enter Starting Bid" />
                <InputComponent id="minBidInc"
                    name="minBidInc"
                    type="number"
                    label="minBidInc"
                    value={minBidInc}
                    onChange={handleChange}
                    placeholder="Enter minimum Bid Increment" />
                <div>
                    <label htmlFor="date">Date</label>
                    <DatePicker id="date"
                        selected={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <TimePicker
                        id="time"
                        value={selectedTime}
                        onChange={handleTimeChange}

                    />
                </div>
                <button>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}
