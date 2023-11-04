  document.addEventListener('DOMContentLoaded', function() {
    var grabButton = document.getElementById('grab');
    grabButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: grabPageText
            });
        });
    });
});
  
function grabPageText() {
// This function will be injected into the current page
    var text = document.body.innerText;
    console.log(text);
// Do something with the page text here, like sending it to your extension's popup or background script
}