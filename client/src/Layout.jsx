import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import '../styles/app.css';
import { useEffect, useState } from "react";


const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main className='layout'>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </main>
  );
}

export default Layout;