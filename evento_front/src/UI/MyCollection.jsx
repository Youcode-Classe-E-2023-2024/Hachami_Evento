import React, { useState, useEffect } from 'react'
import MyCard from './MyCard'
import { useStateContext } from '../contexts/ContextProvider'


const MyCollection = ({ data, totalPage }) => {

    const { currentPage, setCurrentPage } = useStateContext();

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row">
                {data && data.length > 0 ? (
                    data.map((event) => (
                        <MyCard key={event.id} event={event} image={event.media.length > 0 ? event.media[0].original_url : ''} />
                    ))
                ) : (
                    <div className="w-full align-middle justify-center flex flex-wrap flex-col gap-5 md:flex-row h-16 bg-gray-950 w-1/2 m-auto" style={{ 'alignItems': 'center' }}>
                        <h1 className='text-white text-3xl'>No Event found</h1>
                    </div>
                )}
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
                        disabled={currentPage === totalPage}
                        type="button"
                        className={`${currentPage === totalPage
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
        </>
    )
}

export default MyCollection