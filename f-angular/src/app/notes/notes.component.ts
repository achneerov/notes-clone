import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent {
  notes: string[] = [];
  newNote: string = '';

  addNote() {
    if (this.newNote.trim() !== '') {
      this.notes.push(this.newNote);
      this.newNote = ''; // Clear the input after adding the note
    }
  }
}
