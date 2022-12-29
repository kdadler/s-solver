const code = '5pyf0gcrl1a9oe3ui8d2htn67sqjkxbmw4vzPYFGCRLAOEUIDHTNSQJKXBMWVZ'.split('')
const decodeCharFunction = char => {
  let codeIndex = code.indexOf(char)
  return codeIndex === -1 ? char : code[(codeIndex - 12 + code.length) % code.length]
}

export const parseApiData = apiData => {
  const puzzle = apiData.data.puzzle

  puzzle.definitions = decipherEncodedJsonString(puzzle.definitions)
  puzzle.optionalWordScores = decipherEncodedCommaSeperatedString(puzzle.optionalWordScores)
  puzzle.wiktDefinitions = decipherEncodedJsonString(puzzle.wiktDefinitions)
  puzzle.wordScores = decipherEncodedCommaSeperatedString(puzzle.wordScores)

  return puzzle
}

export const getWordList = puzzle => puzzle.wordScores.concat(puzzle.optionalWordScores)

export const decipherEncodedString = string => atob(Array.from(string).map(decodeCharFunction).join(''))

export const decipherEncodedJsonString = string => JSON.parse(decipherEncodedString(string))

export const decipherEncodedCommaSeperatedString = string => decipherEncodedString(string).split(',')
