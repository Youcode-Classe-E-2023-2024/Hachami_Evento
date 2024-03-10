import React, { useState, useEffect } from 'react';
import InputField from "components/fields/InputField";
import { TextInput, } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import axiosClient from "../../axios";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useStateContext } from '../../contexts/ContextProvider'; 


export default function SignIn() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setCurrentUser, setUserToken } = useStateContext();


  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://127.0.0.1:8000/api/login', formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setCurrentUser(response.data.email, response.data.name, response.data.role);
          setUserToken(response.data.token);
          navigate('/admin/');
        }
      })
     .catch((error) => {
      console.log(error);
     })
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-full' >
      <div class="flex items-center justify-center h-[76vh]">

        <div class="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
            <div className="rounded-full text-xl">
              <FcGoogle />
            </div>
            <h5 className="text-sm font-medium text-navy-700 dark:text-white">
              Sign In with Google
            </h5>
          </div>
          <div className="mb-6 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            <p className="text-base text-gray-600 dark:text-white"> or </p>
            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          </div>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button type='submit' className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>

        </div>
      </div>
    </form>

  );
}
