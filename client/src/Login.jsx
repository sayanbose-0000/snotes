import '../styles/loginandsignup.css';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.status !== 200) {
        setError("Error! Try again later");
      }

    } catch (err) {
      console.log(err)
      setError(err);
    }
  };


  return (
    <div className='loginandsignup'>
      <form>
        <input type="email" placeholder="Enter email... " required value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder="Enter password... " required value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button className='submit' onClick={(e) => { handleSubmit(e) }}>Login</button>
      </form>
    </div>
  )
}

export default Login;