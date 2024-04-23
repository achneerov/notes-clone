import React, { useState, useEffect } from 'react';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch user notes when the component mounts
        fetchNotes();
    }, []);

    const getTokenFromLocalStorage = () => {
        return localStorage.getItem('token');
    };

    const fetchNotes = async () => {
        try {
            const token = getTokenFromLocalStorage();
    
            const response = await fetch('http://localhost:4000/api/getnotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token }), // Include the token in the request body
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
    
            const data = await response.json();
            setNotes(data.notes);
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };
    

    return (
        <div>
            <h1>Notes Page</h1>
            <ul>
                {notes.map((noteObject, index) => (
                    <li key={index}>{noteObject.note}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotesPage;
