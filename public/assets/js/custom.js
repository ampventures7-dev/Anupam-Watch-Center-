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
     3. Dial Size & Wrist Guide Visualizer
     ======================================================== */
  const dialData = {
    '36': {
      size: '36mm',
      scale: 0.82,
      category: 'Vintage & Petite Classic',
      wrist: 'Best for wrists under 6.2 inches (Delicate & Classic Dress)',
      desc: 'Traditional mid-century proportions. Ideal for women, slender wrists, and understated dress watches like classic Titan or Sonata.',
      models: 'Titan Classic Slim, Sonata Everyday, Vintage Dials'
    },
    '40': {
      size: '40mm',
      scale: 0.94,
      category: 'The Universal Standard',
      wrist: 'Best for wrists 6.2 to 7.0 inches (Most Popular Men\'s Size)',
      desc: 'The gold standard in modern horology. Fits virtually every wrist comfortably for office, formal suits, and casual daily wear.',
      models: 'Titan Workwear, Tommy Hilfiger Classic, Kenneth Cole Slim'
    },
    '42': {
      size: '42mm',
      scale: 1.05,
      category: 'Modern Contemporary & Chrono',
      wrist: 'Best for wrists 6.7 to 7.5 inches (Substantial Presence)',
      desc: 'Gives a modern, athletic wrist presence. Perfect for chronographs, multifunction dials, and sports models.',
      models: 'Titan Octane, Tommy Hilfiger Chronograph, Fastrack Bold'
    },
    '45': {
      size: '45mm+',
      scale: 1.18,
      category: 'Bold Statement & Tactical',
      wrist: 'Best for wrists 7.2 inches and above (Large / Broad Wrists)',
      desc: 'Unapologetic statement styling. Demands attention with high-impact aesthetics, large subdials, and rugged cases.',
      models: 'Police Italia Statement, Fastrack Rugged, Oversized Chronos'
    }
  };

  function initDialGuide() {
    const dialVisual = document.getElementById('dialVisualPreview');
    const dialSizeBadge = document.getElementById('dialSizeBadge');
    const dialCategory = document.getElementById('dialCategory');
    const dialWrist = document.getElementById('dialWrist');
    const dialDesc = document.getElementById('dialDesc');
    const dialModels = document.getElementById('dialModels');
    const dialWaBtn = document.getElementById('dialWaBtn');

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

  // Initialize all on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    updateStoreStatus();
    setInterval(updateStoreStatus, 60000); // Check every minute
    initQuiz();
    initDialGuide();
    initServiceForm();
  });
})();
