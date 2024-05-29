import React, { useEffect, useState } from 'react';

const CurrentUrlComponent: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    // Pobranie aktualnego URL
    const currentUrl = window.location.href;
    setCurrentUrl(currentUrl);
  }, []);

  return (
    <div>
      <p>Current URL: {currentUrl}</p>
    </div>
  );
};

export default CurrentUrlComponent;