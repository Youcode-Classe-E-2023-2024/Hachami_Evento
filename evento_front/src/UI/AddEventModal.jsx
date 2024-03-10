import { Button, Checkbox, Label, Modal, TextInput, FileInput, Textarea, Select, Datepicker } from 'flowbite-react';
import React, { useEffect, createRef, useState } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';



const AddEventModal = () => {
    const emailInputRef = createRef();
    const [cate, setCate] = useState({});
    const { userToken, events, setEvents, query, currentPage, setCurrentPage } = useStateContext();



    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category_id: '',
        event_date: '',
        location: '',
        price: '',
        ticketsEvent: '',
        images: null,
        organizer: userToken,
    });

    const fileInputRef = createRef();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            console.log('Selected file:', files[0].name);
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Set the file object, not an empty object
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const formdata = new FormData();
        formdata.append('title', formData.title);
        formdata.append('description', formData.description);
        formdata.append('category_id', formData.category_id);
        formdata.append('event_date', formData.event_date);
        formdata.append('location', formData.location);
        formdata.append('price', formData.price);
        formdata.append('ticketsEvent', formData.ticketsEvent);
        formdata.append('organizer', formData.organizer);
        formdata.append('images', formData.images);

        try {
            const response = await axiosClient.post('/addEvent', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            if (response.status === 201) {
                console.log(response.data);
                setFormData({
                    title: '',
                    description: '',
                    category_id: '',
                    event_date: '',
                    location: '',
                    price: '',
                    ticketsEvent: '',
                    organizer: userToken,

                });

                return <Navigate to="/" />

                


            }
        } catch (error) {
            if (error.response && error.response.status === 422 && error.response.data) {
                const serverErrors = error.response.data.error;
                console.log(serverErrors);

            }
            // Handle other errors
        }
    };

    useEffect(() => {
        axiosClient
            .get(`/allCategories`)
            .then(({ data }) => {
                setCate(data);


            })
            .catch((error) => {

                console.error(error);
            });
    }, [])



    return (
        <>
            <Modal.Header className='bg-gray-950' />
            <Modal.Body className='bg-gray-950 w-[60rem]'>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 flex flex-col">
                        <h3 className="text-xl font-medium text-white">Add New Event</h3>
                        <div className='w-full flex flex-col '>
                            <div className='w-full flex' style={{ 'marginBottom': '20px', 'alignItems': 'flex-start', 'justifyContent': 'center', 'gap': '50px' }}>
                                <div className='w-full'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="title" value="Title" className='text-white' />
                                    </div>
                                    <TextInput id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter your title"
                                        require
                                        style={{ height: '45px', 'width': '100%' }}
                                    />
                                </div>
                                <div className='w-full'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Description" className='text-white' />
                                    </div>
                                    <Textarea
                                        name='description'
                                        onChange={handleChange}
                                        value={formData.description}
                                        id="description" placeholder="Enter your description" required className='text-black'
                                        style={{ height: '50px', 'width': '100%' }}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='w-full  flex' style={{ 'marginBottom': '20px', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
                            <div className='w-full mr-8'>
                                <div className="mb-2 block">
                                    <Label htmlFor="countries" value="Select a category" className='text-white' />
                                </div>
                                <div class="w-full">
                                    <select id="category_id"
                                        onChange={handleChange}
                                        name='category_id'
                                        value={formData.category_id}
                                        style={{ height: '50px', 'width': '100%' }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a category</option>
                                        {
                                            Array.isArray(cate) && cate.length > 0 && (
                                                cate.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="mb-2 block">
                                    <Label value="Event At" className='text-white' />
                                </div>
                                <TextInput
                                    onChange={handleChange}
                                    value={formData.event_date}
                                    id='event_date'
                                    name='event_date'
                                    type="datetime-local"
                                    required
                                />

                            </div>

                        </div>
                        <div className='w-full  flex' style={{ 'marginBottom': '20px', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
                            <div className="w-full mr-8">
                                <div className="mb-2 block">
                                    <Label value="Location" className='text-white' />
                                </div>
                                <TextInput
                                    id='location'
                                    onChange={handleChange}
                                    value={formData.location}
                                    placeholder='Enter the address location'
                                    type="text" name="location"
                                    style={{ height: '45px', 'width': '100%', }}
                                    required
                                />

                            </div>
                            <div className="w-full">
                                <div className="mb-2 block">
                                    <Label value="Numbers of tickets" className='text-white' />
                                </div>
                                <TextInput
                                    id='location'
                                    onChange={handleChange}
                                    value={formData.ticketsEvent}
                                    placeholder='Tickets ...'
                                    type="number" name="ticketsEvent"
                                    style={{ height: '45px', 'width': '100%', }}
                                    required />

                            </div>
                        </div>
                        <div className='w-full  flex' style={{ 'marginBottom': '20px', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
                            <div className='w-full mr-8'>
                                <div className="mb-2 block">
                                    <Label value="Price (MAD)*" className='text-white' />
                                </div>
                                <TextInput
                                    id='price'
                                    name='price'
                                    placeholder="Enter the ticket price"
                                    onChange={handleChange}
                                    value={formData.price}
                                    style={{ height: '45px', 'width': '100%' }}
                                    type="number" required />

                            </div>
                            <div className='w-full '>
                                <div className="mb-2 block">
                                    <Label value="Uopload image" className='text-white' />
                                </div>
                                <FileInput
                                    id="image"
                                    type="file"
                                    name="images"
                                    onChange={handleChange}
                                    accept="image/*"
                                    required
                                // ref={fileInputRef} // Attach the ref to the file input
                                />


                            </div>
                        </div>


                        <div className="w-full flex align-middle justify-center">
                            <Button className='bg-[#fc444a]' type='submit'>Submit</Button>
                        </div>

                    </div>
                </form>

            </Modal.Body>
        </>
    )

}

export default AddEventModal;