import '../styles/note.css';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { BACK_URL } from './main';


const Note = ({ note }) => {
  const [redirect, setRedirect] = useState(false);

  const handleDelete = async (e) => {
    const response = await fetch((`${BACK_URL}/deletenote`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: note._id
      })
    })
    response ? setRedirect(true) : null
  }

  if (redirect) {
    return <Navigate to={'/'}></Navigate>
  }

  return (
    <div className='notes'>
      <h3> {note.title}</h3>
      <p>{note.content}</p>
      <div className="bottombar">
        <Link to={`/editnote/${note._id}`} className='link'>
          <img src="../edit.svg" alt="" className='edit' />
        </Link>
        <img src="../delete.svg" alt="" onClick={(e) => { handleDelete(e) }} className='delete' />
      </div>
    </div>
  )
}

export default Note;