
    import { Fragment, useState } from 'react'
    import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
    import { Link } from 'react-router-dom'
    import { useStateContext } from "../contexts/ContextProvider";
    import axiosClient from "../axios";

    const navigation = [
        { name: 'Home', to: '/' },
        // { name: 'Surveys', to: '/surveys' },

    ]
    const NavBar = () => {
        const [openSideBar, setOpenSideBar] = useState(false)
        const { currentUser, userToken, setCurrentUser, setUserToken  } = useStateContext();
        const [profileDropdown, setProfileDropdown] = useState(false)
        const navigate = useNavigate();




        const logout = (ev) => {
            ev.preventDefault();
            axiosClient.post("/logout").then((res) => {
                setCurrentUser(null);
                setUserToken(null);
                setProfileDropdown(false);
                navigate('/');
                
            });
        };



        return (
            <div classNameName="min-h-full">
                <nav className="h-auto  z-[999] p-4 fixed w-full text-white" style={{ backdropFilter: 'blur(10px)' }}>
                    <div className="flex justify-between w-full items-center pb-4">
                        <span className="text-white font-light cursor-pointer flex-1 " ><FontAwesomeIcon onClick={() => setOpenSideBar(!openSideBar)} icon={faBars} style={{ color: '#fff', 'fontSize': '26px', 'marginLeft': '10px', 'cursor': 'pointer' }} /></span>
                        <h1 className="text-center text-[#fc444a] font-light sm:text-[23px] text-[19px] xxl:text-[40px] flex-1">
                            <span className="text-white">Evento</span> Ticket
                        </h1>
                        {
                            !userToken ?
                                <div className="flex justify-end gap-4 mr-2 text-white sm:text-md text-sm flex-1  " id="nav-right">
                                    <Link to='/login' className="w-24 text-center h-14 border border-white p-4 cursor-pointer text-sm hover:bg-[#fc444a] " >Login</Link >
                                    <Link to='/signup' className="w-24 text-center h-14 border border-white p-4 cursor-pointer text-sm hover:bg-[#fc444a] " >Register</Link >
                                </div>
                                : <div class="ml-[37em] cursor-pointer relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" onClick={() => setProfileDropdown(!profileDropdown)}>
                                    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                </div>

                        }
                        <div id="userDropdown" class={`z-10 ${profileDropdown ? `fixed` : `hidden `} left-[90%] top-[55%] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{currentUser.email}</div>
                                <div class="font-medium truncate"></div>
                            </div>
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                            </ul>
                            <div class="py-1">
                                <a href="#" onClick={(ev) => logout(ev)} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    </div>

                    <hr className="w-[100%] mx-auto" />
                    <div className="w-full pt-5 font-thin px-8 flex justify-center gap-7 sm:text-[20px] sm:gap-9 text-sm items-center">
                        <Link to="/"><p>Home</p></Link>
                        {/* <a href=""><p>News</p></a>
                        <a href=""><p>Technology</p></a>
                        <a href=""><p>Business</p></a>
                        <a href=""><p>Sports</p></a>
                        <a href=""><p>About</p></a> */}
                        {
                            currentUser.role === 'organizer' ? <Link to='myevents'>My Events</Link>:<Link to='myreservations'>My Reservations</Link>
                        }
                        
                    </div>
                </nav>
                <div id="sidebar" className={`${openSideBar ? '' : 'hidden'} absolute sm:w-[30%] w-[60%] h-full bg-white z-[1000] flex items-center justify-start px-3 py-8`} >
                    <p className="absolute right-5 top-5 cursor-pointer" >
                        <FontAwesomeIcon icon={faX} onClick={() => setOpenSideBar(!openSideBar)} style={{ 'fontSize': '26px' }} /></p>
                    <ul className="flex flex-col gap-5 relative">
                        {
                            navigation.map((route) => {
                                return (
                                    <Link to={route.to}><p
                                        className="uppercase sm:text-[35px] text-[28px] font-light cursor-pointer hover:text-[#fc444a] hover:tracking-[0.2em]">
                                        Home</p>
                                    </Link>
                                )
                            })
                        }

                    </ul>

                </div>

            </div>
        )
    }

    export default NavBar;