import React from 'react'
import { Link } from 'react-router-dom'
import convertToFormattedDate from '../Utils/convertToFormattedDate'


const Card = ({event}) => {

  return (
    <div className="group text-white relative flex min-h-[300px] w-full max-w-[470px] flex-col overflow-hidden rounded-xl bg-gray-900 shadow-lg hover:shadow-lg md:min-h-[438px]">
      <Link 
        
        style={{backgroundImage: `url(${'https://cdn.pixabay.com/photo/2023/02/06/10/02/man-7771583_640.jpg'})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-white"
      />
      

      <div
        className=" flex min-h-[180px] flex-col gap-3 p-5 md:gap-4"
      > 
       <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-indigo-700 px-4 py-1 text-green-60">
            100£
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-green-400  px-4 py-1 text-black  line-clamp-1">
          {event.category.name}
          </p>
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {convertToFormattedDate(event.event_date)}
        </p>

        <Link >
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 ">{event.description}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizator.name}
          </p>

         
        </div>
      </div>
    </div>
  )
}

export default Card