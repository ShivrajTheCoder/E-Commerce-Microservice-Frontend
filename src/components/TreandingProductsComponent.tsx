import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
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
    const [error, setError] = useState();
    useEffect(() => {
        const fetchTreanding = async () => {
            const params = {
                number: 4
            }
            try {
                const resp = await axios.get(`http://localhost:8080/products/treadingproducts`, { params });
                if (resp.status === 200) {
                    setTreading(resp.data.treanding)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchTreanding();
        setLoading(false);
    }, [])
    return (
        <div className='flex flex-col justify-center mt-10 items-center w-full'>
            {
                (!loading && !error && treanding) && <section className='grid grid-cols-4 gap-9 w-full'>
                    {
                        treanding.map(product => (

                            <ProductCard setChanges={() => { }} key={product._id} product={product} />
                        ))
                    }
                </section>
            }
        </div>
    )
}
