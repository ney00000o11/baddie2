import { useEffect } from 'react';

export const TitleBar = () => {
  useEffect(() => {
    // Update document title
    document.title = 'baddie neyoo';
    
    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/lovable-uploads/783bf614-c8b9-4ea7-b95d-e55cffe5e029.png';
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = '/lovable-uploads/783bf614-c8b9-4ea7-b95d-e55cffe5e029.png';
      document.head.appendChild(newFavicon);
    }
  }, []);

  return (
    null
  );
};