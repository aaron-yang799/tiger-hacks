// background.js
chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrapePageText,
        });
    }
});
  
function scrapePageText() {
// Function to run in the context of the web page
    const text = document.body.innerText;
    console.log(text); // Sends to the background page's console
// You may want to do something with the text here, or pass it back to the background script
}
  

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.text);
        // You can respond to the message here
    }
);
  