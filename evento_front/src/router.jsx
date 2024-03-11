import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import Login from "./UI/Login";
import Register from "./UI/Register";
import Home from "./Pages/Home";
import MyEvents from './Pages/MyEvents';
import EventDatail from './Pages/EventDetail';
import MyReservation from "./Pages/MyReservation";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/event/:id', 
                element: <EventDatail />,
            },
            ,
            // organiz
            {
                path:'/myevents',
                element: <MyEvents />,
            },
            //reservator
            {
                path:'myreservations',
                element: <MyReservation />,
            },

           
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Register />,
            }
        ],
    },
    
      

])

export default router;