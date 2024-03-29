
// Load saved notes on popup open
document.addEventListener('DOMContentLoaded', function () {
    loadNotes();
    document.getElementById('addNoteButton').addEventListener('click', addNote);
    document.getElementById('deleteAllButton').addEventListener('click', deleteNotes);
    document.getElementById('darkModeCheckbox').addEventListener('change', toggleDarkMode);
  });
  
// // Function to open the popup when the browser action icon is clicked
// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.windows.create({
//       type: 'popup',
//       focused: true,
//       width: 320,
//       height: 480,
//       url: 'popup.html'
//     });
//   });

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

  // Add a new note
  function addNote() {
    console.log('add note called');
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    console.log('trim k bad');
    
    if (noteText !== '') {
        console.log('if k end me');
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
    console.log('del note called');
    chrome.storage.sync.set({ 'notes': [] }, function () {
      loadNotes();
    });
  }
  
  // Toggle dark mode
  function toggleDarkMode() {
    console.log('darkmodeworking');
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
  
 
  
//   // Release stress with cute character animation
//   function releaseStress() {
//     const stressReliever = document.getElementById('stressReliever');
//     stressReliever.style.transform = 'rotate(360deg)';
//     setTimeout(() => {
//       stressReliever.style.transform = 'rotate(0deg)';
//     }, 500);
//   }