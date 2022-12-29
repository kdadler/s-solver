chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request === 'run-s-solver') {
      // TODO: Solve the puzzle here.
      sendResponse({ success: true })
    }
  },
)
