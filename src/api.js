export const makeRequest = async () => {
  const response = await fetch("https://squaredle.app/api/index.php", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "content-type": "text/plain;charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://squaredle.app/?date=2022-12-14",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify({
      op: 'getPuzzleForDay',
      args: {
        "dateStr": "2022/12/14",
        "uuid": "a1060eab-5ae7-4aaf-9191-298105464f33",
        "game": "squaredle",
      },
    }),
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });

  return response.json()
}
