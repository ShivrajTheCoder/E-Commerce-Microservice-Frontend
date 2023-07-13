import { RootState } from '@/store/reducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface IAccount {
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    _id: string;
}
export default function accountdetails() {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [account, setAccount] = useState<IAccount>();
    const [error, setError] = useState<any>();
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
    useEffect(() => {
        const checkLogin = () => {
            if (!user.isLoggedin && user.userId) {
                router.push("/");
            }
        }
        const fetchAccount = async () => {
            try {
                const resp = await axios.get(`${apiUrl}/auth/accountdetails/${user.userId}`);
                if (resp.status === 200) {
                    setAccount(resp.data.user);
                    // console.log(resp.data.user, "This is the response");
                }
                else {
                    setError( "Something went wrong!" );
                    toast.error("Something went wrong!");
                }
            }
            catch (error) {
                setError(error);
                toast.error("Something went wrong!");
            }
        }
        checkLogin();
        fetchAccount();
        setIsLoading(false);
    }, [])
    return (
        <article className='flex flex-col justify-center items-center p-10 h-100'>
            <h1 className='py-2 text-3xl font-bold'>Account Details</h1>
            {
                (!isLoading && account) && <section className='grid grid-cols-2 rounded-md gap-3 w-full m-5 w-75 mb-20'>
                    <div className='col-span-1 px-5'>
                        <div className='text-xl font-bold'>First Name</div>
                        <div className='my-2 bg-green-300 text-lg font-semibold px-5 text-white rounded-md py-2'>{account.firstName}</div>
                    </div>
                    <div className='col-span-1 px-5'>
                        <div className='text-xl font-bold'>Last Name</div>
                        <div className='my-2 bg-green-300 text-lg font-semibold px-5 text-white rounded-md py-2'>{account.lastName}</div>
                    </div>
                    <div className='col-span-1 px-5'>
                        <div className='text-xl font-bold'>Email</div>
                        <div className='my-2 bg-green-300 text-lg font-semibold px-5 text-white rounded-md py-2'>{account.email}</div>
                    </div>
                    <div className='col-span-1 px-5'>
                        <div className='text-xl font-bold'>Phonenumber</div>
                        <div className='my-2 bg-green-300 text-lg font-semibold px-5 text-white rounded-md py-2'>{account.phoneNumber}</div>
                    </div>
                    <div className='col-span-2 px-5'>
                        <div className='text-xl font-bold'>Address</div>
                        <div className='my-2 bg-green-300 text-lg font-semibold px-5 text-white rounded-md py-2 h-fit w-full'>{account.address}</div>
                    </div>
                </section>
            }
            <ToastContainer/>
        </article>
    )
}
