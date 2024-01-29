// popup_action.js
document.addEventListener('DOMContentLoaded', function () {
  loadNotes();
  document.getElementById('addNoteButton').addEventListener('click', addNote);
  document.getElementById('deleteAllButton').addEventListener('click', deleteNotes);
  document.getElementById('darkModeCheckbox').addEventListener('change', toggleDarkMode);
});
// Add a new note
function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
  
    if (noteText !== '') {
      chrome.storage.sync.get(['notes'], function (result) {
        const notes = result.notes || [];
        notes.push({ text: noteText});
        chrome.storage.sync.set({ 'notes': notes }, function () {
          loadNotes();
          noteInput.value = '';
        });
      });
    }
  }
  
  // Delete all notes
  function deleteNotes() {
    chrome.storage.sync.set({ 'notes': [] }, function () {
      loadNotes();
    });
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    loadNotes(); // Reload notes with updated styles
  }

  
  // Load notes from storage and display them
  function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    chrome.storage.sync.get(['notes'], function (result) {
      const notes = result.notes || [];
      notesContainer.innerHTML = '';
  
      for (let i = 0; i < notes.length; i++) {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        
        noteDiv.innerHTML = `
          <span>${notes[i].text}</span>
        `;
        notesContainer.appendChild(noteDiv);
      }
    });
  }
  