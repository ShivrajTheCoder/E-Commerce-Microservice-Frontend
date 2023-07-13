import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import axios from 'axios';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import LoadingComponent from '../LoadingComponent';
interface INext {
    page: number;
    limit: number;
}

interface IPage {
    current: number;
    previous: number | null;
    total: number;
    next: INext;
}

export default function ProductContainer() {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pagination, setPagination] = useState<IPage>();
    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [number, setNumber] = useState<Number>(8);
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
        const fetchProuducts = async () => {
            let params;
            if (!pageNumber) {
                params = { pages: 1, limit: number }
            }
            else {
                params = { page: pageNumber, limit: number }
            }
            // console.log(pageNumber,"thaplsflj")

            await axios.get(`http://localhost:8080/products/getallproducts`, { params })
                .then(resp => {
                    if (resp.status === 200) {
                        // console.log(resp.data.pagination,"pagination data");
                        setPagination(resp.data.pagination);
                        setProducts(resp.data.data);
                    }
                    else {
                        console.log(resp, "error");
                        // setError(resp);
                    }
                })
                .catch(err => {
                    // console.log(err, "error");
                    setError(err);
                })
            setLoading(false);
        }
        fetchProuducts();
    }, [pageNumber])
    return (
        <>
            {!loading && <section className='flex flex-col justify-center mt-10 items-center w-full'>
                {
                    (!loading && products) && <div className='grid md:grid-cols-4 grid-cols-1 gap-9 w-full'>

                        {products.map((product) => (
                            <ProductCard setChanges={setChanges} key={product._id} product={product} />
                        ))}
                    </div>
                }
                {(pagination && !loading) && (
                    <div className='my-3'>
                        <button onClick={() => {
                            if (pagination.previous) {
                                setPageNumber(prev => prev - 1);
                            }
                        }}>
                            <FaLessThan />
                        </button>
                        <button className='mx-3 text-xl font-bold'>{pagination.current}/{pagination.total}</button>
                        <button onClick={() => {
                            if (pagination.next) {
                                setPageNumber(prev => prev + 1);
                            }
                        }}>
                            <FaGreaterThan />
                        </button>
                    </div>
                )}

            </section>}
            {loading && <LoadingComponent/>}
        </>
    )
}
