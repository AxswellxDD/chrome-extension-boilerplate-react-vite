import '@pages/sidepanel/index.css';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/sidepanel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
}

init();

// This code sends a message to the background script with a greeting.
// Upon receiving the message, the background script sends a response with a farewell message.

chrome.runtime.sendMessage({ greeting: 'Hello' }, function (response) {
  console.log(response.farewell);
});
