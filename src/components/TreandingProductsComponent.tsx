import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import LoadingComponent from './LoadingComponent';
interface IProduct {
    _id: string;
    _v: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratingCount: number;
    image_url: string;
}

export default function TreandingProductsComponent() {
    const [treanding, setTreading] = useState<IProduct[]>();
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState<Number>(4);
    const [error, setError] = useState<any>();
    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
            // console.log(isMobileDevice,"is a mobile");
            if (isMobileDevice) {
                setNumber(2);
            }
            else {
                setNumber(4);
            }
        };

        // Initial check on component mount
        handleResize();
        const fetchTreanding = async () => {
            setLoading(true);
            // console.log(number,"this is the number");
            const params = {
                number
            }
            try {
                const resp = await axios.get(`http://localhost:8080/products/treadingproducts`, { params });
                if (resp.status === 200) {
                    setTreading(resp.data.treanding)
                }
            }
            catch (error) {
                // console.log(error);
                setError(error);
            }
        }
        fetchTreanding();
        setLoading(false);
    }, [])
    return (
        <>
            {!loading &&<div className='flex flex-col justify-center mt-10 items-center w-full'>
                {
                    (!loading && !error && treanding) && <section className='grid md:grid-cols-4 grid-cols-1 gap-9 w-full'>
                        {
                            treanding.map(product => (

                                <ProductCard setChanges={() => { }} key={product._id} product={product} />
                            ))
                        }
                    </section>
                }
            </div>}
            {loading && <LoadingComponent/>}
        </>
    )
}
