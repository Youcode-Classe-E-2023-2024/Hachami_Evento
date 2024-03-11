import React, { useEffect, createRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import LocationIcon from '../assets/icons/location.svg';
import DateIcon from '../assets/icons/calendar.svg';
import Collection from '../UI/Collection';
import RelatedCollection from '../UI/RelatedCollection';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import convertToFormattedDate from '../Utils/convertToFormattedDate';
import modifyUrl from '../Utils/modifyUrl';
import axios from "axios"
import { Link } from 'react-router-dom';

const EventDatail = () => {
    const navigate = useNavigate();
    const [relatedEvents, setRelatedEvents] = useState({});


    const { events, setEvents, userToken } = useStateContext();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/event/${id}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/related/${id}`);
                setRelatedEvents(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        fetchData();
    }, [relatedEvents]);

    const reserve = async () => {
        if (!userToken) {
            navigate('/login');
            return;
        } else {
            try {
                const response = await axiosClient.post(`reserve/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                navigate('/myreservations');




            } catch (error) {
                console.error('Error updating event:', error);
            }
        }

    }

    return (
        <>
            <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain text-white" style={{ 'marginTop': '12rem', 'marginBottom': '10rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                    <img
                        src={modifyUrl(events?.event?.media.length > 0 ? events?.event?.media[0].original_url : '')}
                        alt="hero image"
                        width={1000}
                        height={1000}
                        className="h-full min-h-[300px] object-cover object-center"
                    />

                    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                        <div className="flex flex-col gap-6">
                            <h2 className='text-4xl font-bold text-white'>{events?.event?.title}</h2>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p className="p-bold-20 rounded-full bg-green-300 px-5 py-2 text-black">
                                        {events?.event?.price}
                                    </p>
                                    <p className="p-medium-16 rounded-full bg-indigo-400 px-4 py-2.5 text-black">
                                        {events?.event?.category.name}
                                    </p>

                                </div>

                                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                                    by{' '}
                                    <span className="text-white text-md">{events?.event?.organizator.name}</span>
                                </p>
                                <br />
                                <p className="p-medium-18 ml-2 mb-4 w-26  h-12 border border-white p-2 pt-3 text-center cursor-pointer text-sm ">Place : {events?.event?.ticketsEvent}</p>

                            </div>
                        </div>

                        {/* <CheckoutButton event={event} /> */}

                        <div className="flex flex-col gap-5">
                            {events?.event?.ticketsEvent !== 0 ? (
                                <button onClick={reserve} className="p-medium-16 rounded w-30 text-center h-14 border border-white p-4 cursor-pointer text-sm hover:bg-[#fc444a]">
                                    Reserve Now
                                </button>
                            ) : (
                                <button disabled={true} className="p-medium-16 rounded w-30 text-center h-14 border border-white p-4  text-sm ">
                                    Sold Out
                                </button>
                            )
                            }
                            <div className='flex gap-2 md:gap-3'>
                                <img src={DateIcon} alt="calendar" width={32} height={32} />
                                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                                    <p>
                                        {convertToFormattedDate(events?.event?.event_date)}
                                    </p>

                                </div>
                            </div>

                            <div className="p-regular-20 flex items-center gap-3">
                                <img src={LocationIcon} alt="location" width={32} height={32} />
                                <p className="p-medium-16 lg:p-regular-20">{events?.event?.location}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
                            <p className="p-medium-16 lg:p-regular-18">We’re sponsoring a conference for the first time. We'll be participating in the keynote and hosting a workshop on pgvector. Our team of AI experts will be on hand at booth D2 to introduce you to Supabase Vector (and handing out exclusive swag 🛍️).</p>
                            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">url</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="text-white text-2xl flex align-middle justify-start " style={{ 'margin': '0px auto', 'width': '70%' }}>Related Events</h2>

                <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row">
                    {relatedEvents && relatedEvents.length > 0 ? (
                        <div className="flex flex-col items-center gap-10">
                            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-4 lg:grid-cols-4 xl:gap-10">
                                {relatedEvents.map((event) => (
                                    <li key={event._id} className="flex justify-center">
                                        <div className="group text-white relative flex min-h-[300px] w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-lg md:min-h-[438px]">
                                            <Link

                                                style={{ backgroundImage: `url(${modifyUrl(event?.media && event.media.length > 0 ? event.media[0].original_url : '')})` }}
                                                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-white"
                                                to={`/event/${event.id}`}
                                            />

                                            <div className="flex min-h-[180px] flex-col gap-3 p-5 md:gap-4">
                                                <div className="flex gap-2">
                                                    <span className="p-semibold-14 w-min rounded-full bg-indigo-700 px-4 py-1 text-green-60">
                                                        {event.price + '$'}
                                                    </span>
                                                    {event.category && (
                                                        <p className="p-semibold-14 w-min rounded-full bg-green-400  px-4 py-1 text-black  line-clamp-1">
                                                            {event.category.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <p className="p-medium-16 p-medium-18 text-grey-500">
                                                    {convertToFormattedDate(event.event_date)}
                                                </p>

                                                <Link>
                                                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 ">{event.description}</p>
                                                </Link>

                                                <div className="flex-between w-full">
                                                    {event.organizator && (
                                                        <p className="p-medium-14 md:p-medium-16 text-grey-600">
                                                            {event.organizator.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row h-16 bg-gray-950 w-1/2 m-auto" style={{ 'alignItems': 'center' }}>
                            <h1 className='text-white text-3xl'>No Event found</h1>
                        </div>
                    )}
                </div>
            </section>

        </>
    );
};

export default EventDatail;
