import '../styles/newnote.css';

const NewNote = () => {
  return (
    <div className='newnote'>
      <form>
        <input type="text" placeholder="Enter title..." className='title' required/>
        <textarea placeholder="Enter content..." className='content' rows='4' cols='50' required/>
        <button>Create Note</button>
      </form>
    </div>
  )
}

export default NewNote;