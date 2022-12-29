chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'solve-s-puzzle') {
    (async () => {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      const response = await chrome.tabs.sendMessage(tab.id, 'run-s-solver');
      sendResponse(response)
    })();
  }
})
