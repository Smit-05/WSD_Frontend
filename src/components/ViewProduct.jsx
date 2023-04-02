import React from 'react'
import { useParams } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import NavBar from './NavBar';
import products from '../assets/product.png'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../storage';
function ViewProduct() {
    const navigate = useNavigate();
  if(!checkUser()){
    navigate('/', { state: { refreshForUpdate: 1 } })
  }
    const [param, setparam] = useState(useParams())
    const [product, setproduct] = useState({
        id:param.id,
        name:"",
        description:"",
        price:"",
        quantity:""
    })

    useEffect(() => {
        getproduct();
    },[])
    
    const getproduct = async () =>{
        await fetch(`https://localhost:7116/api/Products/${param.id}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) =>
        res.json().then((data) => {
            console.log(data);
            setproduct(data)
        })
        )
    }
    
    return (
    <>
        <NavBar/>
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt="img of a girl posing" src={products} />
                
            </div>
            <div className="md:hidden">
                <img className="w-full" alt="img of a girl posing" src={products}/>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                    <h1
                        className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                    >
                        {product.name}
                    </h1>
                </div>
               
                <div>
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">{product.description}</p>
                    <p className="text-base leading-4 mt-7 text-gray-600">Price: {product.price}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Quantity: {product.quantity}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewProduct