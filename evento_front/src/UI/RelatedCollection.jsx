import React, { useState, useEffect } from 'react'
import Card from './Card'
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom'
import convertToFormattedDate from '../Utils/convertToFormattedDate';




const RelatedCollection = ({ data }) => {
    const { events } = useStateContext();

    const modifyUrl = (originalUrl) => {
        const substring = originalUrl.replace("http://localhost", "");
    
        return `http://127.0.0.1:8000${substring}`;
      }


    console.log(events);

    return (
        <>
            <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row">
                {data && data?.length > 0 ? (
                    <div className="flex flex-col items-center gap-10">
                        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                            {data.map((event) => {


                                return (
                                    <li key={event._id} className="flex justify-center">
                                        <div className="group text-white relative flex min-h-[300px] w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-lg md:min-h-[438px]">
                                            <Link

                                                // style={{ backgroundImage: `url(${modifyUrl(image)})` }}
                                                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-white"
                                                to={`/event/${event.id}`}
                                            />


                                            <div
                                                className=" flex min-h-[180px] flex-col gap-3 p-5 md:gap-4"
                                            >
                                                <div className="flex gap-2">
                                                    <span className="p-semibold-14 w-min rounded-full bg-indigo-700 px-4 py-1 text-green-60">
                                                        {event.price + '$'}
                                                    </span>
                                                    {
                                                        event.category && (
                                                            <p className="p-semibold-14 w-min rounded-full bg-green-400  px-4 py-1 text-black  line-clamp-1">
                                                                {event.category.name}
                                                            </p>
                                                        )
                                                    }
                                                </div>

                                                <p className="p-medium-16 p-medium-18 text-grey-500">
                                                    {convertToFormattedDate(event.event_date)}
                                                </p>

                                                <Link >
                                                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 ">{event.description}</p>
                                                </Link>

                                                <div className="flex-between w-full">
                                                    {
                                                        event.organizator && (
                                                            <p className="p-medium-14 md:p-medium-16 text-grey-600">
                                                                {event.organizator.name}
                                                            </p>
                                                        )

                                                    }


                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>


                    </div>
                ) : (
                    <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row h-16 bg-gray-950 w-1/2 m-auto" style={{ 'alignItems': 'center' }}>
                        <h1 className='text-white text-3xl'>No Event found</h1>
                    </div>
                )

                }
            </div>

        </>
    )
}

export default RelatedCollection