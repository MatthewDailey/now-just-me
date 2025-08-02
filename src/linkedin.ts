function hideFeed() {
  // Only hide the feed when on the home/feed page
  const isHomePage = window.location.pathname === '/feed/' || window.location.pathname === '/feed' || window.location.pathname === '/';
  
  if (!isHomePage) {
    return; // Don't hide anything on notifications, messages, or other pages
  }
  
  const feedSelectors = [
    '.feed-shared-update-v2',
    '.feed-shared-actor',
    '.feed-shared-news-module',
    '.feed-follows-module',
    '[data-id^="urn:li:activity"]'
  ];

  // Check if style already exists
  if (!document.querySelector('#now-just-me-linkedin-style')) {
    const style = document.createElement('style');
    style.id = 'now-just-me-linkedin-style';
    style.textContent = feedSelectors.map(selector => `${selector} { display: none !important; }`).join('\n');
    document.head.appendChild(style);
  }

  const feedContainer = document.querySelector('main.scaffold-layout__main');
  if (feedContainer && !document.querySelector('.now-just-me-message')) {
    const message = document.createElement('div');
    message.className = 'now-just-me-message';
    message.style.cssText = `
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #666;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    message.textContent = 'LinkedIn feed hidden by Now Just Me';
    feedContainer.insertBefore(message, feedContainer.firstChild);
  }
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
    // Remove the style when navigating away from feed
    const existingStyle = document.querySelector('#now-just-me-linkedin-style');
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