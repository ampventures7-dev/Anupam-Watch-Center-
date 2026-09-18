/**
 * Anupam Watch Center - Interactive Features
 * 1. Live Store Status Indicator (IST Hours: 10:30 AM - 9:00 PM)
 * 2. Interactive Watch Finder Quiz
 * 3. Dial Size & Wrist Visualizer Guide
 * 4. Watch Service & Repair WhatsApp Form Builder
 */

(function () {
  'use strict';

  // WhatsApp store number
  const STORE_PHONE = '919407055539';

  /* ========================================================
     1. Live Store Operating Status (IST 10:30 AM - 9:00 PM)
     ======================================================== */
  function updateStoreStatus() {
    const statusBadges = document.querySelectorAll('.live-store-status');
    if (!statusBadges.length) return;

    // Get current time in Indian Standard Time (UTC + 5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (3600000 * 5.5));

    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const currentDecimal = hours + (minutes / 60);

    // Open between 10:30 AM (10.5) and 9:00 PM (21.0)
    const isOpen = currentDecimal >= 10.5 && currentDecimal < 21.0;

    statusBadges.forEach((badge) => {
      const isCompact = badge.getAttribute('data-compact') === 'true';
      if (isOpen) {
        badge.className = 'live-store-status open text-nowrap';
        badge.innerHTML = isCompact 
          ? '<span class="status-dot"></span> Open • Closes 9 PM' 
          : '<span class="status-dot"></span> <strong>Open Now</strong> • Closes at 9:00 PM';
      } else {
        badge.className = 'live-store-status closed text-nowrap';
        badge.innerHTML = isCompact 
          ? '<span class="status-dot"></span> Closed • Opens 10:30 AM' 
          : '<span class="status-dot"></span> <strong>Closed Now</strong> • Opens at 10:30 AM';
      }
    });
  }

  /* ========================================================
     2. Interactive Watch Finder Quiz
     ======================================================== */
  const quizState = {
    recipient: 'men',
    recipientLabel: 'Men',
    style: 'office',
    styleLabel: 'Daily Office & Formal',
    budget: '5k-15k',
    budgetLabel: '₹5,000 – ₹15,000'
  };

  const recommendationsData = {
    'men': {
      title: 'Titan Workwear & Octane Chronograph',
      brand: 'TITAN / TOMMY HILFIGER',
      desc: 'Precision multifunction quartz movement, stainless steel case, and scratch-resistant mineral glass. Perfect for everyday professionalism and weekend elegance.',
      tags: ['100% Genuine', '2 Years Warranty', 'Water Resistant']
    },
    'women': {
      title: 'Titan Raga Viva & Fastrack Glitz',
      brand: 'TITAN RAGA / FASTRACK',
      desc: 'Delicate jewelry-inspired bracelets, rose gold dials, and mother-of-pearl accents designed to celebrate feminine grace on every occasion.',
      tags: ['Jewelry Clasp', 'Official Box', 'Elegant Design']
    },
    'couple': {
      title: 'Titan Bandhan & Sonata Wedding Pairs',
      brand: 'TITAN BANDHAN / SONATA PAIRS',
      desc: 'Matching His & Her timepieces in classic gold and duo-tone finishes. Ideal for weddings, anniversaries, and milestone family celebrations.',
      tags: ['Luxury Couple Box', 'Complimentary Sizing', 'Special Gift Wrap']
    },
    'unisex': {
      title: 'Fastrack Reflex Smart & Police Statement',
      brand: 'FASTRACK SMART / POLICE',
      desc: 'Bluetooth calling, fitness tracking, AMOLED display, and edgy unisex aesthetics for modern active lifestyles.',
      tags: ['Smart Features', '1 Year Warranty', 'Youth Favorite']
    }
  };

  function updateQuizResults() {
    const rec = recommendationsData[quizState.recipient] || recommendationsData['men'];
    
    const titleEl = document.getElementById('quizResultTitle');
    const brandEl = document.getElementById('quizResultBrand');
    const descEl = document.getElementById('quizResultDesc');
    const tagsEl = document.getElementById('quizResultTags');
    const btnEl = document.getElementById('quizWhatsAppBtn');

    if (titleEl) titleEl.textContent = rec.title;
    if (brandEl) brandEl.textContent = rec.brand;
    if (descEl) descEl.textContent = rec.desc;

    if (tagsEl) {
      tagsEl.innerHTML = rec.tags.map(t => `<span class="badge bg-dark border border-secondary me-2 mb-2">${t}</span>`).join('');
    }

    if (btnEl) {
      const msg = `Hello Anupam Watch Center! I used your Watch Finder on your website.\n\n` +
                  `• Recipient: ${quizState.recipientLabel}\n` +
                  `• Style: ${quizState.styleLabel}\n` +
                  `• Budget: ${quizState.budgetLabel}\n\n` +
                  `Please share available models, photos, and current prices in stock.`;
      btnEl.href = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
    }
  }

  function initQuiz() {
    document.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const step = this.getAttribute('data-step');
        const val = this.getAttribute('data-val');
        const label = this.textContent.trim();

        // Update active class within same step
        const parentGroup = this.closest('.quiz-group');
        if (parentGroup) {
          parentGroup.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('active'));
        }
        this.classList.add('active');

        if (step === 'recipient') {
          quizState.recipient = val;
          quizState.recipientLabel = label;
        } else if (step === 'style') {
          quizState.style = val;
          quizState.styleLabel = label;
        } else if (step === 'budget') {
          quizState.budget = val;
          quizState.budgetLabel = label;
        }

        updateQuizResults();
      });
    });

    updateQuizResults();
  }

  /* ========================================================
     3. Dial Size & Wrist Guide Visualizer (Interactive Clock)
     ======================================================== */
  const dialData = {
    '36': {
      size: '36mm',
      scale: 0.85,
      strapWidth: '78px',
      caliper: '⟵ 36.0 mm ⟶',
      category: 'Vintage & Petite Classic',
      wrist: 'Best for wrists under 6.2 inches (Delicate & Classic Dress)',
      desc: 'Traditional mid-century proportions. Ideal for women, slender wrists, and understated dress watches like classic Titan or Sonata.',
      models: 'Titan Classic Slim, Sonata Everyday, Vintage Dials',
      tip: 'A <strong>36mm</strong> dial is the timeless mid-century dress size. Outstanding balance on slender wrists without overpowering cuffs.',
      activePill: 'pillSlender'
    },
    '40': {
      size: '40mm',
      scale: 0.97,
      strapWidth: '90px',
      caliper: '⟵ 40.0 mm ⟶',
      category: 'The Universal Standard',
      wrist: 'Best for wrists 6.2 to 7.0 inches (Most Popular Men\'s Size)',
      desc: 'The gold standard in modern watches. Fits virtually every wrist comfortably for office, formal suits, and casual daily wear.',
      models: 'Titan Workwear, Tommy Hilfiger Classic, Kenneth Cole Slim',
      tip: 'A <strong>40mm</strong> dial offers the golden ratio for standard wrists (6.2" to 7.0"), ideal for both formal office cuffs and casual daily wear.',
      activePill: 'pillUniversal'
    },
    '42': {
      size: '42mm',
      scale: 1.08,
      strapWidth: '98px',
      caliper: '⟵ 42.0 mm ⟶',
      category: 'Modern Contemporary & Chrono',
      wrist: 'Best for wrists 6.7 to 7.5 inches (Substantial Presence)',
      desc: 'Gives a modern, athletic wrist presence. Perfect for chronographs, multifunction dials, and sports models.',
      models: 'Titan Octane, Tommy Hilfiger Chronograph, Fastrack Bold',
      tip: 'A <strong>42mm</strong> dial provides commanding wrist presence. Perfect for chronographs, multifunction subdials, and sports attire.',
      activePill: 'pillUniversal'
    },
    '45': {
      size: '45mm+',
      scale: 1.20,
      strapWidth: '108px',
      caliper: '⟵ 45.0 mm ⟶',
      category: 'Bold Statement & Tactical',
      wrist: 'Best for wrists 7.2 inches and above (Large / Broad Wrists)',
      desc: 'Unapologetic statement styling. Demands attention with high-impact aesthetics, large subdials, and rugged cases.',
      models: 'Police Italia Statement, Fastrack Rugged, Oversized Chronos',
      tip: 'A <strong>45mm+</strong> dial is an unapologetic masculine statement. Best suited for broad wrists exceeding 7.0" and rugged casual styles.',
      activePill: 'pillBroad'
    }
  };

  function initDialGuide() {
    const dialVisual = document.getElementById('dialVisualPreview');
    const dialSvg = document.getElementById('dialSvg');
    const dialTicksGroup = document.getElementById('dialTicksGroup');
    const hourHand = document.getElementById('hourHandGroup');
    const minuteHand = document.getElementById('minuteHandGroup');
    const secondHand = document.getElementById('secondHandGroup');
    const dateText = document.getElementById('dialDateText');
    const modeText = document.getElementById('dialModeText');
    const syncBtn = document.getElementById('dialSyncBtn');
    const statusDot = document.querySelector('.dial-status-dot');

    const dialSizeBadge = document.getElementById('dialSizeBadge');
    const dialCategory = document.getElementById('dialCategory');
    const dialWrist = document.getElementById('dialWrist');
    const dialDesc = document.getElementById('dialDesc');
    const dialModels = document.getElementById('dialModels');
    const dialWaBtn = document.getElementById('dialWaBtn');
    const caliperText = document.getElementById('caliperText');
    const dialWristTip = document.getElementById('dialWristTip');
    const straps = document.querySelectorAll('#watchAssembly .watch-strap');

    // 1. Generate 60 Precision Minute & Hour Ticks
    if (dialTicksGroup && !dialTicksGroup.children.length) {
      let ticksHtml = '';
      for (let i = 0; i < 60; i++) {
        const deg = i * 6;
        if (i % 5 === 0) {
          // 5-minute major hour index + gold pip
          ticksHtml += `<line x1="120" y1="13" x2="120" y2="23" stroke="#06281b" stroke-width="2.5" stroke-linecap="round" transform="rotate(${deg} 120 120)" />`;
          ticksHtml += `<circle cx="120" cy="28" r="1.8" fill="#c5a059" transform="rotate(${deg} 120 120)" />`;
        } else {
          // 1-minute fine tick
          ticksHtml += `<line x1="120" y1="13" x2="120" y2="18.5" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" transform="rotate(${deg} 120 120)" />`;
        }
      }
      dialTicksGroup.innerHTML = ticksHtml;
    }

    // 2. Set current date in calendar aperture
    if (dateText) {
      dateText.textContent = new Date().getDate();
    }

    // 3. Clock State & Hands Control
    let isInteractiveMode = false;
    let autoResumeTimer = null;

    function applyHandAngles(hourAngle, minAngle, secAngle, animated = false) {
      if (!hourHand || !minuteHand) return;

      const transitionStyle = animated 
        ? 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
        : 'none';

      hourHand.style.transition = transitionStyle;
      minuteHand.style.transition = transitionStyle;
      if (secondHand) secondHand.style.transition = transitionStyle;

      hourHand.setAttribute('transform', `rotate(${hourAngle.toFixed(1)} 120 120)`);
      minuteHand.setAttribute('transform', `rotate(${minAngle.toFixed(1)} 120 120)`);
      if (secondHand && secAngle !== null) {
        secondHand.setAttribute('transform', `rotate(${secAngle.toFixed(1)} 120 120)`);
      }
    }

    function tickLiveClock() {
      if (isInteractiveMode) return;

      const now = new Date();
      const hrs = now.getHours() % 12;
      const mins = now.getMinutes();
      const secs = now.getSeconds();

      const secAngle = secs * 6;
      const minAngle = mins * 6 + (secs / 60) * 6;
      const hourAngle = hrs * 30 + (mins / 60) * 30;

      applyHandAngles(hourAngle, minAngle, secAngle, false);
    }

    // Run tick every second
    tickLiveClock();
    setInterval(tickLiveClock, 1000);

    function enterInteractiveMode(label) {
      isInteractiveMode = true;
      if (modeText) modeText.textContent = label || 'Interactive Mode';
      if (syncBtn) syncBtn.classList.remove('d-none');
      if (statusDot) {
        statusDot.style.backgroundColor = '#a37e2c';
        statusDot.style.boxShadow = '0 0 6px rgba(163, 126, 44, 0.8)';
      }

      // Automatically offer to resume after 25 seconds of inactivity
      clearTimeout(autoResumeTimer);
      autoResumeTimer = setTimeout(() => {
        resumeLiveClock();
      }, 25000);
    }

    function resumeLiveClock() {
      isInteractiveMode = false;
      clearTimeout(autoResumeTimer);
      if (modeText) modeText.textContent = 'Live Local Time';
      if (syncBtn) syncBtn.classList.add('d-none');
      if (statusDot) {
        statusDot.style.backgroundColor = '#22c55e';
        statusDot.style.boxShadow = '0 0 6px rgba(34, 197, 94, 0.8)';
      }
      tickLiveClock();
    }

    if (syncBtn) {
      syncBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        resumeLiveClock();
      });
    }

    // 4. Click on Hour Numerals
    document.querySelectorAll('.dial-hour-num').forEach((numEl) => {
      numEl.addEventListener('click', function (e) {
        e.stopPropagation();
        const hour = parseInt(this.getAttribute('data-hour'), 10);
        
        // Classic watch display: 10:10 aesthetic or selected hour:10
        const displayMin = (hour === 10) ? 10 : 12;
        const minAngle = displayMin * 6;
        const hourAngle = (hour % 12) * 30 + (displayMin / 60) * 30;
        const secAngle = 0;

        applyHandAngles(hourAngle, minAngle, secAngle, true);
        enterInteractiveMode(`Set to ${hour}:${displayMin < 10 ? '0' + displayMin : displayMin}`);
      });
    });

    // 5. Click anywhere on dial face to aim hands
    if (dialSvg) {
      dialSvg.addEventListener('click', function (e) {
        // Prevent click if user clicked a number (handled above)
        if (e.target.classList.contains('dial-hour-num')) return;

        const rect = dialSvg.getBoundingClientRect();
        const clickX = e.clientX - (rect.left + rect.width / 2);
        const clickY = e.clientY - (rect.top + rect.height / 2);

        // Angle in degrees (0 = 12 o'clock, 90 = 3 o'clock, etc.)
        let angle = Math.atan2(clickX, -clickY) * (180 / Math.PI);
        if (angle < 0) angle += 360;

        const minAngle = angle;
        const minutes = Math.round(angle / 6);
        const hourEstimate = Math.floor(angle / 30) || 12;
        const hourAngle = (hourEstimate % 12) * 30 + (minutes / 60) * 30;

        applyHandAngles(hourAngle, minAngle, angle, true);
        enterInteractiveMode(`Aimed to ${minutes} min marker`);
      });
    }

    // 6. Dial Diameter Selector Buttons (36mm, 40mm, 42mm, 45mm)
    document.querySelectorAll('.dial-selector-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.dial-selector-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const key = this.getAttribute('data-size');
        const d = dialData[key];
        if (!d) return;

        if (dialVisual) {
          dialVisual.style.transform = `scale(${d.scale})`;
        }
        if (dialSizeBadge) dialSizeBadge.textContent = d.size;
        if (dialCategory) dialCategory.textContent = d.category;
        if (dialWrist) dialWrist.textContent = d.wrist;
        if (dialDesc) dialDesc.textContent = d.desc;
        if (dialModels) dialModels.textContent = d.models;

        if (caliperText && d.caliper) caliperText.textContent = d.caliper;
        if (dialWristTip && d.tip) dialWristTip.innerHTML = d.tip;
        if (straps && d.strapWidth) {
          straps.forEach(s => s.style.width = d.strapWidth);
        }

        document.querySelectorAll('.wrist-indicator-pill').forEach(p => p.classList.remove('active'));
        if (d.activePill) {
          const activePillEl = document.getElementById(d.activePill);
          if (activePillEl) activePillEl.classList.add('active');
        }

        if (dialWaBtn) {
          const msg = `Hello Anupam Watch Center, I am looking for watches with dial size ${d.size} (${d.category}). Please show me what you have in stock.`;
          dialWaBtn.href = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
        }
      });
    });
  }

  /* ========================================================
     4. Watch Service & Repair Form Builder
     ======================================================== */
  function initServiceForm() {
    const brandSelect = document.getElementById('serviceBrand');
    const issueSelect = document.getElementById('serviceType');
    const notesInput = document.getElementById('serviceNotes');
    const submitBtn = document.getElementById('serviceSubmitBtn');

    function updateServiceLink() {
      if (!submitBtn) return;
      const brand = brandSelect ? brandSelect.value : 'Titan';
      const service = issueSelect ? issueSelect.value : 'Battery Replacement';
      const notes = notesInput && notesInput.value.trim() ? `\n• Notes: ${notesInput.value.trim()}` : '';

      const msg = `Hello Anupam Watch Center! I would like to book a watch repair/service.\n\n` +
                  `• Watch Brand: ${brand}\n` +
                  `• Service Needed: ${service}${notes}\n\n` +
                  `Please let me know estimated cost and service timing.`;

      submitBtn.href = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(msg)}`;
    }

    if (brandSelect) brandSelect.addEventListener('change', updateServiceLink);
    if (issueSelect) issueSelect.addEventListener('change', updateServiceLink);
    if (notesInput) notesInput.addEventListener('input', updateServiceLink);

    updateServiceLink();
  }

  /* ========================================================
     5. Home Section Interactive Watch Image Switcher (Auto 2s Rotator)
     ======================================================== */
  function initHeroImageSwitcher() {
    const thumbBtns = document.querySelectorAll('.hero-thumb-btn');
    const heroImg = document.querySelector('.hero-watch-img');
    const topPill = document.querySelector('.hero-floating-pill.top-pill');
    const bottomPill = document.querySelector('.hero-floating-pill.bottom-pill');

    if (!thumbBtns.length || !heroImg) return;

    let currentIndex = 0;
    let autoSwitchTimer = null;

    function switchToIndex(idx) {
      if (idx < 0 || idx >= thumbBtns.length) return;
      currentIndex = idx;
      const targetBtn = thumbBtns[idx];

      thumbBtns.forEach((b, i) => {
        b.classList.toggle('active', i === idx);
      });

      const newSrc = targetBtn.getAttribute('data-img');
      const newBadge = targetBtn.getAttribute('data-badge');
      const newSpec = targetBtn.getAttribute('data-spec');
      const newTheme = targetBtn.getAttribute('data-theme');

      // Update Home Section ambient theme matching the active watch model
      const homeSection = document.getElementById('home');
      if (homeSection && newTheme) {
        homeSection.classList.remove('theme-cognac', 'theme-sapphire', 'theme-khaki');
        homeSection.classList.add(newTheme);
      }

      heroImg.style.opacity = '0';
      heroImg.style.transform = 'scale(0.94)';

      setTimeout(() => {
        if (newSrc) heroImg.src = newSrc;
        if (topPill && newBadge) topPill.innerHTML = newBadge;
        if (bottomPill && newSpec) bottomPill.innerHTML = newSpec;
        heroImg.style.opacity = '1';
        heroImg.style.transform = 'scale(1)';
      }, 160);
    }

    function startAutoRotation() {
      stopAutoRotation();
      autoSwitchTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % thumbBtns.length;
        switchToIndex(nextIndex);
      }, 2000); // 2 second automatic gap
    }

    function stopAutoRotation() {
      if (autoSwitchTimer) {
        clearInterval(autoSwitchTimer);
        autoSwitchTimer = null;
      }
    }

    // Manual click on thumbnail pills
    thumbBtns.forEach((btn, idx) => {
      btn.addEventListener('click', function () {
        switchToIndex(idx);
        startAutoRotation(); // restart 2s timer after manual click
      });
    });

    // Start 2-second automatic rotation
    startAutoRotation();
  }

  /* ========================================================
     6. Mobile Navigation Drawer Auto-Close & Smooth Navigation
     ======================================================== */
  function initMobileNav() {
    const navCollapse = document.getElementById('navbarSupportedContent');
    const navToggler = document.getElementById('navbarMobileToggle');
    if (!navCollapse || !navToggler) return;

    navCollapse.addEventListener('click', function (e) {
      const targetLink = e.target.closest('a.nav-link, a.btn');
      if (!targetLink) return;

      if (window.innerWidth < 1200) {
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = window.bootstrap.Collapse.getInstance(navCollapse) || new window.bootstrap.Collapse(navCollapse, { toggle: false });
          bsCollapse.hide();
        } else if (navCollapse.classList.contains('show')) {
          navToggler.click();
        }
      }
    });
  }

  // Initialize all on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000); // Check every minute
    initHeroImageSwitcher();
    initQuiz();
    initDialGuide();
    initServiceForm();
    initMobileNav();
  });
})();
