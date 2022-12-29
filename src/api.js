/**
 * Gets the puzzle date from the URL.
 *
 * TODO: Make this also work with special puzzles and today's puzzle.
 *
 * @returns {string}
 */
export const getPuzzleDate = () => {
  const queryString = window.location.toString().split('?')[1]

  return queryString.split('&').reduce((carry, query) => {
    const queryArgs = query.split('=')
    return queryArgs[0] === 'date' ? queryArgs[1] : carry
  }, null)
}

/**
 * Gets the UUID for the API request.
 *
 * @returns {string}
 */
export const getUuid = () => {
  const uuid = window.localStorage['squaredle-uuid']

  if (!uuid) {
    throw new Error('UUID not found in local storage')
  }

  return uuid
}

/**
 * Load raw API data for the puzzle.
 *
 * @returns {Promise<Object>}
 */
export const loadApiData = async () => {
  const puzzleDate = getPuzzleDate()
  const response = await fetch('https://squaredle.app/api/index.php', {
    'headers': {
      'accept': '*/*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'text/plain;charset=UTF-8',
      'pragma': 'no-cache',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
    'referrer': `https://squaredle.app/?date=${puzzleDate}`,
    'referrerPolicy': 'strict-origin-when-cross-origin',
    'body': JSON.stringify({
      op: 'getPuzzleForDay',
      args: {
        'dateStr': puzzleDate.replaceAll('-', '/'),
        'uuid': getUuid(),
        'game': 'squaredle',
      },
    }),
    'method': 'POST',
    'mode': 'cors',
    'credentials': 'include',
  })

  return response.json()
}
