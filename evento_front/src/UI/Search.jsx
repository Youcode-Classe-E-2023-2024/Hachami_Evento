import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import Image from './Image'; // Replace with your actual Image component
// import { Input } from '../ui/input';useSearchParams
// import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import useQueryParam from '../Hooks/useQueryParam';
import { useStateContext } from "../contexts/ContextProvider";



const Search = ({ placeholder = 'Search title...' }) => {
    const [search, setSearch] = useQueryParam('query', '');
    const { setQuery } = useStateContext();

    const handleInput = (e)=>{
        setSearch(e.target.value)
        setQuery(e.target.value)
    }
    return (
        <div className='w-[30%]'>
            <input
                type="text" id="default-input"
                value={search}
                onChange={handleInput}
                placeholder={placeholder}
                class="border  border-gray-300 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />

        </div>
    );
};

export default Search;
