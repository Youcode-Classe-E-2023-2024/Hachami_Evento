
import { Fragment, useState } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const navigation = [
    { name: 'Home', to: '/' },
    // { name: 'Surveys', to: '/surveys' },

]
const NavBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false)
    // const {currentUser , userToken} = useStateContext();
    // if(!userToken){
    //   return <Navigate to='/login' />
    // }
    const logOut = (ev) => {
        ev.preventDefault();
        console.log('logOut');
    }
    return (
        <div classNameName="min-h-full">
            <nav className="h-auto  z-[999] p-4 fixed w-full text-white" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="flex justify-between w-full items-center pb-4">
                    <span className="text-white font-light cursor-pointer flex-1 " ><FontAwesomeIcon onClick={() => setOpenSideBar(!openSideBar)} icon={faBars} style={{ color: '#fff', 'fontSize': '26px', 'marginLeft': '10px', 'cursor': 'pointer' }} /></span>
                    <h1 className="text-center text-[#fc444a] font-light sm:text-[23px] text-[19px] xxl:text-[40px] flex-1">
                        <span className="text-white">Evento</span> Ticket
                    </h1>
                    <div className="flex justify-end gap-4 mr-2 text-white sm:text-md text-sm flex-1  " id="nav-right">
                        <Link to='/login' className="w-24 text-center h-14 border border-white p-4 cursor-pointer text-sm hover:bg-[#fc444a] " >Login</Link >
                        <Link to='/signup' className="w-24 text-center h-14 border border-white p-4 cursor-pointer text-sm hover:bg-[#fc444a] " >Register</Link >
                    </div>
                </div>
                <hr className="w-[100%] mx-auto" />
                <div className="w-full pt-5 font-thin px-8 flex justify-center gap-7 sm:text-[20px] sm:gap-9 text-sm items-center">
                    <a href=""><p>Home</p></a>
                    <a href=""><p>News</p></a>
                    <a href=""><p>Technology</p></a>
                    <a href=""><p>Business</p></a>
                    <a href=""><p>Sports</p></a>
                    <a href=""><p>About</p></a>
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