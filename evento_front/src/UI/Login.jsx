import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";


const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await axiosClient.post('/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        setCurrentUser(response.data.email, response.data.name, response.data.role);
        setUserToken(response.data.token);
        navigate('/');
      }
  
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data) {
        setErrors(error.response.data.data);
        console.log(error.response.data.data);
      }
    }
  };
  return (
    <>
      <div className="mt-10 w-1/2 sm:mx-auto sm:w-full sm:max-w-sm rounded  p-10  " style={{ 'border': '3px solid rgb(79 70 229)', 'borderRadius': '10px' }}>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
        {errors.message && <div className="text-red-700">{errors.message[0]}</div>}

        <form onSubmit={handleSubmit} className="space-y-6" >
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          i don't have an account !{' '}
          <Link to='/signup'
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up </Link>

        </p>


      </div>
    </>
  )
}

export default Login