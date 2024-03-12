import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router-dom";
import '../styles/app.css'

const Layout = () => {
  return (
    <main className='layout'>
      <Navbar/>
      <Outlet/>
    </main>
  );
}

export default Layout;