# How to Embed PIXI Calculator in Squarespace

## Step-by-Step Instructions

### 1. Get Your Published URL
First, publish your Replit app and copy the public URL (it will look something like `https://your-app-name.replit.app`)

### 2. Add Code Block in Squarespace
1. Edit the page where you want to add the calculator
2. Click the **+ Add Block** button
3. Search for and select **Code** block
4. Choose **HTML** as the code type

### 3. Paste the Embed Code
1. Open the file `SQUARESPACE_EMBED.html` from your project
2. Copy the entire code
3. Paste it into the Squarespace Code Block
4. Replace `YOUR_PUBLISHED_URL_HERE` with your actual Replit published URL

### 4. Save and Publish
1. Click **Apply** to save the code block
2. Click **Save** on your page
3. Publish your Squarespace site

## Example

If your published Replit URL is: `https://pixi-calculator.replit.app`

Change this line:
```html
src="YOUR_PUBLISHED_URL_HERE"
```

To this:
```html
src="https://pixi-calculator.replit.app"
```

## What This Code Does

✅ Embeds the calculator seamlessly in your Squarespace page  
✅ Automatically resizes as users interact with it (no whitespace!)  
✅ Works responsively on mobile and desktop  
✅ Includes smooth height transitions  
✅ No scrollbars inside the iframe  

## Troubleshooting

**Calculator not showing?**
- Make sure you've published your Replit app first
- Double-check the URL is correct (no typos)
- Ensure you're using the Code Block (not Embed Block)

**Height not adjusting?**
- Wait a few seconds after the page loads
- Make sure you've published the latest version of your Replit app with the iframe resize feature

**Need to adjust the width?**
- Change `max-width: 1200px;` in the first `<div>` to your preferred width
- Or set it to `100%` for full width

## Questions?

The embed code is in the `SQUARESPACE_EMBED.html` file - that's the only code you need to copy into Squarespace!
