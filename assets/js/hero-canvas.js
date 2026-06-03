/**
 * MSC Arabia — Professional Hero Background
 * Stripe/Linear-style: morphing gradient orbs + scroll parallax + geometric shapes
 */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ctx = canvas.getContext('2d');
  var w, h, raf;
  var mobile = window.innerWidth < 768;
  var scrollTarget = 0, scrollSmooth = 0;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Morphing gradient orbs (Stripe-style)
  var orbs = [
    { cx: 0.7, cy: 0.35, r: 0.45, color: [230, 57, 70], oa: 0.08, ob: 0.06, speed: 0.3, phase: 0, alpha: 0.15 },
    { cx: 0.25, cy: 0.65, r: 0.4, color: [59, 130, 246], oa: 0.06, ob: 0.08, speed: 0.22, phase: 2, alpha: 0.12 },
    { cx: 0.8, cy: 0.7, r: 0.35, color: [139, 92, 246], oa: 0.07, ob: 0.05, speed: 0.26, phase: 4, alpha: 0.10 },
    { cx: 0.45, cy: 0.2, r: 0.3, color: [6, 182, 212], oa: 0.05, ob: 0.07, speed: 0.18, phase: 1, alpha: 0.08 },
  ];

  // Floating geometric shapes (subtle, professional)
  var shapes = [];
  var shapeCount = mobile ? 5 : 10;

  function Shape() { this.reset(); }
  Shape.prototype.reset = function () {
    this.x = Math.random(); this.y = Math.random();
    this.size = Math.random() * 30 + 10;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpd = (Math.random() - 0.5) * 0.002;
    this.vy = -Math.random() * 0.08 - 0.01;
    this.opacity = Math.random() * 0.04 + 0.01;
    this.sides = [4, 5, 6][Math.floor(Math.random() * 3)];
    this.parallax = Math.random() * 0.3 + 0.1;
  };
  Shape.prototype.update = function () {
    this.y += this.vy * 0.01;
    this.rot += this.rotSpd;
    if (this.y < -0.1) { this.y = 1.1; this.x = Math.random(); }
  };
  Shape.prototype.draw = function (spx) {
    var sx = this.x * w + spx * this.parallax * 40;
    var sy = this.y * h;
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(this.rot);
    ctx.strokeStyle = 'rgba(230, 57, 70, ' + this.opacity + ')';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (var i = 0; i <= this.sides; i++) {
      var a = (Math.PI * 2 / this.sides) * i;
      var px = Math.cos(a) * this.size, py = Math.sin(a) * this.size;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.stroke(); ctx.restore();
  };

  function initShapes() { shapes = []; for (var i = 0; i < shapeCount; i++) shapes.push(new Shape()); }

  function drawOrb(orb, t, spx) {
    var x = orb.cx * w + Math.sin(t * 0.0003 * orb.speed + orb.phase) * w * orb.oa + spx * 0.12;
    var y = orb.cy * h + Math.cos(t * 0.00025 * orb.speed + orb.phase * 1.3) * h * orb.ob;
    var r = orb.r * Math.min(w, h) * (1 + Math.sin(t * 0.0002 + orb.phase * 2) * 0.1);
    var c = orb.color;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + orb.alpha + ')');
    g.addColorStop(0.5, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (orb.alpha * 0.25) + ')');
    g.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    return { x: x, y: y };
  }

  function drawConnections(positions) {
    ctx.lineWidth = 0.4;
    for (var i = 0; i < positions.length; i++) {
      for (var j = i + 1; j < positions.length; j++) {
        var dx = positions[j].x - positions[i].x;
        var dy = positions[j].y - positions[i].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < w * 0.5) {
          ctx.strokeStyle = 'rgba(230, 57, 70, ' + ((1 - dist / (w * 0.5)) * 0.03) + ')';
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }
    }
  }

  var startTime = null, lastFrame = 0;
  function draw(ts) {
    if (ts - lastFrame < 33) { raf = requestAnimationFrame(draw); return; }
    lastFrame = ts;
    if (!startTime) startTime = ts;
    var t = ts - startTime;
    scrollSmooth += (scrollTarget - scrollSmooth) * 0.06;
    var spx = scrollSmooth;
    ctx.clearRect(0, 0, w, h);

    // Deep dark base
    ctx.fillStyle = '#06070b';
    ctx.fillRect(0, 0, w, h);
    var baseGlow = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.8);
    baseGlow.addColorStop(0, 'rgba(15, 18, 30, 1)');
    baseGlow.addColorStop(1, 'rgba(6, 7, 11, 1)');
    ctx.fillStyle = baseGlow;
    ctx.fillRect(0, 0, w, h);

    // Orbs
    ctx.globalCompositeOperation = 'lighter';
    var positions = [];
    for (var i = 0; i < orbs.length; i++) positions.push(drawOrb(orbs[i], t, spx));
    ctx.globalCompositeOperation = 'source-over';

    drawConnections(positions);

    // Geometric shapes
    for (var j = 0; j < shapes.length; j++) { shapes[j].update(); shapes[j].draw(spx); }

    // Bottom fade
    var fadeG = ctx.createLinearGradient(0, h * 0.85, 0, h);
    fadeG.addColorStop(0, 'rgba(6, 7, 11, 0)');
    fadeG.addColorStop(1, 'rgba(6, 7, 11, 1)');
    ctx.fillStyle = fadeG;
    ctx.fillRect(0, h * 0.85, w, h * 0.15);

    raf = requestAnimationFrame(draw);
  }

  resize(); initShapes(); requestAnimationFrame(draw);
  var resizeTimer;
  window.addEventListener('resize', function () {
    cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(function() { resize(); initShapes(); });
  });
  window.addEventListener('scroll', function () { scrollTarget = window.scrollY; }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else { scrollTarget = window.scrollY; raf = requestAnimationFrame(draw); }
  });
})();
