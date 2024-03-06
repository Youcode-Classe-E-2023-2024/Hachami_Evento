import { Navigate, createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import Login from "./UI/Login";
import Register from "./UI/Register";
import Home from "./Pages/Home";



const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            // {
            //     path:'/',
            //     element : <Dashboard />,
            // },
            // {
            //     path:'/surveys',
            //     element : <Survey />,
            // },
            // {
            //     path:'/surveys/create',
            //     element : <SurveyView />,
            // },
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
    }
])

export default router;