import Link from 'next/link';
import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <main className='bg-gray-100 rounded-xl shadow-lg h-[75vh] w-full flex flex-col justify-center items-center'>
      <h1 className='text-red-500 font-bold text-5xl'>{message}</h1>
      <Link href="/" className='my-5 px-5 py-2 bg-yellow-400 text-black font-bold text-xl rounded-md'>Continue Shopping</Link>
    </main>
  );
};

export default ErrorComponent;
