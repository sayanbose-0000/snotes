import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import Home from "./Home.jsx";
import Layout from "./Layout.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import NewNote from "./NewNote.jsx";
import { useContext } from 'react';
import EditNote from './EditNote.jsx';

// used for useContext
const userContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  )
}

const BACK_URL = import.meta.env.VITE_API_BASE_URL;

export { userContext, BACK_URL };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/addnote",
        element: <NewNote />
      },
      {
        path: "/editnote/:id",
        element: <EditNote />
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
