const CurrentUrl = chrome.runtime.onInstalled.addListener(() =>  {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(tabs[0])
  })
})

export default CurrentUrl;