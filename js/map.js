/* ============================================================
   MARA – Map Module (D3 Choropleth)
   ============================================================ */

const MapModule = (() => {

  // ─── MENA ISO numeric codes ────────────────────────────
  const MENA_IDS = new Set([
    12,   // Algeria
    48,   // Bahrain
    818,  // Egypt
    364,  // Iran
    368,  // Iraq
    376,  // Israel
    400,  // Jordan
    414,  // Kuwait
    422,  // Lebanon
    434,  // Libya
    504,  // Morocco
    512,  // Oman
    275,  // Palestine
    634,  // Qatar
    682,  // Saudi Arabia
    729,  // Sudan
    760,  // Syria
    788,  // Tunisia
    784,  // UAE
    887   // Yemen
  ]);

  // Map iso numeric → country id in our data
  const ISO_TO_ID = {
    12: 'DZA', 48: 'BHR', 818: 'EGY', 364: 'IRN', 368: 'IRQ',
    376: 'ISR', 400: 'JOR', 414: 'KWT', 422: 'LBN', 434: 'LBY',
    504: 'MAR', 512: 'OMN', 275: 'PSE', 634: 'QAT', 682: 'SAU',
    729: 'SDN', 760: 'SYR', 788: 'TUN', 784: 'UAE', 887: 'YEM'
  };

  let svg, g, projection, path, zoom;
  let selectedCountry = null;
  let tooltip = null;
  const TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  function init() {
    tooltip = document.getElementById('map-tooltip');
    renderMap();
    setupZoomControls();
  }

  async function renderMap() {
    const container = document.getElementById('map-svg-container');
    const loading = document.getElementById('map-loading');
    const W = container.clientWidth;
    const H = container.clientHeight;

    svg = d3.select('#map-svg')
      .attr('width', W)
      .attr('height', H);

    // Ocean background
    svg.append('rect')
      .attr('width', W)
      .attr('height', H)
      .attr('fill', '#040C1A');

    g = svg.append('g');

    // Subtle grid lines on ocean
    const gridG = g.append('g').attr('class', 'map-grid');
    for (let i = 0; i < W; i += 60) {
      gridG.append('line')
        .attr('x1', i).attr('y1', 0).attr('x2', i).attr('y2', H)
        .attr('stroke', 'rgba(0,212,170,0.025)').attr('stroke-width', 1);
    }
    for (let j = 0; j < H; j += 60) {
      gridG.append('line')
        .attr('x1', 0).attr('y1', j).attr('x2', W).attr('y2', j)
        .attr('stroke', 'rgba(0,212,170,0.025)').attr('stroke-width', 1);
    }

    // Projection centered on MENA
    projection = d3.geoMercator()
      .center([38, 28])
      .scale(W * 0.95)
      .translate([W * 0.42, H * 0.56]);

    path = d3.geoPath().projection(projection);

    // Zoom behaviour
    zoom = d3.zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', e => g.attr('transform', e.transform));
    svg.call(zoom);

    try {
      const world = await d3.json(TOPOJSON_URL);
      const countries = topojson.feature(world, world.objects.countries);

      // Draw non-MENA countries
      g.selectAll('.non-mena')
        .data(countries.features.filter(f => !MENA_IDS.has(+f.id)))
        .enter().append('path')
        .attr('class', 'country-path non-mena')
        .attr('d', path);

      // Draw MENA countries
      const menaFeatures = countries.features.filter(f => MENA_IDS.has(+f.id));

      g.selectAll('.mena')
        .data(menaFeatures)
        .enter().append('path')
        .attr('class', d => {
          const cid = ISO_TO_ID[+d.id];
          const country = MARA_DATA.countries[cid];
          const tier = country ? `tier-${country.tier}` : 'tier-3';
          return `country-path mena ${tier}`;
        })
        .attr('id', d => `country-${ISO_TO_ID[+d.id]}`)
        .attr('d', path)
        .on('mouseenter', onCountryHover)
        .on('mousemove', onCountryMove)
        .on('mouseleave', onCountryLeave)
        .on('click', onCountryClick);

      // Country labels for larger countries
      const labeledCountries = new Set(['SAU','EGY','IRN','DZA','LBY','SDN','MAR','IRQ','YEM']);
      g.selectAll('.country-label')
        .data(menaFeatures.filter(f => labeledCountries.has(ISO_TO_ID[+f.id])))
        .enter().append('text')
        .attr('class', 'country-label')
        .attr('transform', d => {
          const centroid = path.centroid(d);
          return `translate(${centroid[0]}, ${centroid[1]})`;
        })
        .text(d => {
          const cid = ISO_TO_ID[+d.id];
          const c = MARA_DATA.countries[cid];
          return c ? c.shortName || c.name : '';
        });

      // Hide loading
      loading.classList.add('hidden');
      setTimeout(() => loading.remove(), 600);

      // Hide click hint after first interaction
      document.getElementById('map-click-hint');

    } catch(err) {
      console.error('Map load error:', err);
      loading.innerHTML = `<div class="loader"></div><p>Retrying map data…</p>`;
    }
  }

  function getCountryData(d) {
    const cid = ISO_TO_ID[+d.id];
    return cid ? { id: cid, data: MARA_DATA.countries[cid] } : null;
  }

  function onCountryHover(event, d) {
    const info = getCountryData(d);
    if (!info || !info.data) return;
    const c = info.data;

    // Update score bar
    updateScoreBar(c);

    // Show tooltip
    const tt = document.getElementById('map-tooltip');
    tt.innerHTML = `
      <div class="tt-flag">${c.flag}</div>
      <div class="tt-name">${c.name}</div>
      <div class="tier-badge tier-${c.tier}" style="margin-bottom:8px;">
        Tier ${c.tier} · ${['Global Leader','Emerging','Developing'][c.tier-1]}
      </div>
      <div class="tt-score-bar">
        <div class="tt-score-label"><span>Compute</span><span>${c.scores.compute}/100</span></div>
        <div class="tt-bar-track"><div class="tt-bar-fill" style="width:${c.scores.compute}%;background:var(--accent-teal)"></div></div>
        <div class="tt-score-label"><span>Privacy</span><span>${c.scores.privacy}/100</span></div>
        <div class="tt-bar-track"><div class="tt-bar-fill" style="width:${c.scores.privacy}%;background:#60A5FA"></div></div>
        <div class="tt-score-label"><span>Governance</span><span>${c.scores.governance}/100</span></div>
        <div class="tt-bar-track"><div class="tt-bar-fill" style="width:${c.scores.governance}%;background:var(--accent-gold)"></div></div>
      </div>
      <div class="tt-cta">→ Click to open dossier</div>
    `;
    tt.classList.add('visible');

    // Highlight SVG path
    d3.select(event.currentTarget).raise();

    // Hide click hint
    const hint = document.getElementById('map-click-hint');
    if (hint) hint.classList.add('hidden');
  }

  function onCountryMove(event) {
    const tt = document.getElementById('map-tooltip');
    const pad = 14;
    const tw = tt.offsetWidth;
    const th = tt.offsetHeight;
    let x = event.clientX + pad;
    let y = event.clientY - th / 2;
    if (x + tw > window.innerWidth) x = event.clientX - tw - pad;
    if (y < 0) y = pad;
    if (y + th > window.innerHeight) y = window.innerHeight - th - pad;
    tt.style.left = x + 'px';
    tt.style.top  = y + 'px';
  }

  function onCountryLeave() {
    document.getElementById('map-tooltip').classList.remove('visible');
  }

  function onCountryClick(event, d) {
    const info = getCountryData(d);
    if (!info || !info.data) return;

    // Deselect previous
    if (selectedCountry) {
      d3.select(`#country-${selectedCountry}`).classed('selected', false);
    }
    selectedCountry = info.id;
    d3.select(`#country-${info.id}`).classed('selected', true);

    // Open dossier
    DossierModule.open(info.id, info.data);
    event.stopPropagation();
  }

  function updateScoreBar(c) {
    const bar = document.getElementById('score-bar');
    bar.innerHTML = `
      <div class="score-bar-title">📊 ${c.name}</div>
      <div class="score-bar-row">
        <span class="score-bar-label">Compute</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${c.scores.compute}%;background:var(--accent-teal)"></div></div>
        <span class="score-bar-val">${c.scores.compute}</span>
      </div>
      <div class="score-bar-row">
        <span class="score-bar-label">Privacy</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${c.scores.privacy}%;background:#60A5FA"></div></div>
        <span class="score-bar-val">${c.scores.privacy}</span>
      </div>
      <div class="score-bar-row">
        <span class="score-bar-label">Governance</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${c.scores.governance}%;background:var(--accent-gold)"></div></div>
        <span class="score-bar-val">${c.scores.governance}</span>
      </div>
    `;
  }

  function setupZoomControls() {
    document.getElementById('zoom-in').addEventListener('click', () => {
      svg.transition().duration(300).call(zoom.scaleBy, 1.5);
    });
    document.getElementById('zoom-out').addEventListener('click', () => {
      svg.transition().duration(300).call(zoom.scaleBy, 0.67);
    });
    document.getElementById('zoom-reset').addEventListener('click', () => {
      svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
    });
  }

  return { init };
})();
