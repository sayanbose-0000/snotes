import { useEffect, useContext } from 'react';
import '../styles/navbar.css';
import { Link } from "react-router-dom";
import { userContext } from './main';

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  const handleLogOut = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // since we want to use cookie, we need to use this
    }).then((res) => {
      res.json().then((info) => {
        setUserInfo(info);
      })
    })
  }, [])

  const userName = userInfo?.username;

  return (
    <div className="navbar">
      <Link to="/" className='goodnotes'>Snote</Link>
      {
        userName ?
          <div className="register">
            <p className='username'>{userInfo.username}</p>
            <button className='logout' onClick={(e) => handleLogOut(e)} >LogOut</button>
          </div>
          :
          <div className="register">
            <Link className='login' to='/login'>Login</Link>
            <Link className='signup' to='/signup'>Signup</Link>
          </div>
      }
    </div>
  );
};

export default Navbar;