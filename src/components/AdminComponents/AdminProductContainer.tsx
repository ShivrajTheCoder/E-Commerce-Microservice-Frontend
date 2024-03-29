import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminProductCard from './AdminProductCard';
import LoadingComponent from '../LoadingComponent';

export default function AdminProductContainer() {
    const apiUrl=process.env.NEXT_PUBLIC_API_KEY;
    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [products, setProducts] = useState<{
        _id: string;
        _v: number;
        name: string;
        price: number;
        description: string;
        rating: number;
        ratingCount: number;
        image_url: string;
    }[]>([]);
    useEffect(() => {
        const fetchProuducts = async () => {
            await axios.get(`${apiUrl}/products/getallproducts`)
                .then(resp => {
                    if (resp.status === 200) {
                        console.log(resp.data.data);
                        setProducts(resp.data.data);
                    }
                    else {
                        console.log(resp, "error");
                        // setError(resp);
                    }
                })
                .catch(err => {
                    console.log(err, "error");
                })
            setLoading(false);
        }
        fetchProuducts();
    }, [changes])
    return (
        <>
            {!loading &&<section className='flex flex-col justify-center mt-10 items-center w-full'>
                {
                    (!loading && products) && <div className='grid grid-cols-4 gap-9 w-full'>

                        {products.map((product) => (
                            <AdminProductCard setChanges={setChanges} key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>}
            {loading && <LoadingComponent/>}
        </>
    )
}
