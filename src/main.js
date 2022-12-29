export const solve = function() {
  // TODO: Solve puzzle.

  // 1. Load data from API
  // 2. Parse data
  // 3. Compile into word list
  // 4 Solve rest of puzzle...
}

export const createMessageListener = function() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request === 'run-s-solver') {
        solve()
        sendResponse({ success: true })
      }
    },
  )
}
