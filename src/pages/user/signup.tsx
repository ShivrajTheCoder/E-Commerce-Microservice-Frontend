import Link from "next/link";
import { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from "@/components/InputComponent";
interface ISignup {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
}
export default function signup() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
    })
    const { email, password, firstName, lastName, phoneNumber, address, confirmPassword } = inputValues;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let isValid = true;

        // Validate email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (!password || password.length < 6) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Password must be at least 6 characters long');
            isValid = false;
        }

        // Validate confirmPassword
        if (!confirmPassword || confirmPassword !== password) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Passwords do not match');
            isValid = false;
        }

        // Validate firstName
        if (!firstName) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Please enter your first name');
            isValid = false;
        }

        // Validate lastName
        if (!lastName) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Please enter your last name');
            isValid = false;
        }

        // Validate phoneNumber
        if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Please enter a valid phone number');
            isValid = false;
        }

        // Validate address
        if (!address || address.length < 10) {
            toast.dismiss(); // Dismiss any existing error toasts
            toast.error('Please enter a valid address');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await axios.post(`${apiUrl}/auth/signup`, { email, password, firstName, lastName, phoneNumber, address });
                if (response.status === 200) {
                    router.push('/home');
                } else {
                    toast.error('Something went wrong!');
                }
            } catch (error) {
                toast.error('An error occurred');
            }
        }
    };

    return (
        <main className="md:mx-10 mx-3 mb-10 flex flex-col justify-center items-center ">
            <section className="flex my-10  w-full md:mx-0 mx-5 shadow-lg rounded-2xl">
                <form onSubmit={submitHandler} className="bg-[#f6f6f6] rounded-r-2xl w-full md:px-10 px-3 flex flex-col justify-center items-center md:py-0 py-5 ">
                    <h1 className="font-bold text-3xl my-3">Sign Up</h1>
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <InputComponent id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={handleChange}
                            placeholder="Enter First Name" />
                        <InputComponent id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name" />

                        <InputComponent id="password"
                            name="password"
                            type="password"
                            label="Password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter Password" />
                        <InputComponent id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter Confirm Password" />
                        <InputComponent id="email"
                            name="email"
                            type="email"
                            label="Email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter Email" />
                        <InputComponent id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter Phone Number" />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="address" className='font-bold text-lg'>Address</label>
                        <textarea
                            className='rounded-sm bg-white px-3 border-l-4 border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                            id="address"
                            name="address"
                            value={address}
                            onChange={handleDescChange}
                            placeholder="Enter address"
                            cols={10}
                            rows={10}
                        ></textarea>
                    </div>
                    <button className='font-bold md:w-fit w-full mt-10 text-xl bg-black text-white hover:bg-white hover:text-black px-5 py-3 rounded-md'>Sign Up</button>
                    <div className="my-2 font-semibold text-md">Already a user? <Link className="text-blue-500" href={"/home"}>Signin</Link></div>
                </form>
            </section>
            <ToastContainer />
        </main>
    )
}
