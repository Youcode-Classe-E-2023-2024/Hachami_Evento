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








const Users = () => {
  // const { userToken } = useStateContext();
  const [userToken] = useState(localStorage.getItem('TOKEN'))
  const [users, setUsers] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [updateInput , setUpdatInput] = useState();

 
  const columns = [
    {
      name: 'id',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },
    
    {
      name: 'Created At',
      selector: row => convertToFormattedDate(row.created_at),
      sortable: true,
      cell: row => <div>{convertToFormattedDate(row.created_at)}</div>,
    },
  ];
 


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/allUsers')
      .then((response) => {
        setUsers(response.data.users); // Ensure the correct property is used
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])




 


  return (
    <div className="flex w-full flex-col gap-5">

      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12 mt-10">
       
        
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
              <button    className='bg-red-400 text-white mt-10 p-2 border rounded' style={{ 'border': '1px solid white' }}>Delete</button>

            </div>
          </form>
        </dialog>


        <div className="col-span-1 lg:col-span-1 lg:mb-0 3xl:col-span-12">
        {users && (
          <DataTable
            columns={columns}
            data={users}
            className="mt-10"
            pagination
          />
        )}


        </div>


      </div>
    </div>
  );
};

export default Users;
