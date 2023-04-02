import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../storage";
import { removeStorageLogin } from "../storage";
import $ from "jquery";
const Profile = () => {
  const allProducts = JSON.parse(localStorage.getItem("products"));


  const navigate = useNavigate();
  if (!checkUser()) {
    navigate("/", { state: { refreshForUpdate: 1 } });
  }
  const [id, setId] = useState(localStorage.getItem("id"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [products, setProducts] = useState(localStorage.getItem("productsLength")
  );

  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const [formPhone, setFormPhone] = useState(phone);

  const handleLogout = (e) => {
    localStorage.clear();
    navigate("/", { state: { refreshForUpdate: 1 } });
  };

  const openModal = () => {
    console.log("open modal");
    $("#authentication-modal").removeClass("hidden");
  };

  const closeModal = () => {
    $("#authentication-modal").addClass("hidden");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`https://localhost:7116/api/Dealers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(formName);
      console.log(formEmail);
      console.log(formPhone);
      res.json().then(async (data) => {
        await fetch(`https://localhost:7116/api/Dealers/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: data.id,
            Name: formName,
            Email: formEmail,
            PhoneNumber: formPhone,
            Password: data.password,
            Products: allProducts
          })
        }).then(async (res) => {
          await fetch(`https://localhost:7116/api/Dealers/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            res.json().then((data) => {
              setName(data.name);
              setEmail(data.email);
              setPhone(data.phoneNumber);
              localStorage.setItem("name", data.name);
              localStorage.setItem("email", data.email);
              localStorage.setItem("phone", data.phoneNumber);
              $("#authentication-modal").addClass("hidden");
              navigate("/profile", { state: { refreshForUpdate: 1 } });
            });
          });
        });
      });
    })
  };

  const handleName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFormName(e.target.value);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setFormEmail(e.target.value);
  };
  const handlePhone = (e) => {
    e.preventDefault();
    setFormPhone(e.target.value);
  };

  return (
    <>
      <NavBar />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {products}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Products
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                    {email}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-phone-alt mr-2 text-lg text-blueGray-400"></i>
                    {phone}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex justify-center items-center space-x-14">
                    <button
                      type="button"
                      onClick={openModal}
                      data-modal-target="authentication-modal"
                      data-modal-toggle="authentication-modal"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div
                  id="authentication-modal"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
                >
                  <div className="flex justify-center relative w-full h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-hide="authentication-modal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="w-96 px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          Update Product
                        </h3>
                        <form className="space-y-6" action="#">
                          <div>
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Name"
                              defaultValue={name}
                              onChange={handleName}
                              required
                            ></input>
                          </div>

                          <div>
                            <label
                              htmlFor="price"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              name="price"
                              id="price"
                              placeholder="50"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              onChange={handleEmail}
                              defaultValue={email}
                              required
                            ></input>
                          </div>
                          <div>
                            <label
                              htmlFor="quantity"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Phone No.
                            </label>
                            <input
                              type="text"
                              name="quantity"
                              id="quantity"
                              placeholder="100"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              onChange={handlePhone}
                              defaultValue={phone}
                              required
                            ></input>
                          </div>
                          <button
                            onClick={handleUpdate}
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
