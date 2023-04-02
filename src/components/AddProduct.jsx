import React from 'react'
import NavBar from './NavBar'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../storage';
import { storage } from '../firebase'
import { ref, uploadBytes } from 'firebase/storage'

function AddProduct() {
    const navigate = useNavigate();
    if (!checkUser()) {
        navigate('/', { state: { refreshForUpdate: 1 } })
    }
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(name, description, price, quantity);
        let id = localStorage.getItem("id");

        const data = await fetch(`https://localhost:7116/api/Dealers/${id}/add_product`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: 0,
                Name: name,
                Description: description,
                Price: price,
                Quantity: quantity,
            })
        }).then((res) => {
            res.json().then((data) => {
                localStorage.setItem("addedProdId", data); 
                toast.success("Product Added Successfully");  
                navigate('/home', { state: { refreshForUpdate: 1 } })
            })
        })


    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const uploadImage = async (e) => {
        if (image === "") {
            alert("Please select an image");
            return;
        }
        const imageRef = ref(storage, `images/${localStorage.getItem("addedProdId")}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            alert("Image uploaded successfully");
        });
    }

    return (
        <>
            <NavBar />
            <div className="my-3 flex justify-center w-full">
                <div className="w-1/2 flex justify-center">
                    <div className="rounded-md shadow p-4 w-full">
                        <form className='w-full' encType='multipart/form-data'>
                            <label htmlFor="company-website" className="mt-3 block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" name="company-website" id="company-website" className="block w-full flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6" placeholder="Name"></input>
                            </div>

                            <label htmlFor="company-website" className="mt-3 block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} id="about" name="about" rows="3" className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:py-1.5 sm:text-sm sm:leading-6" placeholder="Description"></textarea>
                            </div>

                            <label htmlFor="company-website" className="mt-3 block text-sm font-medium leading-6 text-gray-900">Price</label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <input value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" name="company-website" id="company-website" className="block w-full flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6" placeholder="Price"></input>
                            </div>

                            <label htmlFor="company-website" className="mt-3 block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type="number" name="company-website" id="company-website" className="block w-full flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6" placeholder="Quantity"></input>
                            </div>

                        </form>
                            <div>
                                <label className="mt-3 block text-sm font-medium leading-6 text-gray-900">Image</label>
                                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange}></input>
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 text-right sm:px-6">
                                <button onClick={submitHandler} type="submit" className="inline-flex justify-center w-20 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                            </div>
                            <div> 
                            </div>
                    </div>
                </div>

            </div>






        </>
    )
}

export default AddProduct