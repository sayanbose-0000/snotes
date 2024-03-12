import { useState } from 'react';
import '../styles/loginandsignup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log();
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (response.status==200) {
        setError("Successful signup. You may login now");
      }
      else {
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
        <input type="text" placeholder="Enter username... " required value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input type="email" placeholder="Enter email... " required value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="password" placeholder="Enter password... " required value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button className='submit' onClick={(e) => { handleSubmit(e) }}>Sign Up</button>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default Signup;