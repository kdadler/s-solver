export const buildPaths = ({ board, wordList }) => {
  const wordListClone = [...wordList]
  let rowIndex = 0
  let rowCount = board.length
  let colCount = board[0].length
  let validPaths = []

  for (rowIndex; rowIndex < rowCount; rowIndex++) {
    let colIndex = 0
    for (colIndex; colIndex < colCount; colIndex++) {
      validPaths = [
        ...validPaths,
        ...recursiveBuildPaths({
          board,
          wordList: wordListClone,
          validWordList: [...wordList],
          currentPath: [[colIndex, rowIndex]],
          currentPathWord: board[rowIndex][colIndex],
        }),
      ]
    }
  }

  return validPaths
}

const recursiveBuildPaths = ({
  board,
  wordList,
  currentPath,
  currentPathWord,
  validWordList,
  validPaths = [],
}) => {
  getNextLetters({ board, currentPath }).forEach(({ letter, coordinate }) => {
    const newCurrentPathWord = currentPathWord + letter
    const newCurrentPath = [...currentPath, coordinate]
    const { fullMatch, partialMatches } = findMatches({ searchString: newCurrentPathWord, validWordList })

    if (fullMatch) {
      validPaths.push(newCurrentPath)
      wordList.splice(wordList.indexOf(fullMatch), 1)
    }
    if (partialMatches.length > 0) {
      validPaths = recursiveBuildPaths({
        board,
        wordList,
        validWordList: partialMatches,
        validPaths,
        currentPath: newCurrentPath,
        currentPathWord: newCurrentPathWord,
      })
    }
  })

  return validPaths
}

const getNextLetters = ({ board, currentPath }) => {
  let i = -1
  let colIndex
  let rowIndex
  let row
  let letter
  let coordinate
  const nextLetters = []
  const [startColIndex, startRowIndex] = currentPath[currentPath.length - 1]

  for (i; i < 2; i++) {
    rowIndex = startRowIndex + i
    row = board[rowIndex]

    if (row) {
      let j = -1
      for (j; j < 2; j++) {
        if (j === 0 && i === 0) {
          continue
        }

        colIndex = startColIndex + j
        letter = row[colIndex]
        coordinate = [colIndex, rowIndex]

        if (letter && !isCoordinateUsed({ coordinate, currentPath })) {
          nextLetters.push({ letter, coordinate })
        }
      }
    }
  }

  return nextLetters
}

const isCoordinateUsed = ({ coordinate, currentPath }) => {
  let i = 0
  let length = currentPath.length

  for (i; i < length; i++) {
    if (currentPath[i] === coordinate) {
      return true
    }
  }

  return false
}

const findMatches = ({ searchString, validWordList }) => {
  const partialMatches = []
  let fullMatch = null
  let i = 0
  let length = validWordList.length

  for (i; i < length; i++) {
    const word = validWordList[i]

    if (word === searchString) {
      fullMatch = word
    } else if (word.indexOf(searchString) === 0) {
      partialMatches.push(word)
    }
  }

  return { fullMatch, partialMatches }
}
