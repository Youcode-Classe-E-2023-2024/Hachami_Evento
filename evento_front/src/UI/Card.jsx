import React from 'react'
import { Link } from 'react-router-dom'



const Card = () => {


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
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            event name
          </p>
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {/* {formatDateTime(event.startDateTime).dateTime} */}
          Wed, Feb 14, 3:00 PM

        </p>

        <Link >
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 ">titile</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            mohamed hachami
          </p>

         
        </div>
      </div>
    </div>
  )
}

export default Card