import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import Progress from "components/progress";
import axios from "axios";
import axiosClient from "../../../../axios";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { TextInput } from 'flowbite-react';
import useQueryParam from '../../../../Hooks/useQueryParam';
import { Select, Pagination, Button, Modal, Label } from 'flowbite-react';
import CategoryFilter from "./CategoryFilter";
import StatusSeach from "./StatusSeach";



const ComplexTable = (props) => {
  const { userToken, events, setEvents, query, category, currentPage, setCurrentPage } = useStateContext();
  const [totalPage, settotalPage] = useState();
  const [cate, setCate] = useState({});
  const [event, setEvent] = useState();


  const [formData, setFormData] = useState({
    status: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    console.log(event);
    console.log(formData);

    const formdata = new FormData();
    formdata.append('status', formData.status);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/accept/${event}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedEvents = events.data.map((ev) =>
      ev.id === event ? { ...ev, status: formData.status } : ev
    );

    setEvents({
      ...events,
      data: updatedEvents,
    });

    } catch (error) {
      console.error('Error updating event:', error);
    }
  };



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


  const columnsData = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "title" },
      { Header: "STATUS", accessor: "status" },
      { Header: "Created At", accessor: "created_at" },
      { Header: "Creator", accessor: "organizator.name" },

    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/eventsDetail?status=${query}&category=${category}&page=${currentPage}`);
        setEvents(response.data);
        settotalPage(response.data.last_page);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query, category, currentPage, setEvents]);



  const tableInstance = useTable(
    {
      columns: columnsData,
      data: events.data || [], // Ensure data is available
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  const handleUpdate = (id) => {
    document.getElementById('my_modal_2').showModal()
    setEvent(id)
  }

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Events list
        </div>
        <div className="w-1/2 flex justify-center">
          <StatusSeach />
          <CategoryFilter />
        </div>


        <CardMenu />
      </div>

      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>

            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "STATUS") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === "accepted" ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : cell.value === "pending" ? (
                              <MdOutlineError className="text-orange-500" />
                            ) : (
                              <MdCancel className="text-red-500" />
                            )}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = <Progress width="w-[68px]" value={cell.value} />;
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                  <button className='mt-2 mr-20 cursor-pointer' onClick={() => handleUpdate(row.original.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                  </button>

                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
      <div class="bg-transparent max-w-lg  container flex  justify-center mx-auto">
        <div class="flex flex-row gap-4 mx-auto">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            type="button"
            className={`${currentPage === 1
              ? 'text-white rounded-l-md p-2 bg-red-400  hover:text-white px-3 w-32'
              : ' text-white rounded-l-md p-2  bg-navy-600 hover:text-white px-3 w-32'
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
              ? 'text-white rounded-l-md p-2 bg-red-400  hover:text-white px-3 w-32'
              : ' text-white rounded-l-md p-2  bg-navy-600 hover:text-white px-3 w-32'
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
      <dialog id="my_modal_2" className="modal w-[30%] bg-gray-500" style={{ 'border': '1px solid black', 'border-radius': '10px' }}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello Admin!</h3>
          <p className="py-4">Change event status </p>
        </div>
        <form method="dialog" className="modal-backdrop" >
          <div className='w-full mr-8'>
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select a category" className='dark:text-black' />
            </div>
            <div class="w-full">
              <select id="status"
                onChange={handleChange}
                name='status'
                value={formData.status}
                style={{ height: '50px', 'width': '100%' }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a status</option>

                <option value='accepted'>Accepted</option>
                <option value='pending'>Pending</option>
                <option value='declined'>Declined</option>

              </select>
            </div>
          </div>
          <div className='flex justify-between'>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button onClick={updateEvent} className='bg-gray-800 text-white mt-10 p-2 border rounded' style={{ 'border': '1px solid white' }}>Change</button>

          </div>
        </form>
      </dialog>
    </Card>

  );
};

export default ComplexTable;
