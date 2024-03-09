import { React, useEffect } from 'react'
import { Outlet, Link , Navigate } from 'react-router-dom'

import NavBar from '../UI/NavBar'
import Footer from '../UI/Footer'
import HeroImg from '../assets/hero.png'
import { useStateContext } from "../contexts/ContextProvider";





export default function DefaultLayout() {
    


    return (
        <div className='flex flex-col ' style={{ 'height': '100vh' }}>
            <NavBar />
            <Outlet />
            <Footer />

        </div>
    )
}
