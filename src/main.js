import { makeRequest } from './api.js'
import { getWordList, parseApiData } from './parse.js'

export const solve = async () => {
  // TODO: Solve puzzle.

  // 1. Load data from API
  const apiData = await makeRequest()
  const wordList = getWordList(parseApiData(apiData))

  console.log(wordList)
  // 2. Parse data
  // 3. Compile into word list
  // 4 Solve rest of puzzle...
}

export const createMessageListener = () => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request === 'run-s-solver') {
      await solve()
      sendResponse({ success: true })
    }
  })
}
