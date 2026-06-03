(function() {
  'use strict';
  var content = document.querySelector('.hero-content');
  if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var target = 0, current = 0;
  window.addEventListener('scroll', function() { target = window.scrollY; }, { passive: true });
  function tick() {
    current += (target - current) * 0.08;
    var y = current * 0.15;
    var opacity = Math.max(1 - current / 600, 0);
    content.style.transform = 'translate3d(0,' + y + 'px,0)';
    content.style.opacity = opacity;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();