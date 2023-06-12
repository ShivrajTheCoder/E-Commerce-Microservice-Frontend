import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import axios from 'axios';

export default function ProductContainer() {
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
            await axios.get(`http://localhost:8080/products/getallproducts`)
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
    }, [])
    return (
        
            <section className='flex flex-col justify-center items-center w-full'>
                {
                    (!loading && products) && <div className='grid grid-cols-4 w-full'>

                        {products.map((product) => (
                            <ProductCard setChanges={setChanges} key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>
    )
}
