import { React, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

import NavBar from '../UI/NavBar'
import HeroImg from '../assets/hero.png'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios";





export default function DefaultLayout() {
    const { events, setEvents , query ,category } = useStateContext();
    
    
    
  

    useEffect(() => {
        axiosClient
            .get("/events")
            .then(({ data }) => {
                console.log(query,category);
                setEvents(data);


            })
            .catch((error) => {

                console.error(error);
            });
    }, [query,category])


    return (
        <div className='flex flex-col ' style={{ 'height': '100vh' }}>
            <NavBar />
            <Outlet />


        </div>
    )
}
