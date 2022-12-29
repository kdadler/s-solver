import { loadApiData } from './api.js'
import { getWordList, parseApiData } from './parse.js'

export const solve = async () => {
  // TODO: Get puzzle date from URL.

  const apiData = await loadApiData()
  const wordList = getWordList(parseApiData(apiData))

  // TODO: Solve puzzle.

  console.log(wordList)
}

export const createMessageListener = () => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request === 'run-s-solver') {
      await solve()
      sendResponse({ success: true })
    }
  })
}
