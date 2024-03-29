import '../styles/note.css';

const Note = ({ note }) => {
  return (
    <div className='notes'>
      <h3> {note.title}</h3>
      <p>{note.content}</p>
      <div className="bottombar">
        <img src="../edit.svg" alt="" onClick={(e) => { handleEdit(e) }} />
        <img src="../delete.svg" alt="" onClick={(e) => { handleDelete(e) }} />
      </div>
    </div>
  )
}

export default Note;