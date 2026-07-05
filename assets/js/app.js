/* ── MSC Arabia — Consolidated JS ──────────────────────────────── */

/* Mark document as JS-ready for reveal system (content visible by default until this runs) */
document.documentElement.classList.add('js-reveal-ready');

/* Structured data — injected from trusted external JS to avoid inline CSP noise */
(function() {
  if (document.getElementById('msc-schema-jsonld')) return;

  var schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://mscarabia.com/#organization",
        "name": "MSC Arabia",
        "alternateName": "ESTABLISHMENT MARSAH ALHALLOUL FOR INFORMATION TECHNOLOGY",
        "url": "https://mscarabia.com",
        "logo": { "@type": "ImageObject", "url": "https://mscarabia.com/assets/logo.svg", "width": 120, "height": 120 },
        "image": "https://mscarabia.com/assets/og-image.jpg",
        "description": "Managed IT Services, MDM Licensing, Fire Safety Engineering, Manpower Solutions, and IT Hardware Procurement in Riyadh, Saudi Arabia.",
        "foundingDate": "2024",
        "founders": [{ "@type": "Person", "name": "MSC Arabia Management" }],
        "address": { "@type": "PostalAddress", "streetAddress": "6787 Abdulrahman Al Nasser, Al Khaleej Dist.", "addressLocality": "Riyadh", "addressRegion": "Riyadh", "postalCode": "13223", "addressCountry": "SA" },
        "geo": { "@type": "GeoCoordinates", "latitude": 24.7136, "longitude": 46.6753 },
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "knowsAbout": ["IT Services", "Fire Safety Engineering", "Mobile Device Management", "Manpower Solutions", "Hardware Procurement"],
        "sameAs": ["https://x.com/mscarabia", "https://www.linkedin.com/company/mscarabia"],
        "priceRange": "$$",
        "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"], "opens": "08:00", "closes": "17:00" },
        "contactPoint": [
          { "@type": "ContactPoint", "email": "info@mscarabia.com", "telephone": "+966551675320", "contactType": "customer service", "areaServed": "SA", "availableLanguage": ["English", "Arabic"] }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "MSC Arabia Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Managed IT Services", "description": "24/7 proactive monitoring, expert localized technical support, and comprehensive maintenance.", "provider": { "@id": "https://mscarabia.com/#organization" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MDM Licensing", "description": "Enterprise Mobile Device Management — Apple Business Manager, Microsoft Intune, Android Enterprise.", "provider": { "@id": "https://mscarabia.com/#organization" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fire Safety Engineering", "description": "Turnkey fire alarm, suppression, and evacuation systems — Siemens, BACnet, NFPA compliant.", "provider": { "@id": "https://mscarabia.com/#organization" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manpower Solutions", "description": "Vetted IT and engineering professionals deployed across Saudi Arabia with visa processing.", "provider": { "@id": "https://mscarabia.com/#organization" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hardware & Software", "description": "Enterprise procurement — Dell, HP, Lenovo fleet, Microsoft 365 licensing, asset lifecycle.", "provider": { "@id": "https://mscarabia.com/#organization" } } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Support & Maintenance", "description": "SLA-backed IT support with guaranteed response times and preventive maintenance.", "provider": { "@id": "https://mscarabia.com/#organization" } } }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://mscarabia.com/#website",
        "name": "MSC Arabia",
        "url": "https://mscarabia.com",
        "inLanguage": ["en", "ar"],
        "publisher": { "@id": "https://mscarabia.com/#organization" }
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Navigation",
        "url": "https://mscarabia.com",
        "hasPart": [
          { "@type": "SiteNavigationElement", "name": "Services", "url": "https://mscarabia.com/#services" },
          { "@type": "SiteNavigationElement", "name": "Engineering", "url": "https://mscarabia.com/#engineering" },
          { "@type": "SiteNavigationElement", "name": "Manpower", "url": "https://mscarabia.com/#manpower" },
          { "@type": "SiteNavigationElement", "name": "About", "url": "https://mscarabia.com/#about" },
          { "@type": "SiteNavigationElement", "name": "Contact", "url": "https://mscarabia.com/#contact" }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mscarabia.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://mscarabia.com/#services" },
          { "@type": "ListItem", "position": 3, "name": "Contact", "item": "https://mscarabia.com/#contact" }
        ]
      }
    ]
  };

  var s = document.createElement('script');
  s.id = 'msc-schema-jsonld';
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
})();

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
  var reveals = document.querySelectorAll('.reveal, .r');
  if (!reveals.length) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function(el) {
      el.classList.add('revealed');
      el.classList.add('v');
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.classList.add('v');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

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
