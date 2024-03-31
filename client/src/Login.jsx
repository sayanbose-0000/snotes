import { Navigate } from 'react-router-dom';
import '../styles/loginandsignup.css';
import { useState } from 'react';
import { userContext } from './main';
import { useEffect, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BACK_URL } from './main';



const Login = () => {
  const [LoggedIn, setLoggedIn] = useOutletContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACK_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // since we want to set cookie, we need to use this. Actually when we set cookie, we do it in PORT 3000 in the backend. But how will it come to the front end in PORT: 5173? Using this we can do the same
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (response.ok) {
        setRedirect(true);
        setUserInfo(response.json())
      }

      else {
        setError("Incorrect credentials!");
      }

    } catch (err) {
      console.log(err)
      setError("Error! Try again later");
    }
  };

  if (redirect) {
    setLoggedIn(true);
    return <Navigate to={'/'} />
  }

  return (
    <div className='loginandsignup'>
      <form>
        <input type="email" placeholder="Enter email... " required value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='user-name' />
        <input type="password" placeholder="Enter password... " required value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='current-password' />
        <button className='submit' onClick={(e) => { handleSubmit(e) }}>Login</button>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default Login;