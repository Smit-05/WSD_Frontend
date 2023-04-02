import React from 'react'
import { useState, useEffect } from 'react'
import Humming from '../assets/Humming.png'
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { setStorageLogin, removeStorageLogin, checkUser } from '../storage';
import {ToastContainer,toast} from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        var mail = e.target.value;
        setEmail(mail);
        console.log(mail)
    }

    const handlePassword = (e) => {
        var password = e.target.value;
        setPassword(password);
        console.log(password)
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        var link = `/api/Dealers/login?email=${email}&password=${password}`
        await axios.post(link, {
            email,
            password
        }).then(async (res) => {
            setStorageLogin(res.data.id)
            localStorage.setItem("name", res.data.name)
            localStorage.setItem("email", res.data.email)
            localStorage.setItem("phone", res.data.phoneNumber)
            await fetch(`https://localhost:7116/api/Products/${res.data.id}/get_products`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then((res) => {
                res.json().then((data) => {
                  localStorage.setItem('productsLength', data.length)
                  localStorage.setItem('products',JSON.stringify(data))
                })
            })
            navigate('/home', { state: { refreshForUpdate: 1 } })
        })
    }

    const [name, setname] = useState("");
    // const [email,setemail]=useState("");
    const [phone, setphone] = useState("");
    // const [password,setpassword]=useState("");

    const submitSignUp = async (e) => {
        e.preventDefault();
        fetch('https://localhost:7116/api/Dealers/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: 0,
                Name: name,
                Email: email,
                PhoneNumber: phone,
                Password: password,
            })
        }).then((res) => {
            res.json().then((data) => {
                setStorageLogin(data.id)
                localStorage.setItem("name", data.name)
                localStorage.setItem("email", data.email)
                localStorage.setItem("phone", data.phoneNumber)
                localStorage.setItem("productsLength", 0)
                toast.success("Sign Up Successful");
                navigate('/home', { state: { refreshForUpdate: 1 } })

            })
        })
    }

    useEffect(() => {
        if (checkUser()) {
            navigate('/home', { state: { refreshForUpdate: 1 } })
        }
    }, [])



    return (
        <>
            <div className='flex w-full min-h-screen bg-black'>
                <ToastContainer/>
                <div className='w-2/3 text-white grid content-center'>
                    <div className='sm:bg-humming md:bg-humming lg:bg-humming bg-cover bg-center' style={{ height: '26rem', width: '30rem' }}>
                    </div>
                </div>
                {isLogin &&
                    <div className='w-1/3 flex  flex-col justify-center items-center'>
                        <form className='flex flex-col w-3/4 border p-5 rounded-xl border-gray-700'>
                            <div className='flex justify-center font-lato text-4xl text-white font-bold mb-4'>
                                Sign Up
                            </div>
                            <label htmlFor="name" className="font-bold text-white mt-1 text-lg">Name</label>
                            <input id="name" value={name} onChange={(event) => setname(event.target.value)} className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            <label htmlFor="email" className="font-bold text-white mt-1 text-lg">Email</label>
                            <input id='email' value={email} onChange={(event) => setEmail(event.target.value)} className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            <label htmlFor="phone" className="font-bold text-white mt-1 text-lg">Phone No.</label>
                            <input id='phone' value={phone} onChange={(event) => setphone(event.target.value)} type='number' className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            <label htmlFor="password" className="font-bold text-white mt-1 text-lg">Password</label>
                            <input id='password' onChange={(event) => setPassword(event.target.value)} value={password} type='password' className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            {/* <label htmlFor="cpassword" className="font-bold text-white mt-1 text-lg">Confirm Password</label>
                            <input id='cpassword' onChange={handleInput} type='password' className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input> */}

                            <button onClick={submitSignUp} className='border border-indigo-600 hover:bg-indigo-600 bg-black mt-5 text-white rounded-lg py-2 font-semibold' type="submit">Sign Up</button>
                        </form>
                        <div className='text-white mt-3'>
                            Already have an account? <span className='text-indigo-600 cursor-pointer' onClick={() => setIsLogin(false)}>Login</span>
                        </div>
                    </div>
                }
                {!isLogin &&
                    <div className='w-1/3 flex flex-col justify-center items-center'>
                        <form className='flex flex-col w-3/4 border p-5 rounded-xl border-gray-700'>
                            <div className='flex justify-center font-lato text-4xl text-white font-bold mb-4'>
                                Login
                            </div>
                            <label htmlFor="email" className="font-bold text-white mt-1 text-lg">Email</label>
                            <input id='email' onChange={handleEmail} className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            <label htmlFor="password" className="font-bold text-white mt-1 text-lg">Password</label>
                            <input id='password' onChange={handlePassword} type='password' className='border text-white bg-black rounded-md py-2 px-2 mt-2 border-indigo-600 placeholder-white-500 font-semibold'></input>

                            <button className='border border-indigo-600 bg-black hover:bg-indigo-600 mt-5 text-white rounded-lg py-2 font-semibold' type="submit" onClick={submitLogin}>Login</button>
                        </form>
                        <div className='text-white mt-3'>
                            Don't have account? <span className='text-indigo-600 cursor-pointer' onClick={() => setIsLogin(true)}>Sign Up</span>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default Login