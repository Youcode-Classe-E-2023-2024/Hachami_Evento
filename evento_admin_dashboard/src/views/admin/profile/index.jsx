import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect, useState } from "react";
import axios from "axios";
import convertToFormattedDate from "../../../Utils/convertToFormattedDate";
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useStateContext } from "../../../contexts/ContextProvider";








const ProfileOverview = () => {
  // const { userToken } = useStateContext();
  const [userToken] = useState(localStorage.getItem('TOKEN'))
  const [categories, setCategory] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [updateInput , setUpdatInput] = useState();

  const updateCategory = async () => {
    const categoryId = localStorage.getItem('categoryId');
    // console.log(categoryId,updateInput);
    // alert('ff')
    const formdata = new FormData();
    formdata.append('name',updateInput);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/updateCategory/`+categoryId,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );


      document.getElementById('my_modal_2').close();

      // Fetch the updated list of categories and trigger a re-render
      axios.get('http://127.0.0.1:8000/api/allCategories')
        .then((response) => {
          setCategory(response.data);
        })
        .catch((err) => {
          console.log(err);
        });




    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteCategory = async () => {

    const categoryId = localStorage.getItem('categoryId');
    // console.log(categoryId,updateInput);
    // alert('ff')
    const formdata = new FormData();
    formdata.append('name',updateInput);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/deleteCategory/`+categoryId,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );


      document.getElementById('my_modal_3').close();

      axios.get('http://127.0.0.1:8000/api/allCategories')
        .then((response) => {
          setCategory(response.data);
        })
        .catch((err) => {
          console.log(err);
        });




    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Created At',
      selector: row => convertToFormattedDate(row.created_at),
      sortable: true,
      cell: row => <div>{convertToFormattedDate(row.created_at)}</div>,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-4">
          {/* Add any action buttons you need */}
          <button onClick={() => openModal2(row.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          </button>
          <button onClick={() => openModal3(row.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

          </button>
        </div>
      ),
      button: true,
    },

  ];
 


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allCategories')
      .then((response) => {
        setCategory(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])




  const addCategory = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name', name);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/categories`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);

      document.getElementById('my_modal_1').close();

      // Fetch the updated list of categories and trigger a re-render
      axios.get('http://127.0.0.1:8000/api/allCategories')
        .then((response) => {
          setCategory(response.data);
        })
        .catch((err) => {
          console.log(err);
        });




    } catch (error) {
      console.error('Error updating event:', error);
    }
  }

  const openModal1 = (id) => {
    document.getElementById('my_modal_1').showModal()
  }

  const openModal2 = (id) => {
    document.getElementById('my_modal_2').showModal()
    console.log(id);
    axios.get('http://127.0.0.1:8000/api/categories/'+id , {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setUpdatInput(response.data.name)
      localStorage.setItem('categoryId',id);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const openModal3 = (id) => {
    document.getElementById('my_modal_3').showModal()
    localStorage.setItem('categoryId',id);
    
  }

  






  return (
    <div className="flex w-full flex-col gap-5">

      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 mt-10">
        <div className="bg-white rounded border-spacing-6 absolute left-[95%] cursor-pointer" onClick={openModal1}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>


        </div>
        <dialog id="my_modal_1" className="modal w-[30%] bg-gray-500" style={{ 'border': '1px solid black', 'border-radius': '10px' }}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello Admin!</h3>
            <p className="py-4">Add new category </p>
          </div>
          <form method="dialog" className="modal-backdrop" >
            <div className='w-full mr-8'>
              <div className="mb-2 block">
                <Label htmlFor="countries" value="category name" className='dark:text-black' />
              </div>
              <div class="w-full">
                <TextInput id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the category name"
                  require
                  style={{ height: '45px', 'width': '100%' }}
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button onClick={addCategory} className='bg-gray-800 text-white mt-10 p-2 border rounded' style={{ 'border': '1px solid white' }}>Submit</button>

            </div>
          </form>
        </dialog>
        <dialog id="my_modal_2" className="modal w-[30%] bg-gray-500" style={{ 'border': '1px solid black', 'border-radius': '10px' }}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello Admin!</h3>
            <p className="py-4">Edit  category </p>
          </div>
          <form method="dialog" className="modal-backdrop" >
            <div className='w-full mr-8'>
              <div className="mb-2 block">
                <Label htmlFor="countries" value="category name" className='dark:text-black' />
              </div>
              <div class="w-full">
                <TextInput id="name"
                  name="name"
                  value={updateInput}
                  onChange={(e) => setUpdatInput(e.target.value)}
                  placeholder="Enter the category name"
                  require
                  style={{ height: '45px', 'width': '100%' }}
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button onClick={updateCategory} className='bg-gray-800 text-white mt-10 p-2 border rounded' style={{ 'border': '1px solid white' }}>Change</button>

            </div>
          </form>
        </dialog>
        <dialog id="my_modal_3" className="modal w-[30%] bg-gray-500" style={{ 'border': '1px solid black', 'border-radius': '10px' }}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello Admin!</h3>
            <p className="py-4">Delete  category </p>
          </div>
          <form method="dialog" className="modal-backdrop" >
            <div className='w-full mr-8'>
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Are you sure you want to delete ?" className='dark:text-black' />
              </div>
              <div class="w-full">
                
              </div>
            </div>
            <div className='flex justify-between'>
              <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button onClick={deleteCategory} className='bg-red-400 text-white mt-10 p-2 border rounded' style={{ 'border': '1px solid white' }}>Delete</button>

            </div>
          </form>
        </dialog>


        <div className="col-span-1 lg:col-span-1 lg:mb-0 3xl:col-span-12">
          <DataTable
            columns={columns}
            data={categories}
            className="mt-10"
            pagination
          />


        </div>


      </div>
    </div>
  );
};

export default ProfileOverview;
