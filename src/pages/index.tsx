import Link from "next/link";
import InputComponent from "../components/InputComponent"
import { useState } from 'react'
export default function Home() {
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
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputValues);
  }
  return (
    <main className="mx-10 mb-10 flex flex-col justify-center items-center ">
      <section className="flex my-10 w-[60%] shadow-lg">
        <div className="w-[70%]">
          <img className="h-[500px] w-full rounded-l-2xl" src="https://res.cloudinary.com/dushmacr8/image/upload/v1686564281/Micro-Ecommerce/homescreen/login_qkhhpd.jpg" alt="girl with headphone" />
        </div>
        
        <form onSubmit={submitHandler} className="bg-[#f6f6f6] rounded-r-2xl w-full px-10 flex flex-col justify-center items-center">
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
          <button className='font-bold mt-10 text-xl bg-black text-white hover:bg-white hover:text-black px-5 py-3 rounded-md'>Sign In</button>
        <div className="my-2 font-semibold text-md">Not a user? <Link className="text-blue-500" href={"/home"}>Signup</Link></div>
        </form>
      </section>
    </main>
  )
}
