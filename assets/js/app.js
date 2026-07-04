/* ── MSC Arabia — Consolidated JS ──────────────────────────────── */

/* Cookie banner: Escape to dismiss, focus trap on show */
(function() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var b = document.getElementById('cookie-banner');
      if (b && b.classList.contains('show')) handleCookieConsent('denied');
    }
  });
  var b = document.getElementById('cookie-banner');
  if (b) {
    var o = new MutationObserver(function() {
      if (b.classList.contains('show')) {
        var btn = b.querySelector('.cookie-deny,.cookie-accept');
        if (btn) btn.focus();
      }
    });
    o.observe(b, { attributes: true, attributeFilter: ['class'] });
  }
})();

/* Quote Capture — email capture from calculator */
(function() {
  var form = document.getElementById('quote-capture');
  if (!form) return;
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    var msg = document.getElementById('quote-msg');
    var btn = form.querySelector('button[type="submit"]');
    var emailInput = document.getElementById('quote-email');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    msg.textContent = '';
    try {
      var res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          workers: document.getElementById('mq_employees')?.value,
          duration: document.getElementById('mq_duration')?.value,
          profession: [...document.querySelectorAll('input[name="mq_profession"]:checked')].map(function(cb) { return cb.value; }).join(', '),
          total: document.getElementById('mq_total_val')?.textContent?.trim(),
        }),
      });
      if (res.ok) {
        msg.textContent = "Sent — we'll reply within 1-2 business days.";
        msg.style.color = 'var(--safe)';
        emailInput.value = '';
      } else {
        msg.textContent = 'Something went wrong, try again.';
        msg.style.color = 'var(--accent)';
      }
    } catch(err) {
      msg.textContent = 'Network error, try again.';
      msg.style.color = 'var(--accent)';
    }
    btn.disabled = false;
    btn.textContent = 'Email me this quote';
  });
})();

/* Scroll Reveal — IntersectionObserver fade-in */
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el) { observer.observe(el); });
})();

/* Hero Stats Count-Up — animated number transition on scroll */
(function() {
  var stats = document.querySelectorAll('.stat-val[data-num],.about-stat-val[data-num]');
  if (!stats.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var raw = el.getAttribute('data-num');
      var suffix = el.getAttribute('data-suf') || '';
      if (isNaN(parseInt(raw, 10))) return;
      var target = parseInt(raw, 10);
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 30));
      var interval = setInterval(function() {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current + suffix;
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  stats.forEach(function(el) { observer.observe(el); });
})();
