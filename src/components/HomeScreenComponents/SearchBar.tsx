import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface IResult{
  _id:string;
  name:string;
}

export default function SearchBar() {
  const [param,setParam]=useState<String>();
  const [results,setResults]=useState<IResult[] | undefined>();
  useEffect(()=>{
    const timer=setTimeout(()=>{
      
      const fetchResults=async()=>{
        try{
          const resp=await axios.get(`http://localhost:8080/products/search/${param}`);
          if(resp.status===200){
            console.log(resp.data.products)
            setResults(resp.data.products);
          }
        }
        catch(error){
          console.log(error);
          setResults([])
        }
      }
      fetchResults();
    },1000)
    return ()=>{
      clearTimeout(timer);
    }
  },[param])
  return (
    <div className='flex flex-col justify-center items-center'>
        <input className='w-full bg-[#f6f6f6] rounded-xl mt-10 text-black px-32 py-5 ' type="text" onChange={(e)=>{setParam(e.target.value)}} name="search-params" id="search-param" placeholder='What do you want today?' />
        
          {
            results &&
            <ul className='w-full rounded-b-md px-3 bg-gray-100 '>
              {
                results.map((result)=>(
                  <li className='font-semibold text-xl py-1 w-full border-t-2  border-blue-500' key={result._id}>{result.name}</li>
                ))
              }
            </ul>
          }
        
    </div>
  )
}
