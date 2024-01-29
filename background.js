// Event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function () {
    // Set up initial storage if needed
    chrome.storage.sync.get(['notes'], function (result) {
      if (!result.notes) {
        chrome.storage.sync.set({ 'notes': [] });
      }
    });
  });
  
  // Listen for messages from other parts of the extension
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getNotes") {
      // Retrieve notes from storage and send a response
      chrome.storage.sync.get(['notes'], function (result) {
        const notes = result.notes || [];
        sendResponse({ notes: notes });
      });
      return true; // indicates that the response will be sent asynchronously
    }
  });
  
  