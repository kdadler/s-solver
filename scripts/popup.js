const clickHandler = () => chrome.runtime.sendMessage('solve-s-puzzle')
const contentLoadedHandler = () => {
  document.getElementById('s-solver-submit').addEventListener('click', clickHandler);
}

document.addEventListener('DOMContentLoaded', contentLoadedHandler)
