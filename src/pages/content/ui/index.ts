import('@pages/content/ui/root');

function collectAndSendFormData() {
    const forms = document.querySelectorAll('form');
    const formsData = Array.from(forms).map(form => {
        const formData: { [key: string]: string } = {};
        new FormData(form).forEach((value, key) => {
            formData[key] = value.toString();
        });
        return formData;
    });

    chrome.runtime.sendMessage({ action: "FORM_DATA", formsData });
}

document.addEventListener("DOMContentLoaded", () => {
    collectAndSendFormData();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "COLLECT_FORM_DATA") {
        collectAndSendFormData();
        sendResponse({ status: "Form data collected and sent." });
    }
});