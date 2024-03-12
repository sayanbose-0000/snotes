  import { useEffect, useState } from 'react';
  import '../styles/navbar.css';
  import { Link } from "react-router-dom";

  const Navbar = () => {
    const [userInfo, setUserInfo] = useState('');

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
      console.log(userInfo)
    }, [])

    return (
      <div className="navbar">
        <Link to="/" className='goodnotes'>Snote</Link>
        {/*<a href="" className='goodnotes'>goodnotes</a>*/}
        {
          userInfo!=="Invalid token" ?
            <div className="register">
              <p className='username'>{userInfo.username}</p>
              <button className='logout'>LogOut</button>
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