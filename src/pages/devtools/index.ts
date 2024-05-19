try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error(e);
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (request.greeting === 'hello') response({ farewell: 'goodbye' });
});
