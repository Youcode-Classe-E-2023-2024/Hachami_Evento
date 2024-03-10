import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useQueryParam from '../../../../Hooks/useQueryParam';
import { useStateContext } from "../../../../contexts/ContextProvider";
import { TextInput } from 'flowbite-react';



const StatusSeach = ({ placeholder = 'Search title...' }) => {
    const [search, setSearch] = useQueryParam('query', '');
    const { setQuery } = useStateContext();

    const handleInput = (e) => {
        setSearch(e.target.value)
        setQuery(e.target.value)
    }
    return (
        <div className='w-[30%]'>
            <TextInput
                onChange={handleInput}
                value={search}
                id="email1" type="text" placeholder="search by status" required
                style={{ 'width': '191px', 'height': '35px', 'paddingLeft': '10px', 'color': 'black' }} />
        </div>
    );
};

export default StatusSeach;
