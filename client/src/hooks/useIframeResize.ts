import { useEffect } from 'react';

export function useIframeResize() {
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      
      // Send message to parent window
      window.parent.postMessage(
        {
          type: 'iframe-resize',
          height: height
        },
        '*'
      );
    };

    // Send initial height
    sendHeight();

    // Create a ResizeObserver to watch for content changes
    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });

    // Observe the body element for size changes
    resizeObserver.observe(document.body);

    // Also send height when DOM changes (as backup)
    const mutationObserver = new MutationObserver(() => {
      sendHeight();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
