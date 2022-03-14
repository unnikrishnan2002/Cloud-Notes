import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Fetch all notes
    const getNotes = async () => {

        console.log("Fetching all notes");

        // API call
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        console.log("Adding a new note");

        // API call
        let url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {

        // API call
        let url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        console.log("deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {

        // API call
        let url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        // Logic to edit in front end
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                break;
            }
        }
        setNotes(newNotes);
        console.log("Note Updated")
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;