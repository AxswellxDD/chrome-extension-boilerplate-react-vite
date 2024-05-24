try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error(e);
}

// This event listener is triggered when the extension is first installed or when it is updated.
// In this case, it logs a simple message to the console.
chrome.runtime.onInstalled.addListener(() => {
  console.log('hello');
});
