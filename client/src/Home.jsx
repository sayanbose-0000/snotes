import Note from "./Note.jsx";
import '../styles/home.css';
import { Link } from "react-router-dom";


const Home = () => {
  console.log("Home Page");
  return (
    <div className='home'>
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Link className='addnotebutton' to='/addnote'>+</Link>
    </div>
  );
}

export default Home;