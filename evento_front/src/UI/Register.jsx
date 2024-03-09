import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axios';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [userType, setUserType] = useState(null);
  const [errors, setErrors] = useState({});


  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/register', {
        email,
        name,
        password,
        password_confirmation: passwordConfirmation,
        userType,

      });
      console.log(errors);
      console.log('Registration successful:', response.data);
      if (response.data.status === 'success') {
        navigate('/login');
      }

    } catch (error) {
      if (error.response && error.response.status === 403 && error.response.data) {
        setErrors(error.response.data.data);
        console.log(error.response.data.data);
      } 
    }
  };


  return (
    <>
      <div className="mt-10 w-1/2 sm:mx-auto sm:w-full sm:max-w-sm rounded  p-10  " style={{ 'border': '3px solid rgb(79 70 229)', 'borderRadius': '10px' }}>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        
          Sign Up to your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
            {errors.email && <div className="text-red-700">{errors.email[0]}</div>}
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
              Name
            </label>
            <div className="mt-2">
            {errors.name && <div className="text-red-700">{errors.name[0]}</div>}

              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

            </div>
            <div className="mt-2">
            {errors.password && <div className="text-red-700">{errors.password[0]}</div>}
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password Confirmation
              </label>

            </div>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Check your status
              </label>
            
            </div>
            {errors.userType && <div className="text-red-700">{errors.userType[0]}</div>}

            <div className="mt-2 flex gap-4 h-10 " style={{ 'alignItems': 'center' }}>

              <div class="flex items-center mb-4">
                <input
                  id="organizator"
                  name="userType"
                  type="radio"
                  value="organizator"
                  checked={userType === 'organizator'}
                  onChange={handleUserTypeChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-300">Organizator</label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="reservator"
                  name="userType"
                  type="radio"
                  value="reservator"
                  checked={userType === 'reservator'}
                  onChange={handleUserTypeChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-300">Reservator</label>
              </div>
            </div>

          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account{' '}
          <Link to='/login'
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In </Link>

        </p>


      </div>
    </>
  )
}

export default Register