/* ── MSC Arabia — Consolidated JS ──────────────────────────────── */

/* Event delegation: unified click handler for all data-action elements */
document.addEventListener('click', function(e) {
  var target = e.target;
  if (!target || typeof target.closest !== 'function') return;

  /* Stop CTA clicks from bubbling to card handlers */
  var cta = target.closest('.svc-card-cta');
  if (cta) { e.stopPropagation(); return; }

  /* data-action delegation — replaces all inline onclick handlers */
  var el = target.closest('[data-action]');
  if (!el) return;

  var action = el.getAttribute('data-action');
  var arg = el.getAttribute('data-action-arg') || '';

  switch (action) {
    case 'toggle-lang': toggleLang(); break;
    case 'toggle-mobile-menu': toggleMobileMenu(); break;
    case 'close-mobile-menu': closeMobileMenu(); break;
    case 'toggle-a11y': toggleA11y(); break;
    case 'adjust-text-size': adjustTextSize(parseInt(arg, 10) || 1); break;
    case 'toggle-contrast': toggleContrast(); break;
    case 'close-a11y': closeA11y(); break;
    case 'open-modal': openModal(arg); break;
    case 'close-modal': closeModal(arg); break;
    case 'cookie-deny': handleCookieConsent('denied'); break;
    case 'cookie-accept': handleCookieConsent('accepted'); break;
    case 'open-cookie-modal': openModal('cookie'); e.preventDefault(); break;
  }
}, true);

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

    if (!msg || !btn || !emailInput) return;

    btn.disabled = true;
    var oldText = btn.textContent;
    btn.textContent = 'Sending…';
    msg.textContent = '';

    try {
      var checkedProfessions = Array.prototype.slice
        .call(document.querySelectorAll('input[name="mq_profession"]:checked'))
        .map(function(cb) { return cb.value; })
        .join(', ');

      var res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value,
          workers: document.getElementById('mq_employees')?.value || '',
          duration: document.getElementById('mq_duration')?.value || '',
          budget: document.getElementById('mq_budget')?.value || '',
          profession: checkedProfessions,
          total: document.getElementById('mq_total_val')?.textContent?.trim() || '',
          website: document.getElementById('quote-website')?.value || '',
        }),
      });

      if (res.ok) {
        msg.textContent = "Sent — we'll reply within 1-2 business days.";
        msg.style.color = 'var(--safe, #22c55e)';
        emailInput.value = '';
      } else {
        msg.textContent = 'Something went wrong, try again.';
        msg.style.color = 'var(--accent)';
      }
    } catch {
      msg.textContent = 'Network error, try again.';
      msg.style.color = 'var(--accent)';
    } finally {
      btn.disabled = false;
      btn.textContent = oldText || 'Email me this quote';
    }
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

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finish(el) {
    var raw = el.getAttribute('data-num');
    var suffix = el.getAttribute('data-suf') || '';
    if (isNaN(parseInt(raw, 10))) return;
    el.textContent = parseInt(raw, 10) + suffix;
  }

  if (reduceMotion) {
    stats.forEach(finish);
    return;
  }

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
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + suffix;
      }, 40);

      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  stats.forEach(function(el) { observer.observe(el); });
})();
