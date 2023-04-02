import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import $ from 'jquery'
import lights from '../assets/lights.png'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../storage';
import Loader from './Loader';
function MyProducts() {

  const navigate = useNavigate();
  if (!checkUser()) {
    navigate('/', { state: { refreshForUpdate: 1 } })
  }
  const [loader, setLoader] = useState(true);
  const openModal = async (e, idx) => {
    e.preventDefault();
    await fetch(`https://localhost:7116/api/Products/${idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      await res.json().then((data) => {
        console.log(data)
        localStorage.setItem('dataId', data.id)
        localStorage.setItem('dataName', data.name)
        localStorage.setItem('dataDesc', data.description)
        localStorage.setItem('dataPrice', data.price)
        localStorage.setItem('dataQuantity', data.quantity)
      }).then(() => {
        $('#authentication-modal').removeClass('hidden')
      })
    })

  }

  const closeModal = () => {
    $('#authentication-modal').addClass('hidden')
  }

  const handleName = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    localStorage.setItem('dataName', e.target.value)

  }
  const handleDesc = (e) => {
    e.preventDefault();
    localStorage.setItem('dataDesc', e.target.value)
    console.log(e.target.value)

  }
  const handlePrice = (e) => {
    e.preventDefault();
    localStorage.setItem('dataPrice', e.target.value)
    console.log(e.target.value)
  
  }
  const handleQuantity = (e) => {
    e.preventDefault();
    localStorage.setItem('dataQuantity', e.target.value)
    console.log(e.target.value)

  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:7116/api/Products/${localStorage.getItem('dataId')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ID: localStorage.getItem('dataId'),
        Name: localStorage.getItem('dataName'),
        Description: localStorage.getItem('dataDesc'),
        Price: localStorage.getItem('dataPrice'),
        Quantity: localStorage.getItem('dataQuantity')
      })
    }).then((res) => {
      console.log(res)
      localStorage.removeItem('dataId')
      localStorage.removeItem('dataName')
      localStorage.removeItem('dataDesc')
      localStorage.removeItem('dataPrice')
      localStorage.removeItem('dataQuantity')
      window.location.reload();
    })
  }

  const openDelete = async (e, id) => {
    e.preventDefault();
    localStorage.setItem('tempDataId', id)
    $('#deletion-modal').removeClass('hidden')

  }

  const closeDeleteModal = () => {
    $('#deletion-modal').addClass('hidden')
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('tempDataId')
    await fetch(`https://localhost:7116/api/Products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
      window.location.reload();
    })
  }
  const [responses, setResponses] = useState();
  useEffect(() => {
    fetchProducts();
  }, []);

  let products = [];
  const fetchProducts = async () => {
    let id = localStorage.getItem('id');
    console.log(id)
    await fetch(`https://localhost:7116/api/Products/${id}/get_products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res.json().then((data) => {
        for (let i = 0; i < data.length; i++) {
          var link = `/product/${data[i].id}`
          products[i] = <div key={data[i].id} className="rounded-md shadow-xl p-4 hover:shadow-xl hover:shadow-[#f27827]">
            <a href={link} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img src={lights} className="h-full w-full object-cover object-center group-hover:opacity-75"></img>
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{data[i].name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{data[i].price}</p>
            </a>
            <div className="flex justify-around w-full">
              <button onClick={(e) => { openModal(e, data[i].id) }} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Update
              </button>
              <button onClick={(e) => { openDelete(e, data[i].id) }} data-modal-target="deletion-modal" data-modal-toggle="deletion-modal" className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">
                Delete
              </button>
            </div>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
              <div className="flex justify-center relative w-full h-full md:h-auto">

                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="w-96 px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Product</h3>
                    <form className="space-y-6" action="#">
                      <div>
                        <input type="hidden" name="id" value={data[i].id} />
                      </div>
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" name="name" id="name" defaultValue={localStorage.getItem('dataName')} onChange={handleName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required></input>
                      </div>
                      <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea type="text" name="description" defaultValue={localStorage.getItem('dataDesc')} onChange={handleDesc} id="description" placeholder="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></textarea>
                      </div>
                      <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" defaultValue={localStorage.getItem('dataPrice')} onChange={handlePrice} placeholder="50" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
                      </div>
                      <div>
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number" name="quantity" id="quantity" defaultValue={localStorage.getItem('dataQuantity')} onChange={handleQuantity} placeholder="100" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
                      </div>
                      <button onClick={handleUpdate} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div id="deletion-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
              <div className="w-full md:w-1/3 mx-auto">
                <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                  <div className="flex">
                    <div>
                      <svg className="w-6 h-6 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                    </div>

                    <div className="ml-3">
                      <h2 className="font-semibold text-gray-800">You sure !!!</h2>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">Deleted items cannot be retrived again, make sure you selected the right item.</p>
                    </div>
                  </div>

                  <div className="flex items-center mt-3">
                    <button onClick={closeDeleteModal} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                      Cancel
                    </button>

                    <button onClick={handleDelete} className="flex-1 px-4 py-2 ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
        setResponses(products)
        setLoader(false);
      })
    })


  }
  return (
    <div>
      <NavBar />
      {loader ? (
        <div className="flex justify-center items-center h-screen"><Loader /></div>
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {responses}

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MyProducts