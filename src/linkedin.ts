function hideFeed() {
  const feedSelectors = [
    '.feed-shared-update-v2',
    '.feed-shared-actor',
    '.feed-shared-news-module',
    '.feed-follows-module',
    '[data-id^="urn:li:activity"]',
    '.scaffold-finite-scroll__content > div',
    'main.scaffold-layout__main > div > div'
  ];

  const style = document.createElement('style');
  style.textContent = feedSelectors.map(selector => `${selector} { display: none !important; }`).join('\n');
  document.head.appendChild(style);

  const feedContainer = document.querySelector('main.scaffold-layout__main');
  if (feedContainer) {
    const message = document.createElement('div');
    message.style.cssText = `
      text-align: center;
      padding: 40px;
      font-size: 18px;
      color: #666;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;
    message.textContent = 'LinkedIn feed hidden by Feed Blocker';
    feedContainer.insertBefore(message, feedContainer.firstChild);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideFeed);
} else {
  hideFeed();
}

const observer = new MutationObserver(() => {
  const feedExists = document.querySelector('[data-id^="urn:li:activity"]');
  if (feedExists) {
    hideFeed();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});