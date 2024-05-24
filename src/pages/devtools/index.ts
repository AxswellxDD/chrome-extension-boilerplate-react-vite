import React from 'react';
import ReactDOM from 'react-dom';
import FormsList from './FormList';
import { sendMessage } from './PassMessageElement';


try {
  chrome.devtools.panels.create('Dev Tools', 'icon-34.png', 'rc/pages/panel/index.html');
} catch (e) {
  console.error('Error creating Dev Tools panel:', e);
}

// Add an event listener for when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed or updated');
});

const chromeTabs = (cb: (tabs: chrome.tabs.Tab[]) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, cb);
};

const sendMessageToActiveTab = (tabs: chrome.tabs.Tab[], cb: (response: any) => void) => {
  if (tabs[0] && tabs[0].id !== undefined) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'readForms' }, cb);
  } else {
    console.error('No active tab found or tab ID is undefined.');
  }
};

const handleFormDataResponse = (response: any) => {
  if (response && response.formsData) {
    sendMessage('form-data', response.formsData);
    renderFormsList(response.formsData);
  } else {
    sendMessage('error-form-data', 'No forms data received');
  }
};

const renderFormsList = (formsData: any[]) => {
 // ReactDOM.render(
    // <FormsList formData={formData} />, // Pass formsData as a props
    document.getElementById('root')
  //)
};


chromeTabs((tabs) => sendMessageToActiveTab(tabs, handleFormDataResponse));
