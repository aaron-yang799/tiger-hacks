// content.js - This script is injected into the webpage

// Function to send the data to the extension's background script or popup script
function sendTextToPopup(text) {
    chrome.runtime.sendMessage({ action: "grabbedText", text: text });
  }
  
  // Listen for a message from the popup script to start the text grab when the user clicks the button
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "grabText") {
        const allText = document.body.innerText;
        sendTextToPopup(allText); // Send the text back to the popup
        sendResponse({ status: "Text grabbed" });
    }
});
  