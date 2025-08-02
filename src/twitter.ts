function hideFeed() {
  const feedSelectors = [
    '[data-testid="primaryColumn"] section > h1 + div > div',
    '[aria-label="Timeline: Your Home Timeline"]',
    '[aria-label="Timeline: Trending now"]',
    '[data-testid="tweet"]',
    '[data-testid="cellInnerDiv"]',
    'div[style*="position: absolute; width: 100%;"]'
  ];

  const style = document.createElement('style');
  style.textContent = feedSelectors.map(selector => `${selector} { display: none !important; }`).join('\n');
  document.head.appendChild(style);

  const checkAndAddMessage = () => {
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]');
    if (primaryColumn && !document.querySelector('.feed-blocker-message')) {
      const message = document.createElement('div');
      message.className = 'feed-blocker-message';
      message.style.cssText = `
        text-align: center;
        padding: 40px;
        font-size: 18px;
        color: #536471;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        margin-top: 20px;
      `;
      message.textContent = 'Twitter/X feed hidden by Feed Blocker';
      
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

const observer = new MutationObserver(() => {
  const feedExists = document.querySelector('[data-testid="tweet"]');
  if (feedExists) {
    hideFeed();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});