import Link from "next/link";
import InputComponent from "../components/InputComponent"
import { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "@reduxjs/toolkit";
import * as actions from "../store/reducers/userActions";
import { useRouter } from "next/router";
import { RootState } from "@/store/reducers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface LoginPayload{
  userId:string;
  token:string;
  isAdmin:boolean;
}
export default function Home() {
  const router=useRouter();
  const dispatch=useDispatch();
  const user=useSelector((state:RootState)=>state.user);
  // console.log(user,"from the header");
  const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
  const loggedInUser=createAction<LoginPayload>(actions.LOGIN_SUCCESS);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  })
  const { email, password } = inputValues;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const submitHandler =async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputValues);
    if(email && password){
      // password validation to be added
      await axios.post(`${apiUrl}/auth/signin`,{email,password})
        .then(resp=>{
          if(resp.status===200){
            // console.log("Logged in",resp.data)
            const {userId,token,isAdmin}=resp.data;
            dispatch(loggedInUser({userId,token,isAdmin}));
            router.push("/home");
          }
          else{
            // console.log("Something went wrong!");
            toast.error("Something went wrong!");
          }
        })
        .catch(error=>{
          // console.log(error);
          toast.error(error);
        })
    }
  }
  return (
    <main className="md:mx-10 mx-3 mb-10 flex flex-col justify-center items-center ">
      <section className="flex my-10 md:w-[60%] w-full md:mx-0 mx-5 shadow-lg rounded-2xl">
        <div className="w-[80%] md:block hidden">
          <img className="h-[500px] w-full rounded-l-2xl" src="https://res.cloudinary.com/dushmacr8/image/upload/v1686564281/Micro-Ecommerce/homescreen/login_qkhhpd.jpg" alt="girl with headphone" />
        </div>
        
        <form onSubmit={submitHandler} className="bg-[#f6f6f6] rounded-r-2xl w-full md:px-10 px-3 flex flex-col justify-center items-center md:py-0 py-5">
          <h1 className="font-bold text-3xl">Login</h1>
          <InputComponent id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email" />
          <InputComponent id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password" />
          <button className='font-bold md:w-fit w-full mt-10 text-xl bg-black text-white hover:bg-white hover:text-black px-5 py-3 rounded-md'>Sign In</button>
        <div className="my-2 font-semibold text-md">Not a user? <Link className="text-blue-500" href={"/user/signup"}>Signup</Link></div>
        </form>
      </section>
      <ToastContainer/>
    </main>
  )
}
