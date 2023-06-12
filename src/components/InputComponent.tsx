import React from 'react'

type ChangeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>void;
interface InputProps{
  id:string;
  name:string;
  type:string;
  label:string;
  placeholder:string;
  value?:string|number;
  onChange?:ChangeHandler
}
export default function InputComponent(props:InputProps) {
  // console.log(props)
  const {id,type,name,label,placeholder}=props;
  return (
    <div className='w-full h-fit py-3 flex flex-col'>
      <label htmlFor={id} className='font-bold text-lg'>{label}</label>
      <input className='bg-white h-10 px-3 border-l-4 border-blue-500' type={type} name={name} id={id} value={props.value} placeholder={placeholder} onChange={props.onChange} />    
    </div>
  )
}
