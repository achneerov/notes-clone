<template>
    <div class="notes-page">
      <h1>Your Notes</h1>
      <ul>
        <li v-for="note in notes" :key="note.id">
          {{ note.text }}
          <button @click="deleteNote(note.id)">Delete</button>
        </li>
      </ul>
      <textarea v-model="newNoteText"></textarea>
      <button @click="addNote">Add Note</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotesPage',
    data() {
      return {
        notes: [],
        newNoteText: '',
      };
    },
    methods: {
      addNote() {
        if (this.newNoteText.trim() !== '') {
          this.notes.push({ id: this.notes.length + 1, text: this.newNoteText });
          this.newNoteText = '';
        }
      },
      deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles here */
  </style>
  