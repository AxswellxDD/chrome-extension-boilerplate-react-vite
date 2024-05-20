import ReactDOM from 'react-dom';
import FormsList from './FormsList';

try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error(e);
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id as number, { action: 'readForms' }, function(response) {
    if (response && response.formsData) {
      console.log('Forms Data:', response.formsData);
      ReactDOM.render(<FormsList formsData={response.formsData} />, document.getElementById('root'));
    } else {
      console.log('No forms data received');
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  if (request.greeting === 'hello') response({ farewell: 'goodbye' });
});

chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'panel.html', (panel) => {
  panel.onShown.addListener((panelWindow) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id as number, { action: 'readForms' }, (response) => {
        if (response && response.formsData) {
          ReactDOM.render(<FormsList formsData={response.formsData} />, panelWindow.document.getElementById('root'));
        } else {
          console.log('No forms data received');
        }
      });
    });
  });
});