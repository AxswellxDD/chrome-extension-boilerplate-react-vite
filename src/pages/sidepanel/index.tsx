import '@pages/sidepanel/index.css';
import { useState, useEffect } from 'react';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import ReactDOM from 'react-dom';

refreshOnUpdate('pages/sidepanel');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  ReactDOM.render(<IndexSidepanel />, appContainer);
}

init();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting === "hello") sendResponse({farewell: "goodbye"});
  }
);

function IndexSidepanel(): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [formData, setFormData] = useState<{ name: string, email: string }>({ name: '', email: '' });

  const getCurrentUrl = async (): Promise<void> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    setCurrentUrl(tab.url || 'unknown');
  };

  useEffect(() => {
    getCurrentUrl();
  }, [currentUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm", data: formData });
      }
    });
  };

  return (
    <div>
      <h1>You are currently at {currentUrl}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
                               }
