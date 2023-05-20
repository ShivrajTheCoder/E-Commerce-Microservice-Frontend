import Image from 'next/image'
import { Inter } from 'next/font/google'
import InputComponent from "../components/InputComponent"
import { useState } from 'react'
export default function Home() {
  const [inputValues,setInputValues]=useState({
    email:"",
    password:"",
  })
  const {email,password}=inputValues;
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target;
    setInputValues((prev)=>({
      ...prev,
      [name]:value,
    }))
  }
  const submitHandler=(e:React.SyntheticEvent)=>{
    e.preventDefault();
    console.log(inputValues);
  }
  return (
    <main>
      <form onSubmit={submitHandler}>
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
          <button>Sign In</button>
      </form>
    </main>
  )
}
