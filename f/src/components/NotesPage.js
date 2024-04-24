import React, { useState, useEffect } from 'react';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        refreshList();
    }, []);

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem('token');
    };

    const refreshList = async () => {
        try {
            const token = getTokenFromLocalStorage();
    
            const response = await fetch('http://localhost:4000/api/getnotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
    
            const { notes } = await response.json();
            setNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };

    const addNote = async () => {
        try {
            const token = getTokenFromLocalStorage();

            const response = await fetch('http://localhost:4000/api/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, note: newNote }),
            });

            if (!response.ok) {
                throw new Error('Failed to add note');
            }

            setNewNote(''); // Clear the textbox after adding the note
            refreshList(); // Refresh the list after adding a note
        } catch (error) {
            console.error('Error adding note:', error.message);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const token = getTokenFromLocalStorage();

            const response = await fetch('http://localhost:4000/api/deletenote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, noteId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            refreshList(); // Refresh the list after deleting a note
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    };

    return (
        <div>
            <h1>Notes Page</h1>
            <input
                type="text"
                placeholder="Enter your note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((noteObject) => (
                    <li key={noteObject.id}>
                        {noteObject.note}
                        <button onClick={() => deleteNote(noteObject.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesPage;
