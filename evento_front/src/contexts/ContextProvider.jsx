import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const StateContext = createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    currentPage :'',
    setCurrentUser: () => { },
    setUserToken: () => { },
    setCurrentPage:()=>{},
});



export const ContextProvider = ({ children }) => {
    const [currentUser, _setCurrentUser] = useState({
        'name': localStorage.getItem('name') || '',
        'email': localStorage.getItem('email') || '',
        'role': localStorage.getItem('role') || '',

    });
    const [query,setQuery] = useState('')
    const [category,setCategory] = useState('')
    const [currentPage,_setCurrentPage] = useState(1)
    const [status , setStatus] = useState('');

    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [events, setEvents] = useState({
        "id": '',
        "title": "",
        "description": "",
        "category_id": "",
        "organizator_name": "",
        "organizator_email": "",
        "event_date": "",
        "location": "",
        "ticketsEvent":"",
        "status": "",
        "created_at": "",
        "updated_at": "",
        // "original_url":""
        
    })

    const setCurrentPage = (page)=>{
        _setCurrentPage(page);
    }

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token)
        } else {
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
    }

    const setCurrentUser = (email, name, role) => {
        if (email && name && role) {
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
        }

        const user = {
            'email': email,
            'name': name,
            'role': role,
        };

        _setCurrentUser(user);
    };



   
    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                events,
                setEvents,
                query,
                setQuery,
                category,
                setCategory,
                currentPage,
                setCurrentPage,
                status,
                setStatus
                
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);