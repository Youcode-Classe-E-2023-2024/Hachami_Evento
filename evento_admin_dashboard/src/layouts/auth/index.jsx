import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/auth.png";
import { Link, Routes, Route, Navigate , useNavigate } from "react-router-dom";
import routes from "routes.js";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import { TextInput, } from 'flowbite-react';
import { FcGoogle } from "react-icons/fc";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import React , {useEffect, useState} from "react";


export default function Auth() {
  const {userToken} = useStateContext();
  const token = localStorage.getItem('TOKEN');
  const navigate = useNavigate();

  
  useEffect(()=>{
    if(token){
      navigate('/admin/default');
    }
  },[])

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
    <div className="">
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/admin" className="mt-0 w-max lg:pt-10">
                  <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
                    <svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                        fill="#A3AED0"
                      />
                    </svg>

                  </div>
                </Link>
                <form onSubmit={handleSubmit} className='max-w-full' >
                  <div class="flex items-center justify-center h-[76vh]">

                    <div class="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                      <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                        Sign In
                      </h4>
                      <p className="mb-9 ml-1 text-base text-gray-600">
                        Enter your email and password to sign in!!
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

              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
