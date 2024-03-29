import Note from "./Note.jsx";
import '../styles/home.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userContext } from './main';
import { useEffect, useContext, useState } from 'react';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const { setUserInfo, userInfo } = useContext(userContext);

  const userId = userInfo?.id;

  useEffect(() => {
    if (userId) {
      fetch('http://localhost:3000/getnote', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId
        }),
      }).then((response) => {
        response.json().then((data) => {
          setNotes(data)
        })
      })

    }
  }, [userId])

  if (!userId) {
    return (
      <div className="home">
        <div className="no_notes"><p>You aren't signed in</p></div>
      </div>
    )
  }

  if (notes.length === 0 && userId) {
    return (
      <div className="home">
        <div className="no_notes"><p>No notes</p></div>
        <Link className='addnotebutton' to='/addnote'>+</Link>
      </div>
    )
  }

  return (
    <div className='home'>

      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}

      <Link className='addnotebutton' to='/addnote'>+</Link>
    </div>
  );
}

export default Home;