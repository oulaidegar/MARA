/* ============================================================
   MARA – Country Dossier Module
   ============================================================ */

const DossierModule = (() => {

  let currentCountry = null;

  function open(countryId, data) {
    currentCountry = countryId;
    renderDossier(data);
    document.getElementById('dossier-panel').classList.add('open');
    // Switch to first tab
    switchTab(0);
  }

  function close() {
    document.getElementById('dossier-panel').classList.remove('open');
    // Deselect map country
    document.querySelectorAll('.country-path.selected').forEach(p => p.classList.remove('selected'));
    currentCountry = null;
  }

  function renderDossier(c) {
    // Header
    renderHeader(c);
    // All tab contents
    renderTab1(c);
    renderTab2(c);
    renderTab3(c);
    renderTab4(c);
    renderTab5(c);
  }

  // ── Header ─────────────────────────────────────────────────
  function renderHeader(c) {
    document.getElementById('dossier-header').innerHTML = `
      <div class="dossier-header-top">
        <div class="dossier-country-id">
          <div class="dossier-flag">${c.flag}</div>
          <div>
            <div class="dossier-country-name">${c.name}</div>
            <div class="dossier-country-sub">
              <span class="tier-badge tier-${c.tier}">
                ● Tier ${c.tier} · ${['Global Leader','Emerging','Developing'][c.tier-1]}
              </span>
              <span>${c.region}</span>
            </div>
          </div>
        </div>
        <button class="dossier-close" id="dossier-close-btn" title="Close">✕</button>
      </div>
      <div class="score-banner">
        <div class="score-item compute">
          <div class="si-data">
            <div class="si-label">Compute<br>Assets</div>
            <div class="si-value">${c.scores.compute}</div>
          </div>
        </div>
        <div class="score-item privacy">
          <div class="si-data">
            <div class="si-label">Privacy<br>Protection</div>
            <div class="si-value">${c.scores.privacy}</div>
          </div>
        </div>
        <div class="score-item governance">
          <div class="si-data">
            <div class="si-label">Governance<br>Framework</div>
            <div class="si-value">${c.scores.governance}</div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('dossier-close-btn').addEventListener('click', close);
  }

  // ── Tab 1: Demographics ────────────────────────────────────
  function renderTab1(c) {
    const d = c.demographics;
    const el = document.getElementById('tab-demographics');
    el.innerHTML = `
      <div class="dossier-section-title"><span class="dst-icon">📊</span> Key Economic Metrics</div>
      <div class="demo-grid">
        <div class="demo-kv">
          <div class="dkv-label">Nominal GDP</div>
          <div class="dkv-value">${d.gdp}</div>
          <div class="dkv-sub">Growth: ${d.gdpGrowth} &nbsp;·&nbsp; PPP: ${d.gdpPPP}</div>
        </div>
        <div class="demo-kv">
          <div class="dkv-label">Population</div>
          <div class="dkv-value">${d.population}</div>
          <div class="dkv-sub">Growth rate: ${d.populationGrowth} &nbsp;·&nbsp; Median age: ${d.medianAge}</div>
        </div>
        <div class="demo-kv">
          <div class="dkv-label">Average Monthly Wage</div>
          <div class="dkv-value">${d.avgWage}</div>
          <div class="dkv-sub">Local market rate</div>
        </div>
        <div class="demo-kv">
          <div class="dkv-label">Annual STEM Graduates</div>
          <div class="dkv-value">${(d.stemGrads||0).toLocaleString()}</div>
          <div class="dkv-sub">Trend: ${d.stemGradGrowth}</div>
        </div>
        <div class="demo-kv">
          <div class="dkv-label">Literacy Rate</div>
          <div class="dkv-value">${d.literacy}</div>
          <div class="dkv-sub">National average</div>
        </div>
        <div class="demo-kv">
          <div class="dkv-label">Internet Penetration</div>
          <div class="dkv-value">${d.internetPenetration}</div>
          <div class="dkv-sub">% of population online</div>
        </div>
      </div>

      <div class="dossier-section-title"><span class="dst-icon">✈️</span> Diaspora Tracker — Intellectual Migration Loop</div>
      <div class="diaspora-list">
        ${(d.diaspora||[]).map(p => `
          <div class="diaspora-row">
            <div class="diaspora-avatar">${p.emoji}</div>
            <div class="diaspora-info">
              <div class="diaspora-name">${p.name}</div>
              <div class="diaspora-detail">${p.role}</div>
            </div>
            <div class="diaspora-loc">📍 ${p.location}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Tab 2: Privacy Ledger ──────────────────────────────────
  function renderTab2(c) {
    const p = c.privacy;
    const el = document.getElementById('tab-privacy');
    const statusColors = { green: 'badge-green', amber: 'badge-amber', red: 'badge-red' };
    const gdprItems = p.gdprGrid ? Object.entries({
      'Erasure Rights': p.gdprGrid.erasureRights,
      'Fine Structure': p.gdprGrid.fines,
      'Consent Model': p.gdprGrid.consent,
      'DPA Independence': p.gdprGrid.dpa,
      'Data Localisation': p.gdprGrid.dataLocalization,
      'Cross-Border Transfer': p.gdprGrid.crossBorderTransfer,
      'Breach Notification': p.gdprGrid.breachNotification,
    }) : [];

    el.innerHTML = `
      <div class="dossier-section-title"><span class="dst-icon">📋</span> Active Data Protection Laws</div>
      <div class="data-table-wrap" style="margin-bottom:var(--sp-5)">
        <table class="data-table">
          <thead><tr><th>Law</th><th>Status</th><th>Year</th></tr></thead>
          <tbody>
            ${(p.laws||[]).map(l => `
              <tr>
                <td>${l.name}${l.zone ? ` <span class="badge badge-blue">${l.zone}</span>` : ''}</td>
                <td><span class="badge ${l.status==='Active'?'badge-green':l.status==='Draft'?'badge-amber':'badge-red'}">${l.status}</span></td>
                <td style="font-family:var(--font-mono)">${l.year || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="adequacy-row">
        <span class="adequacy-label">🇪🇺 EU GDPR Adequacy Status</span>
        <span class="badge ${p.adequacy?.includes('Active') ? 'badge-green' : p.adequacy?.includes('Pending') ? 'badge-amber' : 'badge-red'}">${p.adequacy || 'Not evaluated'}</span>
      </div>

      <div class="dossier-section-title" style="margin-top:var(--sp-5)"><span class="dst-icon">🔍</span> GDPR Adequacy Grid — Discrepancy Analysis</div>
      <div class="gdpr-grid">
        ${gdprItems.map(([key, val]) => val ? `
          <div class="gdpr-cell">
            <div class="gc-label">${key}</div>
            <div class="gc-value">
              <span class="status-dot ${val.status || 'none'}" style="display:inline-block;margin-right:6px;vertical-align:middle"></span>
              <span style="color:${val.status==='green'?'var(--tier-1)':val.status==='amber'?'var(--tier-2)':'var(--tier-3)'}">${val.value}</span>
            </div>
            ${val.note ? `<div class="gc-sub">${val.note}</div>` : ''}
          </div>
        ` : '').join('')}
      </div>
    `;
  }

  // ── Tab 3: Infrastructure ──────────────────────────────────
  function renderTab3(c) {
    const inf = c.infrastructure;
    const el = document.getElementById('tab-infrastructure');
    const dcs = inf.dataCenters || [];
    const models = inf.aiModels || [];
    const flows = inf.capitalFlows || [];

    const parentBadge = (p) => {
      const map = { 'Amazon': '🔶', 'Amazon Web Services': '🔶', 'Microsoft': '🔷', 'Google': '🔵', 'Alphabet': '🔵', 'Huawei': '🔴' };
      for (const [k, v] of Object.entries(map)) if (p?.includes(k)) return v;
      return '⚪';
    };

    el.innerHTML = `
      <div class="dossier-section-title"><span class="dst-icon">🏗️</span> Computing Core — Data Centers</div>
      ${dcs.length ? dcs.map(dc => `
        <div class="datacenter-card">
          <div class="dc-header">
            <div>
              <div class="dc-name">${dc.name}</div>
              <div class="dc-location">📍 ${dc.location}</div>
            </div>
            <span class="badge badge-blue">${dc.tier}</span>
          </div>
          <div style="display:flex;gap:var(--sp-2);flex-wrap:wrap;margin-bottom:var(--sp-3)">
            ${dc.certifications?.map(cert => `<span class="badge badge-gray">${cert}</span>`).join('') || ''}
          </div>
          <div class="dc-stats">
            <div class="dc-stat">
              <div class="dst-label">Capacity</div>
              <div class="dst-value">${dc.megawatts} MW</div>
            </div>
            <div class="dc-stat">
              <div class="dst-label">Renewable</div>
              <div class="dst-value">${dc.solar}</div>
            </div>
            <div class="dc-stat">
              <div class="dst-label">Cooling</div>
              <div class="dst-value" style="font-size:10px;color:var(--text-muted)">${dc.cooling}</div>
            </div>
          </div>
          <div style="margin-top:var(--sp-3);font-size:var(--text-xs);color:var(--text-muted)">
            ${parentBadge(dc.parent)} Corporate parent: <strong style="color:var(--text-secondary)">${dc.parent}</strong>
          </div>
        </div>
      `).join('') : '<div class="empty-state"><div class="icon">🏗️</div><p>No major data center infrastructure documented</p></div>'}

      <div class="dossier-section-title"><span class="dst-icon">🤖</span> Sovereign Foundational Models</div>
      ${models.length ? models.map(m => `
        <div class="ai-model-card">
          <div class="model-icon">${m.emoji}</div>
          <div class="model-info">
            <div class="model-name">${m.name} <span style="font-size:var(--text-xs);color:var(--text-faint);font-family:var(--font-mono)">${m.params}</span></div>
            <div class="model-dev">${m.developer} · ${m.launched}</div>
            <div class="model-meta">
              <span class="badge ${m.license?.includes('Apache')||m.license?.includes('Open')||m.license?.includes('CC') ? 'badge-green' : m.license?.includes('Non-commercial') ? 'badge-amber' : 'badge-blue'}">${m.license}</span>
              <span class="badge badge-gray">${m.architecture}</span>
              ${m.languages?.map(l => `<span class="badge badge-violet">${l}</span>`).join('') || ''}
            </div>
          </div>
        </div>
      `).join('') : '<div class="empty-state"><div class="icon">🤖</div><p>No documented sovereign AI models</p></div>'}

      <div class="dossier-section-title"><span class="dst-icon">💰</span> Big Tech Capital Flows</div>
      ${flows.length ? flows.map(f => `
        <div class="flow-card">
          <div class="flow-amount">${f.amount}</div>
          <div class="flow-route">
            <strong style="color:var(--text-primary)">${f.investor}</strong>
            <span style="color:var(--text-faint)">→</span>
            <span>${f.target}</span>
            <span class="badge badge-gray" style="margin-left:auto">${f.year}</span>
          </div>
          <div class="badge badge-teal" style="width:fit-content">${f.type}</div>
          ${f.note ? `<div style="font-size:var(--text-xs);color:var(--text-muted);line-height:1.5">${f.note}</div>` : ''}
        </div>
      `).join('') : '<div class="empty-state"><div class="icon">💰</div><p>No documented capital flows</p></div>'}
    `;
  }

  // ── Tab 4: Disputes ────────────────────────────────────────
  function renderTab4(c) {
    const d = c.disputes;
    const el = document.getElementById('tab-disputes');
    el.innerHTML = `
      <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:var(--sp-5);line-height:1.6">
        Side-by-side view: official state policy positions against documented academic, civil, and journalistic critique.
      </p>
      <div class="split-columns">
        <div class="split-col">
          <div class="split-col-header official">✅ Official State Position</div>
          ${(d.official||[]).map(item => `
            <div class="split-item">
              ${item.text}
              ${item.source ? `<div class="source">— ${item.source}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="split-divider"></div>
        <div class="split-col">
          <div class="split-col-header critique">⚠️ Independent Critique & Civil Audit</div>
          ${(d.critique||[]).map(item => `
            <div class="split-item">
              ${item.text}
              ${item.source ? `<div class="source">— ${item.source}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ── Tab 5: Ecosystem ───────────────────────────────────────
  function renderTab5(c) {
    const el = document.getElementById('tab-ecosystem');
    const statusLabel = { active: 'Active', imprisoned: 'Imprisoned', released: 'Released' };
    el.innerHTML = `
      <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:var(--sp-5);line-height:1.6">
        Notable local digital activists, scholars, and civil organizations working on regional tech equity and digital rights.
      </p>
      ${(c.ecosystem||[]).map(p => `
        <div class="ecosystem-card">
          <div class="eco-left">
            <div class="eco-avatar">${p.emoji}</div>
          </div>
          <div class="eco-info">
            <div style="display:flex;align-items:center;gap:var(--sp-2);flex-wrap:wrap;margin-bottom:3px">
              <div class="eco-name">${p.name}</div>
              <span class="badge ${p.statusColor === 'red' ? 'badge-red' : p.statusColor === 'amber' ? 'badge-amber' : 'badge-green'}">${statusLabel[p.status] || p.status}</span>
            </div>
            <div class="eco-role">${p.role}</div>
            <div class="eco-org">${p.org} · Focus: ${p.focus}</div>
            <div class="eco-desc">${p.desc}</div>
          </div>
        </div>
      `).join('')}
      ${!c.ecosystem || c.ecosystem.length === 0 ? '<div class="empty-state"><div class="icon">👥</div><p>No documented ecosystem entries</p></div>' : ''}
    `;
  }

  // ── Tab switching ──────────────────────────────────────────
  function switchTab(index) {
    document.querySelectorAll('.dossier-tab').forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.dossier-tab-pane').forEach((p, i) => {
      p.classList.toggle('active', i === index);
    });
    // Scroll body to top
    document.getElementById('dossier-body').scrollTop = 0;
  }

  function initTabs() {
    document.querySelectorAll('.dossier-tab').forEach((tab, i) => {
      tab.addEventListener('click', () => switchTab(i));
    });
  }

  return { open, close, initTabs };
})();
