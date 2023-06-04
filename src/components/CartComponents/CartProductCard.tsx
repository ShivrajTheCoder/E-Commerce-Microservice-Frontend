import axios from 'axios';
import React, { useState, useEffect } from 'react'

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

interface ProductProps {
    item: {
        _id: string;
        qty: number;
    };
}

export default function CartProductCard(props: ProductProps) {
    const { item } = props;
    const { _id, qty } = item;
    console.log(_id, qty, "product details")
    const [product, setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchItem = async () => {
            await axios.get(`http://localhost:8080/products/product/${_id}`)
                .then(resp => {
                    if (resp.status === 200) {
                        console.log(resp.data.product, "fetched");
                        setProduct(resp.data.product)
                    }
                    else {
                        console.log(resp, "response");
                        setError(resp.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setError(err);
                })
            setLoading(false);
        }
        fetchItem();
    }, [])
    return (
        <div>
            {
                (product && !loading && !error) && <div>
                    <h1>Name :{product.name}</h1>
                </div>
            }
        </div>
    )
}
