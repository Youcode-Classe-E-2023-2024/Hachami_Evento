
import { useEffect, useState } from "react";
import useQueryParam from '../../../../Hooks/useQueryParam';
import { useStateContext } from "../../../../contexts/ContextProvider";
import axiosClient from "../../../../axios";
import { Select } from 'flowbite-react';




const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useQueryParam('category', '');
  const { setCategory } = useStateContext();
  const [cate, setCate] = useState({});



  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setCategory(categoryValue)
  };

  useEffect(() => {
    axiosClient
      .get(`/allCategories`)
      .then(({ data }) => {
        setCate(data);
        console.log(data);


      })
      .catch((error) => {

        console.error(error);
      });
  }, [])


  return (
    <div className="w-[30%]">
      <Select id="countries"
        onChange={handleCategoryChange}
        value={selectedCategory}
        class="border  border-gray-300 text-sm  text-navy-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500">
        <option value="" >Choose a category</option>

        {
          Array.isArray(cate) && cate.length > 0 && (
            cate.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          ) 
        }

      </Select>
    </div>
  );
}

export default CategoryFilter