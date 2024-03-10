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
import { Select, Pagination } from 'flowbite-react';
import CategoryFilter from "./CategoryFilter";
import StatusSeach from "./StatusSeach";



const ComplexTable = (props) => {
  const { userToken, events, setEvents, query, category, currentPage, setCurrentPage } = useStateContext();
const [totalPage,settotalPage] = useState();

  // const [cate, setCate] = useState({});
  // const [totalPage , setTotalPage] = useState('');








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
      { Header: "Creator", accessor: "organizator.name" }, // Access nested property
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/eventsDetail?status=${query}&category=${category}&page=${currentPage}`);
        setEvents(response.data);
        settotalPage(response.data.last_page);
        console.log(response);
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

  return (
    <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Evetns list
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
    </Card>

  );
};

export default ComplexTable;
