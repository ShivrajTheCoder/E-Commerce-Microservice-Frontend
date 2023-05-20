import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import axios from 'axios';

export default function ProductContainer() {
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
        <div>
            product container
            <section>
                {
                    (!loading && products) && <div>

                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                }
            </section>
        </div>
    )
}