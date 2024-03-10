import React, { useEffect, createRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HeroImg from '../assets/hero.png';
import MyCollection from '../UI/MyCollection';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import AddEventModal from '../UI/AddEventModal';
import { Button, Checkbox, Label, Modal, TextInput, Textarea, Select, Datepicker } from 'flowbite-react';
import Search from '../UI/Search';
import StatusFilter from '../UI/StatusFilter';
import CategoryFilter from '../UI/CategoryFilter';


const MyEvents = () => {
    const navigate = useNavigate();
    const { currentUser, userToken, events, setEvents, query, status,category , currentPage } = useStateContext();
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = createRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/myEvents?&category=${category}&title=${query}&status=${status}&page=${currentPage}`, {
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
    }, [query, status, currentPage, category, setEvents]);


    if (currentUser.role !== 'organizer') {
        return <Navigate to="/" />
    }






    return (
        <>


            <section id="events" className="wrapper my-20 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">Trust by Thousands of Events</h2>

                <div className="flex w-full flex-col gap-5 md:flex-row " style={{ alignItems: 'center', justifyContent: 'end', }}>

                    <Button
                        onClick={() => setOpenModal(true)}
                        className='mr-[5rem] bg-transparent cursor-pointer ' style={{ 'borderRadius': '10px' }}>
                        <svg style={{ 'width': '40px', 'height': '40px', }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </Button>
                </div>
                <Modal className='' style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }} show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                    <AddEventModal />
                </Modal>
                <div className="flex w-full flex-col gap-5 md:flex-row" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Search />
                    <StatusFilter />
                    <CategoryFilter />
                </div>

                <MyCollection data={events.data} currentPage={events.current_page} totalPage={events.last_page} />
            </section>
        </>
    );
};

export default MyEvents;
