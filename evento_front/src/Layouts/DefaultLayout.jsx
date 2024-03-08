import { React, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

import NavBar from '../UI/NavBar'
import Footer from '../UI/Footer'
import HeroImg from '../assets/hero.png'





export default function DefaultLayout() {



    return (
        <div className='flex flex-col ' style={{ 'height': '100vh' }}>
            <NavBar />
            <Outlet />
            <Footer />

        </div>
    )
}
