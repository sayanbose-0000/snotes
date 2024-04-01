import { useState } from 'react';
import '../styles/loginandsignup.css';
import { BACK_URL } from './main';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.includes(' ')) {
      setError("Username cannot contain spaces!");
      return;
    }

    if (username.length > 6) {
      setError("Please keep username under 6 letters");
      return;
    }

    try {
      const response = await fetch(`${BACK_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (response.status == 200) {
        setError("Successful signup. You may login now");
      }
      else {
        setError("Error! Try again later");
        console.log(response)
      }

    } catch (err) {
      console.log(err)
      setError(err);
    }
  };


  return (
    <div className='loginandsignup'>
      <form>
        <input type="text" placeholder="Enter username... " required value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input type="email" placeholder="Enter email... " required value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder="Enter password... " required value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button className='submit' onSubmit={(e) => { handleSubmit(e) }}>Sign Up</button>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default Signup;