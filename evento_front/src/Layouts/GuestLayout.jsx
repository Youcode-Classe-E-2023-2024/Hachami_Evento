import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useStateContext } from "../contexts/ContextProvider";


const GuestLayout = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { userToken , currentUser} = useStateContext();

    if (userToken) {
        return <Navigate to="/" />
    }

    // if (currentUser.role !== 'organizer') {
    //     return <Navigate to="/" />
    // }

    
    return (
        <div >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="text-center text-[#fc444a] font-light sm:text-[23px] text-[19px] xxl:text-[40px] flex-1">
                        <span className="text-white">Evento</span> Ticket
                    </h1>
                </div>

                <Outlet />
            </div>

        </div>
    )
}

export default GuestLayout