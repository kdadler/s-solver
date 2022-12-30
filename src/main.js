import { loadApiData } from './api.js'
import { getBoard, getWordList, parseApiData } from './parse.js'
import { buildPaths } from './path.js'

export const solve = async () => {
  const puzzle = parseApiData(await loadApiData())
  const board = getBoard(puzzle)
  const wordList = getWordList(puzzle)

  console.log(board, wordList)

  const paths = buildPaths({ board, wordList })

  console.log(paths)

  // TODO: Solve puzzle.
}

export const createMessageListener = () => {
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request === 'run-s-solver') {
      await solve()
      sendResponse({ success: true })
    }
  })
}
