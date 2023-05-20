import React from 'react';

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

interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard(props: ProductCardProps) {
    const { product } = props;

    return (
        <div className=''>
            <img className='h-96' src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Rating Count: {product.ratingCount}</p>
        </div>
    );
}
