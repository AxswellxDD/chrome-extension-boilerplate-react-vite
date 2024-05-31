import React, { useEffect, useState } from 'react';

const FormsValuesReader = () => {
    const [formsData, setFormsData] = useState<Array<{ [key: string]: string }>>([]);

    useEffect(() => {
        const handleMessage = (message: any) => {
            if (message.action === "FORM_DATA") {
                setFormsData(message.formsData);
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, []);

    const handleAutoFillClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.storage.sync.get([
                    'id', 'action', 'method', 'name'
                ], (result) => {
                    chrome.tabs.sendMessage(tabId, {
                        id: result.id,
                        action: result.action,
                        method: result.method,
                        name: result.name,
                    }, (response) => {
                        console.log(response.status);
                    });
                });
            }
        });
    };

    const handleLoadClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            if (tabId) {
                chrome.tabs.sendMessage(tabId, { action: "COLLECT_FORM_DATA" }, (response) => {
                    console.log(response.status);
                });
            }
        });
    };

    return (
        <div>
            <button id="auto-fill" onClick={handleAutoFillClick}>Auto Fill</button>
            <button id="load" onClick={handleLoadClick}>Load</button>
            {formsData.length > 0 ? (
                formsData.map((formData, index) => (
                    <div key={index}>
                        <h3>Formularz {index + 1}</h3>
                        <ul>
                            {Object.entries(formData).map(([key, value]) => (
                                <li key={key}><strong>{key}:</strong> {value}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>Brak danych formularza.</p>
            )}
        </div>
    );
};

export default FormsValuesReader;