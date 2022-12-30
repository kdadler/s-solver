/**
 * Enter an array of words into the grid.
 *
 * @param {Array} wordList
 */
export const enterWords = wordList => wordList.forEach(enterWord)

/**
 * Enters a word into the grid.
 *
 * @param {String} word
 */
const enterWord = word => {
  word.split('').forEach(letter => {
    pressKey(letter)
  })
  pressKey('Enter')
}

/**
 * Presses a single key.
 *
 * @param {String} key
 * @returns {boolean}
 */
const pressKey = key => window.dispatchEvent(new KeyboardEvent('keydown', { key }));
