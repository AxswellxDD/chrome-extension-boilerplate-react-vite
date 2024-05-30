import { useEffect, useState } from 'react';

const useCurrentUrl = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabURL = tabs[0].url || 'No URL found';
      setCurrentUrl(tabURL);
    });
  }, []);

  return currentUrl;
};

export default useCurrentUrl;