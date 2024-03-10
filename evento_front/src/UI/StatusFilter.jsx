
import { useEffect, useState } from "react";
import useQueryParam from '../Hooks/useQueryParam';
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { Select } from 'flowbite-react';




const StatusFilter = () => {
    const [selectedCategory, setSelectedCategory] = useQueryParam('status', '');
    const { status , setStatus } = useStateContext();
    const [cate, setCate] = useState({});



    const handleCategoryChange = (event) => {
        const statusValue = event.target.value;
        setSelectedCategory(statusValue);
        setStatus(statusValue)
    };

    


    return (
        <div className="w-[30%]">
            <Select id="countries"
                onChange={handleCategoryChange}
                value={selectedCategory}
                class="border  border-gray-300 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                <option value="" >Choose a status</option>
                <option value='accepted'>
                    Accepted
                </option>
                <option value='pending'>
                    Pending
                </option>
                <option value='declined'>
                    Declined
                </option>

            </Select>
        </div>
    );
}

export default StatusFilter