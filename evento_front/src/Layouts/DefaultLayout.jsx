import { React } from 'react'
import { Outlet, Link } from 'react-router-dom'

import NavBar from '../UI/NavBar'
import HeroImg from '../assets/hero.png'





export default function DefaultLayout() {

    return (
        <div className='flex flex-col ' style={{ 'height': '100vh' }}>
            <NavBar />
            <Outlet />
            

        </div>
    )
}
