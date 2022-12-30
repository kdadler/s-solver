import { loadApiData } from './api.js'
import { getWordList, parseApiData } from './parse.js'
import { enterWords } from './dom.js'

/**
 * Solve the puzzle.
 *
 * @returns {Promise<Array>}
 */
export const solve = async () => {
  const puzzle = parseApiData(await loadApiData())
  const wordList = getWordList(puzzle)

  enterWords(wordList)

  return wordList
}

/**
 * Creates listener for the message to run the solver.
 */
export const createMessageListener = () => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request === 'run-s-solver') {
      await solve()
      sendResponse({ success: true })
    }
  })
}
