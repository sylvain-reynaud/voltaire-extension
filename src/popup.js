;(async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  console.log(tab)
  document.querySelector('#ici').innerHTML = tab.getSelection().toString()
  // alert(`${window.getSelection().toString().length} characters found !`)
})()
