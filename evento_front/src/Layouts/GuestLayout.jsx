import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const GuestLayout = () => {
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