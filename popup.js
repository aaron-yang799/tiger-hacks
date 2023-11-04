document.addEventListener('DOMContentLoaded', function() {
    var grabButton = document.getElementById('grab');
    grabButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {action: "grabText"}, function(response) {
          // You can now do something with the response if you want
            console.log(response.status);
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
  