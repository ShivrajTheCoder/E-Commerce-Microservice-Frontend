import React from 'react'

type ChangeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>void;
interface InputProps{
  id:string;
  name:string;
  type:string;
  label:string;
  placeholder:string;
  value?:string;
  onChange?:ChangeHandler
}
export default function InputComponent(props:InputProps) {
  // console.log(props)
  const {id,type,name,label,placeholder}=props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} name={name} id={id} value={props.value} placeholder={placeholder} onChange={props.onChange} />    
    </div>
  )
}
