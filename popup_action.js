// popup_action.js

// Add a new note
function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
  
    if (noteText !== '') {
      chrome.storage.sync.get(['notes'], function (result) {
        const notes = result.notes || [];
        notes.push({ text: noteText, starred: false });
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
  
  // Star a note
  function toggleStar(index) {
    chrome.storage.sync.get(['notes'], function (result) {
      const notes = result.notes || [];
      notes[index].starred = !notes[index].starred;
      chrome.storage.sync.set({ 'notes': notes }, function () {
        loadNotes();
      });
    });
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
        if (notes[i].starred) {
          noteDiv.classList.add('starred');
        }
        noteDiv.innerHTML = `
          <span>${notes[i].text}</span>
          <button onclick="toggleStar(${i})">${notes[i].starred ? 'Unstar' : 'Star'}</button>
        `;
        notesContainer.appendChild(noteDiv);
      }
    });
  }
  