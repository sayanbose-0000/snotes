import '../styles/navbar.css';
import { Link } from "react-router-dom";
import { userContext } from './main';
import { useEffect, useContext } from 'react';
import { BACK_URL } from './main';


const Navbar = ({ loggedIn, setLoggedIn }) => {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    fetch(`${BACK_URL}/profile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // since we want to use cookie, we need to use this
    }).then((res) => {
      res.json().then((info) => {
        setUserInfo(info);
      })
    })
  }, [loggedIn])


  const handleLogOut = (e) => {
    e.preventDefault();

    fetch(`${BACK_URL}/logout`, {
      method: "POST",
      credentials: 'include'
    })

    setUserInfo(null);
  }


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