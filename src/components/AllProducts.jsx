import React, { useEffect, useState } from 'react'
import lights from '../assets/lights.png'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../storage';
import Loader from './Loader';

function AllProducts() {
    const navigate = useNavigate();
    if (!checkUser()) {
        navigate('/', { state: { refreshForUpdate: 1 } })
    }
    const [responses, setResponses] = useState();
    useEffect(() => {
        fetchProducts();
    }, []);

    const [loader, setLoader] = useState(true);

    let products = [];
    const fetchProducts = async () => {
        await fetch(`https://localhost:7116/api/Products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    var link = `/product/${data[i].id}`
                    products[i] = <a key={i} href={link} className="rounded-md group shadow-xl p-4 hover:shadow-xl hover:shadow-[#f27827]">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                            <img src={lights} className="h-full w-full object-cover object-center group-hover:opacity-75"></img>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{data[i].name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{data[i].price}</p>
                    </a>
                }
                setResponses(products)
                setLoader(false);
            })
        })


    }


    return (
        <>
        <div className="bg-white">
            {loader ? (
            <div className="flex justify-center items-center h-screen"><Loader/></div>
            ) :(
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {responses}
                </div>
            </div>
            )}
            
        </div>
    </>
    )
}

export default AllProducts