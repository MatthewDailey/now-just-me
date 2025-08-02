# Now Just Me - Firefox Extension

A Firefox extension that hides the feed on LinkedIn and Twitter/X, helping you stay focused and avoid distractions.

## Features

- Hides the main feed on LinkedIn
- Hides the timeline on Twitter/X
- Shows a simple message indicating the feed is hidden
- Lightweight and efficient
- Built with TypeScript for better code quality

## Installation

### For Development

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd now-just-me
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. For development with auto-rebuild:
   ```bash
   npm run watch
   ```

### Installing in Firefox

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to the project directory and select the `manifest.json` file
5. The extension is now loaded and active!

### Creating a Permanent Installation

To create a package for permanent installation:

1. Build the extension in production mode:
   ```bash
   NODE_ENV=production npm run build
   ```

2. Create a zip file containing:
   - `manifest.json`
   - `dist/` directory with the compiled JavaScript files
   - `icon.png` (if you add one)

3. Submit to [Firefox Add-ons](https://addons.mozilla.org/) or install locally using Firefox Developer Edition

## How It Works

The extension uses content scripts that:
- Inject CSS to hide feed elements
- Add a message showing the feed is blocked
- Monitor for dynamic content loading and reapply hiding rules

### LinkedIn
- Hides various feed components including posts, updates, and recommendations
- Targets LinkedIn's specific DOM structure

### Twitter/X
- Hides the main timeline and tweets
- Works with Twitter's dynamic content loading

## Project Structure

```
now-just-me/
├── src/
│   ├── linkedin.ts    # LinkedIn feed hiding logic
│   └── twitter.ts     # Twitter/X feed hiding logic
├── dist/              # Compiled JavaScript (generated)
├── manifest.json      # Extension manifest
├── package.json       # Node dependencies
├── tsconfig.json      # TypeScript configuration
├── build.js           # ESBuild configuration
└── README.md          # This file
```

## Development

- Written in TypeScript for type safety
- Uses ESBuild for fast compilation
- Minimal dependencies for a lightweight extension

## Privacy

This extension:
- Does not collect any user data
- Does not require any special permissions
- Only runs on LinkedIn and Twitter/X domains
- All processing happens locally in your browser

## License

[Add your license here]

## Contributing

[Add contribution guidelines if needed]