function hideFeed() {
  // Only hide the home feed when on the home page
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/home';
  
  if (!isHomePage) {
    return; // Don't hide anything on notifications or individual post pages
  }
  
  const feedSelectors = [
    '[aria-label="Timeline: Your Home Timeline"]',
    '[data-testid="primaryColumn"] section[aria-labelledby="accessible-list-0"]'
  ];

  // Check if style already exists
  if (!document.querySelector('#now-just-me-style')) {
    const style = document.createElement('style');
    style.id = 'now-just-me-style';
    style.textContent = feedSelectors.map(selector => `${selector} { display: none !important; }`).join('\n');
    document.head.appendChild(style);
  }

  const checkAndAddMessage = () => {
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
    if (primaryColumn && !document.querySelector('.now-just-me-message')) {
      const message = document.createElement('div');
      message.className = 'now-just-me-message';
      message.style.cssText = `
        text-align: center;
        padding: 40px;
        font-size: 18px;
        color: #536471;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        margin-top: 20px;
      `;
      message.textContent = 'Twitter/X feed hidden by Now Just Me';
      
      const header = primaryColumn.querySelector('h1');
      if (header && header.parentElement) {
        header.parentElement.appendChild(message);
      }
    }
  };

  setTimeout(checkAndAddMessage, 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideFeed);
} else {
  hideFeed();
}

// Track URL changes in single-page application
let lastUrl = location.href;
const observer = new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    // Remove the style when navigating away from home
    const existingStyle = document.querySelector('#now-just-me-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    // Remove the message if it exists
    const existingMessage = document.querySelector('.now-just-me-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }
  hideFeed();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});