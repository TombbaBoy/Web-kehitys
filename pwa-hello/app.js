// Register service worker with async/await
const registerServiceWorker = async () => {
  try {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('./sw.js');
      console.log('Service Worker registered');
    }
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
};

registerServiceWorker();
