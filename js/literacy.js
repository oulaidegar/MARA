/* ============================================================
   MARA – Literacy Portal Module (C)
   ============================================================ */

const LiteracyModule = (() => {

  let simChart = null;
  let innovation = 60;
  let civil = 40;

  function init() {
    renderGuideCards();
    renderGuideAccordions();
    renderSimulator();
    initAccordions();
  }

  // ── Guide Intro Cards ──────────────────────────────────────
  function renderGuideCards() {
    const container = document.getElementById('guide-cards');
    if (!container) return;
    container.innerHTML = MARA_DATA.guides.map((g, i) => `
      <div class="guide-intro-card" style="--card-accent: linear-gradient(90deg, ${g.colorAccent}, transparent)" data-guide="${i}">
        <div class="guide-card-emoji">${g.emoji}</div>
        <div class="guide-card-title">${g.title}</div>
        <div class="guide-card-desc">${g.subtitle}</div>
        <div class="guide-card-cta">Read guide →</div>
      </div>
    `).join('');

    // Click to scroll to accordion
    container.querySelectorAll('.guide-intro-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = +card.dataset.guide;
        const target = document.querySelectorAll('.accordion-item')[idx];
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            if (!target.classList.contains('open')) {
              target.querySelector('.accordion-header').click();
            }
          }, 400);
        }
      });
    });
  }

  // ── Guide Accordions ──────────────────────────────────────
  function renderGuideAccordions() {
    const container = document.getElementById('guide-accordions');
    if (!container) return;
    container.innerHTML = MARA_DATA.guides.map(g => `
      <div class="accordion-item">
        <button class="accordion-header">
          <div style="display:flex;align-items:center;gap:var(--sp-3)">
            <span class="acc-icon">${g.emoji}</span>
            <div>
              <div>${g.title}</div>
              <div style="font-size:var(--text-sm);color:var(--text-muted);font-weight:400;margin-top:2px">${g.subtitle}</div>
            </div>
          </div>
          <svg class="acc-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion-body">
          <div class="accordion-content">
            ${g.sections.map(s => `
              <h5>${s.heading}</h5>
              <p>${s.body}</p>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
        // Open this if it was closed
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ── Case Impact Simulator ──────────────────────────────────
  function renderSimulator() {
    const innovSlider = document.getElementById('sim-innovation');
    const civilSlider = document.getElementById('sim-civil');
    if (!innovSlider || !civilSlider) return;

    // Init slider visuals
    updateSlider(innovSlider, 'innovation-slider');
    updateSlider(civilSlider, 'civil-slider');

    innovSlider.addEventListener('input', () => {
      innovation = +innovSlider.value;
      document.getElementById('sim-innovation-val').textContent = innovation;
      updateSlider(innovSlider, 'innovation-slider');
      updateResults();
    });

    civilSlider.addEventListener('input', () => {
      civil = +civilSlider.value;
      document.getElementById('sim-civil-val').textContent = civil;
      updateSlider(civilSlider, 'civil-slider');
      updateResults();
    });

    initChart();
    updateResults();
  }

  function updateSlider(slider, className) {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill', pct + '%');
  }

  // ── Compute simulation outputs ─────────────────────────────
  function computeResults(innov, civ) {
    // Economic growth: peaks at high innovation, dips with high civil protection (regulation friction)
    const economic = Math.round(20 + (innov * 0.55) + (civ * 0.15) - (innov * civ * 0.002));
    // Privacy protection: peaks at high civil
    const privacy = Math.round(10 + (civ * 0.75) + (innov * 0.05));
    // Trust score: best when both are balanced
    const trust = Math.round(Math.sqrt(innov * civ) * 0.9);
    // Talent retention: good governance + some innovation
    const talent = Math.round(15 + (civ * 0.4) + (innov * 0.35));
    // Foreign investment: peaks at high innovation, moderate civil
    const investment = Math.round(10 + (innov * 0.6) - Math.max(0, (civ - 60) * 0.3));
    // AI Safety risk: high innovation + low civil = high risk
    const safetyRisk = Math.round(100 - (civ * 0.5) - (innov > 70 ? (innov - 70) * 0.3 : 0) + (innov * 0.1));

    return {
      economic: Math.min(100, Math.max(0, economic)),
      privacy: Math.min(100, Math.max(0, privacy)),
      trust: Math.min(100, Math.max(0, trust)),
      talent: Math.min(100, Math.max(0, talent)),
      investment: Math.min(100, Math.max(0, investment)),
      safetyRisk: Math.min(100, Math.max(0, safetyRisk))
    };
  }

  function updateResults() {
    const r = computeResults(innovation, civil);

    // Update result cards
    document.getElementById('sim-res-economic').textContent = r.economic;
    document.getElementById('sim-res-privacy').textContent = r.privacy;
    document.getElementById('sim-res-trust').textContent = r.trust;
    document.getElementById('sim-res-talent').textContent = r.talent;
    document.getElementById('sim-res-investment').textContent = r.investment;
    document.getElementById('sim-res-risk').textContent = r.safetyRisk;

    // Color results
    colorResult('sim-res-economic', r.economic, false);
    colorResult('sim-res-privacy', r.privacy, false);
    colorResult('sim-res-trust', r.trust, false);
    colorResult('sim-res-talent', r.talent, false);
    colorResult('sim-res-investment', r.investment, false);
    colorResult('sim-res-risk', r.safetyRisk, true); // inverted (high risk = red)

    // Update chart
    if (simChart) {
      simChart.data.datasets[0].data = [r.economic, r.privacy, r.trust, r.talent, r.investment, 100 - r.safetyRisk];
      simChart.update('active');
    }
  }

  function colorResult(id, val, inverted) {
    const el = document.getElementById(id);
    if (!el) return;
    const effective = inverted ? (100 - val) : val;
    if (effective >= 65) el.style.color = 'var(--tier-1)';
    else if (effective >= 40) el.style.color = 'var(--tier-2)';
    else el.style.color = 'var(--tier-3)';
  }

  // ── Chart.js Radar ─────────────────────────────────────────
  function initChart() {
    const ctx = document.getElementById('sim-chart');
    if (!ctx) return;

    Chart.defaults.color = '#7A93BF';
    Chart.defaults.font.family = "'Inter', sans-serif";

    const r = computeResults(innovation, civil);

    simChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Economic Growth', 'Privacy Protection', 'Trust Score', 'Talent Retention', 'Foreign Investment', 'Safety Score'],
        datasets: [{
          label: 'Ecosystem Metrics',
          data: [r.economic, r.privacy, r.trust, r.talent, r.investment, 100 - r.safetyRisk],
          backgroundColor: 'rgba(0, 212, 170, 0.1)',
          borderColor: 'rgba(0, 212, 170, 0.7)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(0, 212, 170, 0.9)',
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: '#fff',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 25,
              font: { size: 10 },
              color: '#3D5480',
              backdropColor: 'transparent'
            },
            grid: { color: 'rgba(120,160,255,0.08)' },
            angleLines: { color: 'rgba(120,160,255,0.08)' },
            pointLabels: {
              font: { size: 11, weight: '500' },
              color: '#7A93BF'
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(5,10,20,0.95)',
            borderColor: 'rgba(0,212,170,0.3)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.formattedValue}/100`
            }
          }
        },
        animation: { duration: 400, easing: 'easeInOutQuart' }
      }
    });
  }

  function refresh() {
    renderGuideCards();
    renderGuideAccordions();
    initAccordions();
  }

  return { init, refresh };
})();
