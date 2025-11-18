# Embedding the Calculator in an iframe

This application automatically sends height updates to parent windows, making it perfect for iframe embedding without whitespace issues.

## How to Embed

### Basic Iframe Setup

```html
<iframe 
  id="pixi-calculator"
  src="https://your-calculator-url.com"
  width="100%"
  style="border: none; overflow: hidden;"
  scrolling="no"
></iframe>
```

### JavaScript to Handle Auto-Resize

Add this script to your parent page to automatically resize the iframe:

```html
<script>
  window.addEventListener('message', function(event) {
    // Check if the message is from our iframe
    if (event.data.type === 'iframe-resize') {
      const iframe = document.getElementById('pixi-calculator');
      if (iframe) {
        // Set the iframe height to match the content
        iframe.style.height = event.data.height + 'px';
      }
    }
  });
</script>
```

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>PIXI Calculator Embed</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .calculator-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="calculator-container">
    <iframe 
      id="pixi-calculator"
      src="https://your-calculator-url.com"
      width="100%"
      style="border: none; overflow: hidden; transition: height 0.3s ease;"
      scrolling="no"
    ></iframe>
  </div>

  <script>
    window.addEventListener('message', function(event) {
      if (event.data.type === 'iframe-resize') {
        const iframe = document.getElementById('pixi-calculator');
        if (iframe) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    });
  </script>
</body>
</html>
```

## How It Works

1. The calculator page monitors its own height using ResizeObserver and MutationObserver
2. Whenever the height changes (like when results are displayed), it sends a message to the parent window
3. The parent page receives the message and updates the iframe height accordingly
4. This happens automatically - no need to manually trigger resize events

## Security Note

The iframe uses `postMessage` with `'*'` origin for maximum compatibility. If you need stricter security, you can modify the `useIframeResize.ts` hook to specify allowed origins.

## Testing

To test locally:
1. Run your calculator application
2. Create an HTML file with the code above
3. Update the iframe `src` to point to your local development URL (e.g., `http://localhost:5000`)
4. Open the HTML file in your browser
5. The iframe should automatically resize when you calculate scores
