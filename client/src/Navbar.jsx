import '../styles/navbar.css';
import { Link } from "react-router-dom";


const Navbar = () => {
  console.log("Layout");

  const handleLogOut = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/logout', {
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