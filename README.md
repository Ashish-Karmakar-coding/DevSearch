# DevVibeLanding - Hacker Terminal New Tab Extension

A Chrome extension that replaces your new tab page with a cool hacker terminal interface, featuring a matrix rain effect, real-time clock, search functionality, and task management.

## Features

- 🖥️ **Hacker Terminal Theme**: Green-on-black terminal aesthetic with matrix rain background
- ⏰ **Real-time Clock**: Live clock with occasional "glitch" effects for authenticity
- 🔍 **Google Search**: Direct search integration with autofocus
- 📝 **Task Manager**: Sliding sidebar with persistent todo list (saves to localStorage)
- 🌐 **Quick Links**: Fast access to popular websites
- 📱 **Social Media**: Quick links to social platforms
- 🎨 **Matrix Rain**: Animated background effect
- 📱 **Responsive Design**: Works on different screen sizes

## Installation

1. **Download/Clone** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top right
4. **Click "Load unpacked"** and select the folder containing your extension files
5. **Open a new tab** to see your hacker terminal interface!

## Usage

### Search
- Type in the search box and press Enter or click "EXECUTE SEARCH"
- Searches open in a new tab via Google

### Task Management
- Click the "TASKS" button in the top-left corner
- Add tasks using the input field
- Delete tasks by clicking the "X" button
- Tasks are automatically saved to your browser's localStorage

### Quick Links
- Click any quick link to open the website in a new tab
- Includes popular sites like YouTube, GitHub, Stack Overflow, etc.

### Social Media
- Click the social media icons to visit your profiles
- All links open in new tabs

## File Structure

```
Chrome Extension/
├── manifest.json      # Extension configuration
├── popup.html         # Main new tab page (HTML + CSS + JS)
├── script.js          # Additional JavaScript (unused in current version)
├── style.css          # Additional CSS (unused in current version)
└── README.md          # This file
```

## Customization

### Changing Colors
Modify the CSS variables in the `:root` section:
```css
:root {
    --hacker-green: #00ff00;  /* Change this for different green */
    --hacker-dark: #0a0a0a;   /* Change this for different background */
    --hacker-gray: #222222;   /* Change this for different gray */
}
```

### Adding More Social Media
Find the `.social-links` section and add new social media icons:
```html
<a href="https://your-social.com" class="social-link" target="_blank">
    <i class="fab fa-your-icon"></i>
</a>
```

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Only `storage` for saving todo items
- **Storage**: Uses localStorage for persistent todo list
- **Responsive**: Includes mobile-friendly CSS media queries
- **Performance**: Optimized animations and effects

## Troubleshooting

### Extension Not Loading
- Make sure Developer Mode is enabled in Chrome extensions
- Check that all files are in the same folder
- Verify the manifest.json file is valid JSON

### Matrix Rain Not Working
- Ensure JavaScript is enabled in your browser
- Check browser console for any errors

### Tasks Not Saving
- Check that the `storage` permission is included in manifest.json
- Verify localStorage is enabled in your browser

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Edge (Chromium-based)
- ✅ Brave
- ❌ Firefox (requires different manifest format)
- ❌ Safari (not supported)

## License

This project is open source and available under the MIT License.

---

**Enjoy your new hacker terminal new tab experience!** 🖥️💚 
