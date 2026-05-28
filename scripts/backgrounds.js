/**
 * MSC Arabia — Animated Mesh Gradient Background
 * Canvas-based subtle animated gradient for hero section
 */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var w, h;
  var blobs = [];
  var raf;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }

  function Blob(x, y, r, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.phase = Math.random() * Math.PI * 2;
  }

  Blob.prototype.update = function (t) {
    this.x += this.vx + Math.sin(t * 0.0005 + this.phase) * 0.15;
    this.y += this.vy + Math.cos(t * 0.0004 + this.phase) * 0.12;
    if (this.x < -this.r) this.x = w + this.r;
    if (this.x > w + this.r) this.x = -this.r;
    if (this.y < -this.r) this.y = h + this.r;
    if (this.y > h + this.r) this.y = -this.r;
  };

  Blob.prototype.draw = function () {
    var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0, this.color);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  function init() {
    resize();
    blobs = [
      new Blob(w * 0.6, h * 0.35, Math.min(w * 0.4, 400), 'rgba(230, 57, 70, 0.08)', 0.08, 0.04),
      new Blob(w * 0.2, h * 0.7, Math.min(w * 0.35, 350), 'rgba(59, 130, 246, 0.05)', -0.06, 0.03),
      new Blob(w * 0.8, h * 0.8, Math.min(w * 0.3, 300), 'rgba(139, 92, 246, 0.04)', 0.04, -0.05),
      new Blob(w * 0.4, h * 0.2, Math.min(w * 0.25, 250), 'rgba(6, 182, 212, 0.03)', -0.03, 0.06),
    ];
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    // Base gradient
    var bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#06070b');
    bg.addColorStop(0.5, '#0b0d14');
    bg.addColorStop(1, '#0f0812');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(230, 57, 70, 0.03)';
    ctx.lineWidth = 0.5;
    var gridSize = 60;
    for (var x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (var y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Animated blobs
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < blobs.length; i++) {
      blobs[i].update(t);
      blobs[i].draw();
    }
    ctx.globalCompositeOperation = 'source-over';

    raf = requestAnimationFrame(draw);
  }

  init();
  draw(0);

  window.addEventListener('resize', function () {
    resize();
    blobs = [
      new Blob(w * 0.6, h * 0.35, Math.min(w * 0.4, 400), 'rgba(230, 57, 70, 0.08)', 0.08, 0.04),
      new Blob(w * 0.2, h * 0.7, Math.min(w * 0.35, 350), 'rgba(59, 130, 246, 0.05)', -0.06, 0.03),
      new Blob(w * 0.8, h * 0.8, Math.min(w * 0.3, 300), 'rgba(139, 92, 246, 0.04)', 0.04, -0.05),
      new Blob(w * 0.4, h * 0.2, Math.min(w * 0.25, 250), 'rgba(6, 182, 212, 0.03)', -0.03, 0.06),
    ];
  });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });
})();
