
import { useEffect, useState } from "react";
import useQueryParam from '../Hooks/useQueryParam';
import { useStateContext } from "../contexts/ContextProvider";



const CategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useQueryParam('category', '');
    const { setCategory } = useStateContext();



  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setCategory(categoryValue)
  };
    return (
        <div className="w-[30%]">
            <select id="countries" 
            onChange={handleCategoryChange}
            value={selectedCategory}
            class="border  border-gray-300 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                <option value="" disabled>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
        </div>
    );
}

export default CategoryFilter