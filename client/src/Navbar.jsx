import '../styles/navbar.css';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className='goodnotes'>Snote</Link>
      {/*<a href="" className='goodnotes'>goodnotes</a>*/}
      <div className="register">
        <Link className='login' to='/login'>Login</Link>
        <Link className='signup' to='/signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Navbar;