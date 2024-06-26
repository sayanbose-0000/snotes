import { Navigate } from 'react-router-dom';
import '../styles/newnote.css';
import { useState } from 'react';
import { BACK_URL } from './main';



const NewNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleCreateNode = async (e) => {
    e.preventDefault();

    const date = Date.now()

    try {
      const response = await fetch(`${BACK_URL}/newnote`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          date
        })
      });

      if (response.ok) {
        setError("Note created successfully");
        setRedirect(true);
      }
      else {
        setError("Error creating note! Try again later");
      }

    } catch (err) {
      console.log(err)
      setError(err);
    }
  }

  if (redirect) return <Navigate to={'/'} />

  return (
    <div className='newnote'>
      <form>
        <input type="text" placeholder="Enter title..." className='title' required value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <textarea placeholder="Enter content..." className='content' rows='4' cols='50' required value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={(e) => { handleCreateNode(e) }}>Create Note</button>
        <p>{error}</p>
      </form>
    </div>
  )
}

export default NewNote;