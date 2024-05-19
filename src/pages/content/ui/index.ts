import '@pages/content/ui/root';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillForm" && message.data) {
    const { name, email } = message.data;

    const nameInput = document.querySelector<HTMLInputElement>('#name');
    const emailInput = document.querySelector<HTMLInputElement>('#email');

    if (nameInput) nameInput.value = name;
    if (emailInput) emailInput.value = email;

    sendResponse({ status: "form filled" });
  }
});