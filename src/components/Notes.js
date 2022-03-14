import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/folder/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "default" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag, });
    }

    const handleClick = (e) => {
        editNote(note.id, note.title, note.description, note.tag);
        refClose.current.click();
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="container">
                <AddNote />
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="description" name="description"
                                            value={note.description} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name="tag"
                                            value={note.tag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-3'>
                    <h2>Your Notes</h2>
                    {notes.length === 0 && 'No notes to display'}
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes