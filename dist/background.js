chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: 'bundle.js' })
})

function logURL (requestDetails) {
  console.log('Loading: ' + requestDetails.url)
}

// https://medium.com/better-programming/chrome-extension-intercepting-and-reading-the-body-of-http-requests-dd9ebdf2348b
// https://developer.chrome.com/docs/extensions/reference/devtools_network/
