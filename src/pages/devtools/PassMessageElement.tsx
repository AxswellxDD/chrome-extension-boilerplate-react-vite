export const sendMessage = (messageType: string, messageData: any) => {
  const message = {
    type: messageType,
    data: messageData
  };

  chrome.runtime.sendMessage(message, (response) => {
    console.log('Message sent:', message, 'Response:', response);
  });
};
