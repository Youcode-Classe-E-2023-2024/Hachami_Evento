import React, { useEffect, createRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HeroImg from '../assets/hero.png';
import MyCollection from '../UI/MyCollection';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import AddEventModal from '../UI/AddEventModal';
import { Button, Checkbox, Label, Modal, TextInput, Textarea, Select, Datepicker, Table } from 'flowbite-react';
import Search from '../UI/Search';
import StatusFilter from '../UI/StatusFilter';
import CategoryFilter from '../UI/CategoryFilter';
import MyReservationCollection from '../UI/MyReservationCollection';
import Card from '../UI/Card';



const MyReservation = () => {
    const navigate = useNavigate();
    const { setCurrentPage, currentUser, userToken, events, setEvents, query, status, category, currentPage } = useStateContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/myreservations?&title=${query}&page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [query, currentPage, setEvents]);
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

        }
    };

    const handleNextPage = () => {
        if (currentPage < events.last_page) {
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <>


            <section id="events" className="wrapper my-20 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">Trust by Thousands of Events</h2>



                <div className="flex w-full flex-col gap-5 md:flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Search />

                </div>
                <div className="overflow-x-auto w-[90%] " style={{ 'background': 'black', 'color': 'white', 'margin': '10px auto' }}>
                    <Table style={{ 'background': 'black', 'color': 'white' }}>
                        <Table.Head style={{ 'background': 'black', 'color': 'white' }}>
                            <Table.HeadCell style={{ 'background': 'black', 'color': 'white' }} >Event ID</Table.HeadCell>
                            <Table.HeadCell style={{ 'background': 'black', 'color': 'white' }}>Title</Table.HeadCell>
                            <Table.HeadCell style={{ 'background': 'black', 'color': 'white' }}>Price</Table.HeadCell>
                            <Table.HeadCell style={{ 'background': 'black', 'color': 'white' }}>Location</Table.HeadCell>
                            <Table.HeadCell style={{ 'background': 'black', 'color': 'white' }}>
                                <span className="sr-only">Get-PDF</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                events.data && events.data.length > 0 && (
                                    events.data.map((event) => (
                                        <Table.Row key={event?.id} className="border-gray-700 bg-gray-900">
                                            <Table.Cell className="whitespace-nowrap font-medium text-white">
                                                {event.event?.id}
                                            </Table.Cell>
                                            <Table.Cell>
                                            {event.event?.title}
                                            </Table.Cell>
                                            <Table.Cell>
                                            {event.event?.price}
                                            </Table.Cell>
                                            <Table.Cell>
                                            {event.event?.location}
                                            </Table.Cell>
                                            
                                            
                                            <Table.Cell>
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    GET PDF
                                                </a>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                )
                            }
                            {/* <Table.Row className=" border-gray-700 bg-gray-900" >
                                <Table.Cell className="whitespace-nowrap font-medium  text-white">
                                    {'Apple MacBook Pro 17"'}
                                </Table.Cell>
                                <Table.Cell>Sliver</Table.Cell>
                                <Table.Cell>Laptop</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className=" border-gray-700 bg-gray-900" >
                                <Table.Cell className="whitespace-nowrap font-medium  text-white">
                                    {'Apple MacBook Pro 17"'}
                                </Table.Cell>
                                <Table.Cell>Sliver</Table.Cell>
                                <Table.Cell>Laptop</Table.Cell>
                                <Table.Cell>$2999</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row> */}

                        </Table.Body>
                    </Table>
                </div>
                <div class="bg-transparent max-w-lg  container flex  justify-center mx-auto">
                    <div class="flex flex-row gap-4 mx-auto">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            type="button"
                            className={`${currentPage === 1
                                ? 'bg-gray-800 text-white rounded-l-md border-r border-gray-100  px-3  w-32'
                                : ' text-white rounded-l-md p-2 bg-red-700 hover:text-white px-3 w-32'
                                }`}
                        >
                            <div class="flex flex-row align-middle">
                                <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                                </svg>
                                <p class="ml-2">Prev</p>
                            </div>
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === events.last_page}
                            type="button"
                            className={`${currentPage === events.last_page
                                ? 'bg-gray-800 text-white rounded-l-md border-r border-gray-100  px-3  w-32'
                                : ' text-white rounded-l-md p-2 bg-red-700 hover:text-white px-3 w-32'
                                }`}
                        >
                            <div class="flex flex-row align-middle">
                                <span class="mr-2">Next</span>
                                <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyReservation;
