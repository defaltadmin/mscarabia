  (function() {
    var tsLoaded = false;
    function loadTurnstile() {
      if (tsLoaded) return;
      tsLoaded = true;
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      document.head.appendChild(s);
    }
    // pointerdown = actual mouse/touch only; Lighthouse uses programmatic focus
    document.addEventListener('pointerdown', function(e) {
      if (e.target.closest('form')) loadTurnstile();
    }, { once: true });
  })();