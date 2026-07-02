/* ============================================================
   MARA – Admin CMS Module
   Password-protected real-time content editor for all modules
   ============================================================ */

const AdminModule = (() => {

  const LS = {
    PW:       'mara-admin-pw',
    SETTINGS: 'mara-settings',
    COUNTRIES:'mara-countries',
    FIGURES:  'mara-ethics-figures',
    PAPERS:   'mara-ethics-papers',
    ORGS:     'mara-ethics-orgs',
    GUIDES:   'mara-literacy-guides',
    LEXICON:  'mara-lexicon',
    PDFS:     'mara-pdfs',
  };
  const DEFAULT_PW = 'mara2025';
  let isAuth = false;
  let activeTab = 'countries';
  let logoClickCount = 0, logoClickTimer = null;

  // ── Immediate data patch (runs before App.init) ─────────────
  function patchData() {
    _patchArray(LS.FIGURES,  d => { MARA_DATA.ethicsFigures = d; });
    _patchArray(LS.PAPERS,   d => { MARA_DATA.policyPapers  = d; });
    _patchArray(LS.ORGS,     d => { MARA_DATA.organizations = d; });
    _patchArray(LS.GUIDES,   d => { MARA_DATA.guides        = d; });
    _patchArray(LS.LEXICON,  d => { MARA_DATA.lexicon       = d; });
    // Countries: merge per-country overrides
    const countries = _load(LS.COUNTRIES);
    if (countries) Object.assign(MARA_DATA.countries, countries);
    // Settings: apply immediately
    const settings = _load(LS.SETTINGS);
    if (settings) _applySettings(settings);
  }

  function _patchArray(key, fn) {
    const data = _load(key);
    if (data && Array.isArray(data)) fn(data);
  }
  function _load(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch(e) { return null; }
  }
  function _save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  function _applySettings(s) {
    if (s.navTagline) {
      const el = document.querySelector('.nav-tagline');
      if (el) el.textContent = s.navTagline;
    }
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    _setupLogoTrigger();
    _setupKeyboardTrigger();
    document.getElementById('admin-trigger').addEventListener('click', openAuthOrPanel);
    document.getElementById('admin-auth-cancel').addEventListener('click', closeAuth);
    document.getElementById('admin-auth-submit').addEventListener('click', handleAuthSubmit);
    document.getElementById('admin-pw-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleAuthSubmit(); });
    document.getElementById('admin-close-btn').addEventListener('click', closePanel);
    document.getElementById('admin-lock-btn').addEventListener('click', lockPanel);
    document.getElementById('admin-logout-sidebar-btn').addEventListener('click', lockPanel);
    document.getElementById('admin-export-btn').addEventListener('click', exportAll);
    document.getElementById('admin-import-btn').addEventListener('click', () => document.getElementById('admin-import-file').click());
    document.getElementById('admin-import-file').addEventListener('change', importAll);
    // Nav tabs
    document.querySelectorAll('.admin-nav-btn[data-admin-tab]').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.adminTab));
    });
  }

  // ── Access triggers ──────────────────────────────────────────
  function _setupLogoTrigger() {
    const logo = document.getElementById('nav-logo');
    if (!logo) return;
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) { logoClickCount = 0; openAuthOrPanel(); }
      else { logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 800); }
    });
  }
  function _setupKeyboardTrigger() {
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openAuthOrPanel();
      }
    });
  }

  // ── Auth ─────────────────────────────────────────────────────
  function openAuthOrPanel() {
    if (isAuth) { openPanel(); }
    else { openAuth(); }
  }
  function openAuth() {
    document.getElementById('admin-auth-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('admin-pw-input').focus(), 100);
  }
  function closeAuth() {
    document.getElementById('admin-auth-overlay').classList.add('hidden');
    document.getElementById('admin-pw-input').value = '';
    document.getElementById('admin-pw-input').classList.remove('error');
  }
  function handleAuthSubmit() {
    const pw = document.getElementById('admin-pw-input').value;
    const stored = localStorage.getItem(LS.PW) || DEFAULT_PW;
    if (pw === stored) {
      isAuth = true;
      closeAuth();
      document.getElementById('admin-trigger').classList.add('authenticated');
      document.body.classList.add('admin-mode');
      openPanel();
    } else {
      const input = document.getElementById('admin-pw-input');
      input.classList.add('error');
      input.value = '';
      setTimeout(() => input.classList.remove('error'), 600);
    }
  }

  // ── Panel ─────────────────────────────────────────────────────
  function openPanel() {
    document.getElementById('admin-panel-overlay').classList.remove('hidden');
    switchTab(activeTab);
  }
  function closePanel() {
    document.getElementById('admin-panel-overlay').classList.add('hidden');
  }
  function lockPanel() {
    isAuth = false;
    closePanel();
    document.getElementById('admin-trigger').classList.remove('authenticated');
    document.body.classList.remove('admin-mode');
    showToast('🔒 Admin session locked');
  }

  function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.admin-nav-btn[data-admin-tab]').forEach(b => {
      b.classList.toggle('active', b.dataset.adminTab === tab);
    });
    const body = document.getElementById('admin-content-body');
    const header = document.getElementById('admin-content-header-text');
    const subs = {
      countries: ['🌍 Countries', 'Edit country dossiers, scores, and all 5 dossier tabs'],
      ethics:    ['🧠 Ethics Hub', 'Manage figures, policy papers, and organizations'],
      literacy:  ['📚 Literacy Portal', 'Edit educational guides and their sections'],
      pdfs:      ['📄 PDF Library', 'Upload and manage PDF texts for the Knowledge Library'],
      network:   ['🕸️ Investment Graph', 'Manage companies, funds, and connection links'],
      settings:  ['⚙️ Settings', 'Site configuration, admin password, and data management'],
    };
    const [title, sub] = subs[tab] || ['Admin', ''];
    header.innerHTML = `<div class="admin-content-title">${title}</div><div class="admin-content-sub">${sub}</div>`;

    switch(tab) {
      case 'countries': renderCountriesTab(body); break;
      case 'ethics':    renderEthicsTab(body);    break;
      case 'literacy':  renderLiteracyTab(body);  break;
      case 'pdfs':      renderPDFsTab(body);      break;
      case 'network':   renderNetworkTab(body);   break;
      case 'settings':  renderSettingsTab(body);  break;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: COUNTRIES
  // ─────────────────────────────────────────────────────────────
  function renderCountriesTab(body) {
    const countries = MARA_DATA.countries;
    body.innerHTML = `
      <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
        <button class="btn btn-primary" id="admin-add-country">＋ Add Country</button>
      </div>
      <div class="admin-list" id="admin-countries-list"></div>
    `;
    const list = document.getElementById('admin-countries-list');
    Object.values(countries).forEach(c => {
      const item = document.createElement('div');
      item.className = 'admin-item-card';
      item.innerHTML = `
        <div class="admin-item-icon">${c.flag || '🌐'}</div>
        <div class="admin-item-info">
          <div class="admin-item-name">${c.name}</div>
          <div class="admin-item-meta">${c.region || ''} · Compute: ${c.scores?.compute || '—'} · Privacy: ${c.scores?.privacy || '—'} · Governance: ${c.scores?.governance || '—'}</div>
        </div>
        <span class="admin-tier-badge admin-tier-${c.tier}">${c.tier === 1 ? 'Tier 1 · Leader' : c.tier === 2 ? 'Tier 2 · Emerging' : 'Tier 3 · Developing'}</span>
        <div class="admin-item-actions">
          <button class="admin-item-btn edit" data-country="${c.id}">✏️ Edit</button>
          <button class="admin-item-btn delete" data-country="${c.id}">🗑️</button>
        </div>
      `;
      list.appendChild(item);
    });

    list.querySelectorAll('.admin-item-btn.edit').forEach(btn => {
      btn.addEventListener('click', () => openCountryEditor(btn.dataset.country));
    });
    list.querySelectorAll('.admin-item-btn.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteCountry(btn.dataset.country));
    });
    document.getElementById('admin-add-country').onclick = () => openCountryEditor(null);
  }

  function openCountryEditor(countryId) {
    const isNew = !countryId;
    const c = isNew ? { id: '', name: '', flag: '', tier: 2, region: '', scores: { compute: 'C', privacy: 'C', governance: 'C' }, demographics: {}, privacy: {}, infrastructure: {}, disputes: { official: [], critique: [] }, ecosystem: [] } : MARA_DATA.countries[countryId];
    if (!isNew && !c) return;

    openEditModal(`${isNew ? '＋ Add' : '✏️ Edit'} Country — ${c.name || 'New'}`, `
      <div class="admin-tab-strip">
        <button class="admin-tab-btn active" data-ctab="basics">Basics & Scores</button>
        <button class="admin-tab-btn" data-ctab="demo">Demographics</button>
        <button class="admin-tab-btn" data-ctab="privacy">Privacy</button>
        <button class="admin-tab-btn" data-ctab="infra">Infrastructure</button>
        <button class="admin-tab-btn" data-ctab="disputes">Disputes</button>
        <button class="admin-tab-btn" data-ctab="ecosystem">Ecosystem</button>
      </div>

      <!-- Basics -->
      <div class="admin-tab-pane active" id="ctab-basics">
        <div class="admin-form-grid">
          <div class="admin-form-group">
            <label class="admin-form-label">Country ID (slug)</label>
            <input class="admin-form-input" id="cf-id" value="${c.id}" placeholder="e.g. uae, saudi" ${!isNew ? 'readonly' : ''} />
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Name</label>
            <input class="admin-form-input" id="cf-name" value="${c.name}" placeholder="United Arab Emirates" />
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Flag Emoji</label>
            <input class="admin-form-input" id="cf-flag" value="${c.flag || ''}" placeholder="🇦🇪" maxlength="4" />
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Region</label>
            <input class="admin-form-input" id="cf-region" value="${c.region || ''}" placeholder="Gulf / Levant / North Africa" />
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Infrastructure Tier (1–3)</label>
            <select class="admin-form-select" id="cf-tier">
              <option value="1" ${c.tier==1?'selected':''}>Tier 1 — Global Leader</option>
              <option value="2" ${c.tier==2?'selected':''}>Tier 2 — Emerging</option>
              <option value="3" ${c.tier==3?'selected':''}>Tier 3 — Developing</option>
            </select>
          </div>
          <div class="admin-form-group">
            <label class="admin-form-label">Scores (e.g. A+, B, C-)</label>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
              <input class="admin-form-input" id="cf-compute" value="${c.scores?.compute||''}" placeholder="Compute" />
              <input class="admin-form-input" id="cf-privacy" value="${c.scores?.privacy||''}" placeholder="Privacy" />
              <input class="admin-form-input" id="cf-governance" value="${c.scores?.governance||''}" placeholder="Governance" />
            </div>
            <div class="admin-form-hint">Compute · Privacy · Governance</div>
          </div>
        </div>
      </div>

      <!-- Demographics -->
      <div class="admin-tab-pane" id="ctab-demo">
        <div class="admin-form-grid">
          ${_demoField('GDP', 'cf-gdp', c.demographics?.gdp)}
          ${_demoField('GDP Growth', 'cf-gdpGrowth', c.demographics?.gdpGrowth)}
          ${_demoField('GDP PPP', 'cf-gdpPPP', c.demographics?.gdpPPP)}
          ${_demoField('Population', 'cf-population', c.demographics?.population)}
          ${_demoField('Population Growth', 'cf-populationGrowth', c.demographics?.populationGrowth)}
          ${_demoField('Median Age', 'cf-medianAge', c.demographics?.medianAge)}
          ${_demoField('Avg Monthly Wage', 'cf-avgWage', c.demographics?.avgWage)}
          ${_demoField('STEM Graduates', 'cf-stemGrads', c.demographics?.stemGrads)}
          ${_demoField('STEM Growth Trend', 'cf-stemGradGrowth', c.demographics?.stemGradGrowth)}
          ${_demoField('Literacy Rate', 'cf-literacy', c.demographics?.literacy)}
          ${_demoField('Internet Penetration', 'cf-internetPenetration', c.demographics?.internetPenetration)}
        </div>
        <div class="admin-form-group full" style="margin-top:var(--sp-4)">
          <label class="admin-form-label">Diaspora Tracker (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-diaspora" style="min-height:120px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.demographics?.diaspora||[], null, 2)}</textarea>
          <div class="admin-form-hint">Array of { name, emoji, role, location } objects</div>
        </div>
      </div>

      <!-- Privacy -->
      <div class="admin-tab-pane" id="ctab-privacy">
        <div class="admin-form-group">
          <label class="admin-form-label">GDPR Adequacy Status</label>
          <input class="admin-form-input" id="cf-adequacy" value="${c.privacy?.adequacy||''}" placeholder="e.g. Active, Pending, None" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Active Laws (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-laws" style="min-height:130px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.privacy?.laws||[], null, 2)}</textarea>
          <div class="admin-form-hint">Array of { name, status, year, zone? } objects</div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">GDPR Grid (JSON object)</label>
          <textarea class="admin-form-textarea" id="cf-gdprGrid" style="min-height:180px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.privacy?.gdprGrid||{}, null, 2)}</textarea>
          <div class="admin-form-hint">Keys: erasureRights, fines, consent, dpa, dataLocalization, crossBorderTransfer, breachNotification — each: { value, status: 'green'|'amber'|'red', note }</div>
        </div>
      </div>

      <!-- Infrastructure -->
      <div class="admin-tab-pane" id="ctab-infra">
        <div class="admin-form-group">
          <label class="admin-form-label">Data Centers (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-dataCenters" style="min-height:150px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.infrastructure?.dataCenters||[], null, 2)}</textarea>
          <div class="admin-form-hint">{ name, location, tier, megawatts, solar, cooling, certifications[], parent }</div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Sovereign AI Models (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-aiModels" style="min-height:150px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.infrastructure?.aiModels||[], null, 2)}</textarea>
          <div class="admin-form-hint">{ emoji, name, developer, params, launched, license, architecture, languages[] }</div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Capital Flows (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-capitalFlows" style="min-height:150px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.infrastructure?.capitalFlows||[], null, 2)}</textarea>
          <div class="admin-form-hint">{ investor, target, amount, type, year, note }</div>
        </div>
      </div>

      <!-- Disputes -->
      <div class="admin-tab-pane" id="ctab-disputes">
        <div class="admin-form-group">
          <label class="admin-form-label">Official State Positions (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-official" style="min-height:150px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.disputes?.official||[], null, 2)}</textarea>
          <div class="admin-form-hint">Array of { text, source } objects</div>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Independent Critique (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-critique" style="min-height:150px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.disputes?.critique||[], null, 2)}</textarea>
          <div class="admin-form-hint">Array of { text, source } objects</div>
        </div>
      </div>

      <!-- Ecosystem -->
      <div class="admin-tab-pane" id="ctab-ecosystem">
        <div class="admin-form-group">
          <label class="admin-form-label">Ecosystem Figures (JSON array)</label>
          <textarea class="admin-form-textarea" id="cf-ecosystem" style="min-height:200px;font-family:var(--font-mono);font-size:11px">${JSON.stringify(c.ecosystem||[], null, 2)}</textarea>
          <div class="admin-form-hint">{ name, emoji, status, statusColor, role, org, focus, desc }</div>
        </div>
      </div>
    `, () => saveCountry(countryId, isNew));

    // Tab switching within the modal
    document.querySelectorAll('.admin-tab-btn[data-ctab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab-btn[data-ctab]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('[id^="ctab-"]').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`ctab-${btn.dataset.ctab}`).classList.add('active');
      });
    });
  }

  function _demoField(label, id, val) {
    return `<div class="admin-form-group"><label class="admin-form-label">${label}</label><input class="admin-form-input" id="${id}" value="${val||''}" /></div>`;
  }

  function saveCountry(countryId, isNew) {
    const _g = id => document.getElementById(id);
    const _v = id => { const el = _g(id); return el ? el.value.trim() : ''; };
    const _j = (id, fallback = []) => { try { return JSON.parse(_g(id)?.value || 'null') || fallback; } catch(e) { alert(`JSON error in field: ${id}\n${e.message}`); return null; } };

    const id = isNew ? _v('cf-id').toLowerCase().replace(/\s+/g,'-') : countryId;
    if (!id) { alert('Country ID is required'); return false; }

    const diaspora = _j('cf-diaspora'); if (diaspora === null) return false;
    const laws     = _j('cf-laws');     if (laws === null) return false;
    const gdprGrid = _j('cf-gdprGrid', {}); if (gdprGrid === null) return false;
    const dcs      = _j('cf-dataCenters'); if (dcs === null) return false;
    const models   = _j('cf-aiModels');    if (models === null) return false;
    const flows    = _j('cf-capitalFlows');if (flows === null) return false;
    const official = _j('cf-official');    if (official === null) return false;
    const critique = _j('cf-critique');    if (critique === null) return false;
    const ecosystem= _j('cf-ecosystem');   if (ecosystem === null) return false;

    MARA_DATA.countries[id] = {
      ...( MARA_DATA.countries[id] || {} ),
      id,
      name: _v('cf-name'), flag: _v('cf-flag'),
      tier: parseInt(_v('cf-tier')), region: _v('cf-region'),
      scores: { compute: _v('cf-compute'), privacy: _v('cf-privacy'), governance: _v('cf-governance') },
      demographics: {
        ...(MARA_DATA.countries[id]?.demographics || {}),
        gdp: _v('cf-gdp'), gdpGrowth: _v('cf-gdpGrowth'), gdpPPP: _v('cf-gdpPPP'),
        population: _v('cf-population'), populationGrowth: _v('cf-populationGrowth'), medianAge: _v('cf-medianAge'),
        avgWage: _v('cf-avgWage'), stemGrads: _v('cf-stemGrads'), stemGradGrowth: _v('cf-stemGradGrowth'),
        literacy: _v('cf-literacy'), internetPenetration: _v('cf-internetPenetration'), diaspora
      },
      privacy: { laws, adequacy: _v('cf-adequacy'), gdprGrid },
      infrastructure: { dataCenters: dcs, aiModels: models, capitalFlows: flows },
      disputes: { official, critique },
      ecosystem
    };

    const stored = _load(LS.COUNTRIES) || {};
    stored[id] = MARA_DATA.countries[id];
    _save(LS.COUNTRIES, stored);
    showToast('✅ Country saved');
    renderCountriesTab(document.getElementById('admin-content-body'));
    return true;
  }

  function deleteCountry(id) {
    if (!confirm(`Delete country "${MARA_DATA.countries[id]?.name}"? This cannot be undone.`)) return;
    delete MARA_DATA.countries[id];
    const stored = _load(LS.COUNTRIES) || {};
    delete stored[id];
    _save(LS.COUNTRIES, stored);
    renderCountriesTab(document.getElementById('admin-content-body'));
    showToast('🗑️ Country removed');
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: ETHICS
  // ─────────────────────────────────────────────────────────────
  function renderEthicsTab(body) {
    body.innerHTML = `
      <div class="module-subnav" style="margin-bottom:var(--sp-5)">
        <button class="subnav-btn active" data-etab="figures">👤 Figures</button>
        <button class="subnav-btn" data-etab="papers">📄 Papers</button>
        <button class="subnav-btn" data-etab="orgs">🏛️ Organizations</button>
      </div>
      <div id="ethics-admin-pane"></div>
    `;
    document.querySelectorAll('.subnav-btn[data-etab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.subnav-btn[data-etab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderEthicsSubpane(btn.dataset.etab);
      });
    });
    renderEthicsSubpane('figures');
  }

  function renderEthicsSubpane(pane) {
    const container = document.getElementById('ethics-admin-pane');
    if (pane === 'figures') {
      container.innerHTML = `<div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)"><button class="btn btn-primary" id="admin-add-figure">＋ Add Figure</button></div><div class="admin-list" id="admin-figures-list"></div>`;
      const list = document.getElementById('admin-figures-list');
      MARA_DATA.ethicsFigures.forEach((f, i) => {
        list.innerHTML += `<div class="admin-item-card">
          <div class="admin-item-icon" style="width:38px;height:38px;border-radius:50%;background:var(--bg-surface-3);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:var(--accent-teal)">${f.initials}</div>
          <div class="admin-item-info"><div class="admin-item-name">${f.name}</div><div class="admin-item-meta">${f.affiliation} · ${f.region}</div></div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
            <button class="admin-item-btn delete" data-idx="${i}">🗑️</button>
          </div>
        </div>`;
      });
      list.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openFigureEditor(+b.dataset.idx)));
      list.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => { if(confirm('Delete figure?')) { MARA_DATA.ethicsFigures.splice(+b.dataset.idx, 1); _save(LS.FIGURES, MARA_DATA.ethicsFigures); renderEthicsSubpane('figures'); EthicsModule.refresh(); showToast('🗑️ Removed'); } }));
      document.getElementById('admin-add-figure').onclick = () => openFigureEditor(null);
    }
    else if (pane === 'papers') {
      container.innerHTML = `<div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)"><button class="btn btn-primary" id="admin-add-paper">＋ Add Paper</button></div><div class="admin-list" id="admin-papers-list"></div>`;
      const list = document.getElementById('admin-papers-list');
      MARA_DATA.policyPapers.forEach((p, i) => {
        list.innerHTML += `<div class="admin-item-card">
          <div class="admin-item-icon">📄</div>
          <div class="admin-item-info"><div class="admin-item-name">${p.policy.name}</div><div class="admin-item-meta">${p.policy.body} · ${p.policy.year} · ${p.policy.type}</div></div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
            <button class="admin-item-btn delete" data-idx="${i}">🗑️</button>
          </div>
        </div>`;
      });
      list.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openPaperEditor(+b.dataset.idx)));
      list.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => { if(confirm('Delete paper?')) { MARA_DATA.policyPapers.splice(+b.dataset.idx, 1); _save(LS.PAPERS, MARA_DATA.policyPapers); renderEthicsSubpane('papers'); EthicsModule.refresh(); showToast('🗑️ Removed'); } }));
      document.getElementById('admin-add-paper').onclick = () => openPaperEditor(null);
    }
    else if (pane === 'orgs') {
      container.innerHTML = `<div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)"><button class="btn btn-primary" id="admin-add-org">＋ Add Organization</button></div><div class="admin-list" id="admin-orgs-list"></div>`;
      const list = document.getElementById('admin-orgs-list');
      MARA_DATA.organizations.forEach((o, i) => {
        list.innerHTML += `<div class="admin-item-card">
          <div class="admin-item-icon">${o.icon}</div>
          <div class="admin-item-info"><div class="admin-item-name">${o.name}</div><div class="admin-item-meta">${o.type} · ${o.region}</div></div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
            <button class="admin-item-btn delete" data-idx="${i}">🗑️</button>
          </div>
        </div>`;
      });
      list.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openOrgEditor(+b.dataset.idx)));
      list.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => { if(confirm('Delete organization?')) { MARA_DATA.organizations.splice(+b.dataset.idx, 1); _save(LS.ORGS, MARA_DATA.organizations); renderEthicsSubpane('orgs'); EthicsModule.refresh(); showToast('🗑️ Removed'); } }));
      document.getElementById('admin-add-org').onclick = () => openOrgEditor(null);
    }
  }

  function openFigureEditor(idx) {
    const isNew = idx === null;
    const f = isNew ? {} : MARA_DATA.ethicsFigures[idx];
    openEditModal(`${isNew?'＋ Add':'✏️ Edit'} Figure`, `
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="admin-form-label">Name</label><input class="admin-form-input" id="ff-name" value="${f.name||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Initials</label><input class="admin-form-input" id="ff-initials" value="${f.initials||''}" maxlength="3" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Affiliation</label><input class="admin-form-input" id="ff-affiliation" value="${f.affiliation||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Region</label><select class="admin-form-select" id="ff-region"><option ${f.region==='MENA'?'selected':''}>MENA</option><option ${f.region==='Global'?'selected':''}>Global</option></select></div>
        <div class="admin-form-group"><label class="admin-form-label">Origin Country</label><input class="admin-form-input" id="ff-origin" value="${f.origin||''}" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Bio</label><textarea class="admin-form-textarea" id="ff-bio">${f.bio||''}</textarea></div>
        <div class="admin-form-group"><label class="admin-form-label">Methods (comma-sep)</label><input class="admin-form-input" id="ff-methods" value="${(f.methods||[]).join(', ')}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Focus Areas (comma-sep)</label><input class="admin-form-input" id="ff-focus" value="${(f.focus||[]).join(', ')}" /></div>
      </div>
    `, () => {
      const entry = {
        id: isNew ? `fig_${Date.now()}` : f.id,
        name: _v('ff-name'), initials: _v('ff-initials'), affiliation: _v('ff-affiliation'),
        region: _v('ff-region'), origin: _v('ff-origin'), bio: _v('ff-bio'),
        methods: _v('ff-methods').split(',').map(x=>x.trim()).filter(Boolean),
        focus: _v('ff-focus').split(',').map(x=>x.trim()).filter(Boolean),
      };
      if (isNew) MARA_DATA.ethicsFigures.push(entry);
      else MARA_DATA.ethicsFigures[idx] = entry;
      _save(LS.FIGURES, MARA_DATA.ethicsFigures);
      EthicsModule.refresh();
      renderEthicsSubpane('figures');
      showToast('✅ Figure saved');
      return true;
    });
  }

  function openPaperEditor(idx) {
    const isNew = idx === null;
    const p = isNew ? { policy:{}, rebuttal:{} } : MARA_DATA.policyPapers[idx];
    openEditModal(`${isNew?'＋ Add':'✏️ Edit'} Policy Paper`, `
      <div class="admin-form-grid">
        <div class="admin-form-group full"><label class="admin-form-label">Policy Name</label><input class="admin-form-input" id="pp-name" value="${p.policy?.name||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Issuing Body</label><input class="admin-form-input" id="pp-body" value="${p.policy?.body||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Year</label><input class="admin-form-input" id="pp-year" value="${p.policy?.year||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Type</label><input class="admin-form-input" id="pp-type" value="${p.policy?.type||''}" placeholder="Binding / Non-binding / Voluntary" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Official Summary</label><textarea class="admin-form-textarea" id="pp-summary">${p.summary||''}</textarea></div>
        <div class="admin-form-group full"><label class="admin-form-label">Rebuttal Claim</label><textarea class="admin-form-textarea" id="pp-rebuttal-claim">${p.rebuttal?.claim||''}</textarea></div>
        <div class="admin-form-group full"><label class="admin-form-label">Rebuttal Source</label><input class="admin-form-input" id="pp-rebuttal-source" value="${p.rebuttal?.source||''}" /></div>
      </div>
    `, () => {
      const entry = {
        policy: { name: _v('pp-name'), body: _v('pp-body'), year: _v('pp-year'), type: _v('pp-type') },
        summary: _v('pp-summary'),
        rebuttal: { claim: _v('pp-rebuttal-claim'), source: _v('pp-rebuttal-source') }
      };
      if (isNew) MARA_DATA.policyPapers.push(entry);
      else MARA_DATA.policyPapers[idx] = entry;
      _save(LS.PAPERS, MARA_DATA.policyPapers);
      EthicsModule.refresh();
      renderEthicsSubpane('papers');
      showToast('✅ Paper saved');
      return true;
    });
  }

  function openOrgEditor(idx) {
    const isNew = idx === null;
    const o = isNew ? {} : MARA_DATA.organizations[idx];
    openEditModal(`${isNew?'＋ Add':'✏️ Edit'} Organization`, `
      <div class="admin-form-grid">
        <div class="admin-form-group full"><label class="admin-form-label">Name</label><input class="admin-form-input" id="og-name" value="${o.name||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Icon / Emoji</label><input class="admin-form-input" id="og-icon" value="${o.icon||'🏛️'}" maxlength="4" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Type</label><input class="admin-form-input" id="og-type" value="${o.type||''}" placeholder="Research / Civil Society / Advocacy…" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Region</label><input class="admin-form-input" id="og-region" value="${o.region||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">URL</label><input class="admin-form-input" id="og-url" value="${o.url||''}" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Description</label><textarea class="admin-form-textarea" id="og-desc">${o.desc||''}</textarea></div>
      </div>
    `, () => {
      const entry = { name: _v('og-name'), icon: _v('og-icon'), type: _v('og-type'), region: _v('og-region'), url: _v('og-url'), desc: _v('og-desc') };
      if (isNew) MARA_DATA.organizations.push(entry);
      else MARA_DATA.organizations[idx] = entry;
      _save(LS.ORGS, MARA_DATA.organizations);
      EthicsModule.refresh();
      renderEthicsSubpane('orgs');
      showToast('✅ Organization saved');
      return true;
    });
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: LITERACY
  // ─────────────────────────────────────────────────────────────
  function renderLiteracyTab(body) {
    body.innerHTML = `
      <div style="margin-bottom: var(--sp-6)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-3)">
          <h3 class="admin-content-title" style="font-size:var(--text-md)">📚 Educational Guides</h3>
          <button class="btn btn-primary btn-sm" id="admin-add-guide">＋ Add Guide</button>
        </div>
        <div class="admin-list" id="admin-guides-list"></div>
      </div>
      <div style="height:1px;background:var(--border-subtle);margin:var(--sp-5) 0"></div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--sp-3)">
          <h3 class="admin-content-title" style="font-size:var(--text-md)">📖 Regional AI Lexicon</h3>
          <button class="btn btn-primary btn-sm" id="admin-add-lexicon">＋ Add Term</button>
        </div>
        <div class="admin-list" id="admin-lexicon-list"></div>
      </div>
    `;

    // Render guides
    const list = document.getElementById('admin-guides-list');
    MARA_DATA.guides.forEach((g, i) => {
      list.innerHTML += `<div class="admin-item-card">
        <div class="admin-item-icon">${g.emoji}</div>
        <div class="admin-item-info">
          <div class="admin-item-name">${g.title}</div>
          <div class="admin-item-meta">${g.subtitle} · ${g.sections?.length||0} sections</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
          <button class="admin-item-btn delete" data-idx="${i}">🗑️</button>
        </div>
      </div>`;
    });
    list.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openGuideEditor(+b.dataset.idx)));
    list.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => { if(confirm('Delete guide?')) { MARA_DATA.guides.splice(+b.dataset.idx, 1); _save(LS.GUIDES, MARA_DATA.guides); renderLiteracyTab(body); LiteracyModule.refresh(); showToast('🗑️ Guide removed'); } }));
    document.getElementById('admin-add-guide').onclick = () => openGuideEditor(null);

    // Render lexicon
    const lexList = document.getElementById('admin-lexicon-list');
    if (!MARA_DATA.lexicon) MARA_DATA.lexicon = [];
    MARA_DATA.lexicon.forEach((item, i) => {
      lexList.innerHTML += `<div class="admin-item-card">
        <div class="admin-item-icon">📖</div>
        <div class="admin-item-info">
          <div class="admin-item-name">
            ${item.term} 
            <span style="font-size:9px;background:var(--accent-teal-dim);color:var(--accent-teal);padding:2px 6px;border-radius:4px;margin-left:8px;font-weight:700;text-transform:uppercase">${item.category}</span>
          </div>
          <div class="admin-item-meta" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:400px">${item.definition}</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
          <button class="admin-item-btn delete" data-idx="${i}">🗑️</button>
        </div>
      </div>`;
    });
    lexList.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openLexiconEditor(+b.dataset.idx)));
    lexList.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => { if(confirm('Delete glossary term?')) { MARA_DATA.lexicon.splice(+b.dataset.idx, 1); _save(LS.LEXICON, MARA_DATA.lexicon); renderLiteracyTab(body); LiteracyModule.refresh(); showToast('🗑️ Term removed'); } }));
    document.getElementById('admin-add-lexicon').onclick = () => openLexiconEditor(null);
  }

  function openGuideEditor(idx) {
    const isNew = idx === null;
    const g = isNew ? { sections: [] } : MARA_DATA.guides[idx];

    // Build sections HTML
    const buildSections = (sections) => {
      let html = '';
      sections.forEach((s, si) => {
        html += `<div class="array-item-row" data-si="${si}">
          <div class="array-item-fields" style="grid-template-columns:1fr 2fr">
            <input class="admin-form-input" placeholder="Section heading" value="${s.heading||''}" data-field="heading" />
            <textarea class="admin-form-textarea" placeholder="Section body text…" data-field="body" style="min-height:70px">${s.body||''}</textarea>
          </div>
          <button class="array-item-remove">✕</button>
        </div>`;
      });
      return html;
    };

    openEditModal(`${isNew?'＋ Add':'✏️ Edit'} Guide`, `
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="admin-form-label">Title</label><input class="admin-form-input" id="gf-title" value="${g.title||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Subtitle</label><input class="admin-form-input" id="gf-subtitle" value="${g.subtitle||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Emoji</label><input class="admin-form-input" id="gf-emoji" value="${g.emoji||'📖'}" maxlength="4" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Accent Color (CSS)</label><input class="admin-form-input" id="gf-color" value="${g.colorAccent||'#00D4AA'}" placeholder="#00D4AA or var(--accent-teal)" /></div>
      </div>
      <div class="array-editor">
        <div class="array-editor-header">
          <span class="array-editor-title">📄 Guide Sections</span>
          <button class="array-add-btn" id="add-section-btn" style="width:auto;padding:4px 12px;margin:0">＋ Add Section</button>
        </div>
        <div class="array-editor-body" id="guide-sections-body">${buildSections(g.sections||[])}</div>
      </div>
    `, () => {
      const sections = [];
      document.querySelectorAll('#guide-sections-body .array-item-row').forEach(row => {
        sections.push({
          heading: row.querySelector('[data-field="heading"]').value.trim(),
          body:    row.querySelector('[data-field="body"]').value.trim()
        });
      });
      const entry = { emoji: _v('gf-emoji'), title: _v('gf-title'), subtitle: _v('gf-subtitle'), colorAccent: _v('gf-color'), sections };
      if (isNew) MARA_DATA.guides.push(entry);
      else MARA_DATA.guides[idx] = entry;
      _save(LS.GUIDES, MARA_DATA.guides);
      LiteracyModule.refresh();
      renderLiteracyTab(document.getElementById('admin-content-body'));
      showToast('✅ Guide saved');
      return true;
    });

    // Section add/remove
    document.getElementById('add-section-btn').addEventListener('click', () => {
      const body = document.getElementById('guide-sections-body');
      const si = body.querySelectorAll('.array-item-row').length;
      const row = document.createElement('div');
      row.className = 'array-item-row'; row.dataset.si = si;
      row.innerHTML = `<div class="array-item-fields" style="grid-template-columns:1fr 2fr"><input class="admin-form-input" placeholder="Section heading" data-field="heading" /><textarea class="admin-form-textarea" placeholder="Section body…" data-field="body" style="min-height:70px"></textarea></div><button class="array-item-remove">✕</button>`;
      body.appendChild(row);
      _bindRemove(row);
    });
    document.querySelectorAll('#guide-sections-body .array-item-remove').forEach(b => _bindRemove(b.closest('.array-item-row')));
  }

  function _bindRemove(row) {
    row.querySelector('.array-item-remove').addEventListener('click', () => row.remove());
  }

  function openLexiconEditor(idx) {
    const isNew = idx === null;
    const item = isNew ? { term: '', category: 'Policy', definition: '' } : MARA_DATA.lexicon[idx];

    openEditModal(`${isNew ? '＋ Add' : '✏️ Edit'} Glossary Term`, `
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="admin-form-label">Term Name</label><input class="admin-form-input" id="lf-term" value="${item.term || ''}" placeholder="e.g. Data Sovereignty" /></div>
        <div class="admin-form-group">
          <label class="admin-form-label">Category</label>
          <select class="admin-form-select" id="lf-category">
            <option value="Infrastructure" ${item.category === 'Infrastructure' ? 'selected' : ''}>Infrastructure</option>
            <option value="Policy" ${item.category === 'Policy' ? 'selected' : ''}>Policy</option>
            <option value="Ecosystem" ${item.category === 'Ecosystem' ? 'selected' : ''}>Ecosystem</option>
            <option value="Technology" ${item.category === 'Technology' ? 'selected' : ''}>Technology</option>
          </select>
        </div>
        <div class="admin-form-group full">
          <label class="admin-form-label">Definition</label>
          <textarea class="admin-form-textarea" id="lf-definition" placeholder="Write term definition here…" style="min-height:100px">${item.definition || ''}</textarea>
        </div>
      </div>
    `, () => {
      const term = _v('lf-term').trim();
      const category = _v('lf-category');
      const definition = _v('lf-definition').trim();

      if (!term || !definition) {
        alert('Please fill in both Term Name and Definition.');
        return false;
      }

      const entry = { term, category, definition };
      if (isNew) MARA_DATA.lexicon.push(entry);
      else MARA_DATA.lexicon[idx] = entry;

      _save(LS.LEXICON, MARA_DATA.lexicon);
      LiteracyModule.refresh();
      renderLiteracyTab(document.getElementById('admin-content-body'));
      showToast('✅ Term saved');
      return true;
    });
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: PDFs
  // ─────────────────────────────────────────────────────────────
  function renderPDFsTab(body) {
    const pdfs = _load(LS.PDFS) || [];
    body.innerHTML = `
      <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
        <button class="btn btn-primary" id="admin-add-pdf">＋ Add PDF</button>
      </div>
      <div class="admin-list" id="admin-pdfs-list"></div>
    `;
    const list = document.getElementById('admin-pdfs-list');
    if (!pdfs.length) {
      list.innerHTML = '<div class="empty-state"><div class="icon">📄</div><p>No PDFs yet. Click "+ Add PDF" to upload or link a document.</p></div>';
    }
    pdfs.forEach((pdf, i) => {
      list.innerHTML += `<div class="admin-item-card">
        <div class="admin-item-icon">📄</div>
        <div class="admin-item-info">
          <div class="admin-item-name">${pdf.title}</div>
          <div class="admin-item-meta">${pdf.author||''} · ${pdf.year||''} · ${pdf.category||''} · ${pdf.url ? '🔗 URL' : '📁 Uploaded'}</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-item-btn edit" data-pidx="${i}">✏️ Edit</button>
          <button class="admin-item-btn delete" data-pidx="${i}">🗑️</button>
        </div>
      </div>`;
    });
    list.querySelectorAll('.admin-item-btn.edit').forEach(b => b.addEventListener('click', () => openPDFEditor(+b.dataset.pidx)));
    list.querySelectorAll('.admin-item-btn.delete').forEach(b => b.addEventListener('click', () => {
      if (!confirm('Delete this PDF entry?')) return;
      const pdfs = _load(LS.PDFS) || [];
      pdfs.splice(+b.dataset.pidx, 1);
      _save(LS.PDFS, pdfs);
      PDFLibraryModule.refresh();
      renderPDFsTab(body);
      showToast('🗑️ PDF removed');
    }));
    document.getElementById('admin-add-pdf').onclick = () => openPDFEditor(null);
  }

  function openPDFEditor(idx) {
    const isNew = idx === null;
    const pdfs = _load(LS.PDFS) || [];
    const p = isNew ? {} : pdfs[idx];

    openEditModal(`${isNew?'＋ Add':'✏️ Edit'} PDF`, `
      <div class="admin-form-grid">
        <div class="admin-form-group full"><label class="admin-form-label">Title *</label><input class="admin-form-input" id="pf-title" value="${p.title||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Author(s)</label><input class="admin-form-input" id="pf-author" value="${p.author||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Year</label><input class="admin-form-input" id="pf-year" value="${p.year||''}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Category</label>
          <select class="admin-form-select" id="pf-category">
            ${['Policy','Research','Legal','Opinion','Report','Academic'].map(c=>`<option ${p.category===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="admin-form-group"><label class="admin-form-label">Icon / Emoji</label><input class="admin-form-input" id="pf-icon" value="${p.icon||'📄'}" maxlength="4" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">PDF URL (leave blank to upload a file)</label><input class="admin-form-input" id="pf-url" type="url" value="${p.url||''}" placeholder="https://…/paper.pdf" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Upload PDF File (overrides URL)</label><input type="file" id="pf-file" accept="application/pdf" class="admin-form-input" style="padding:6px" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Tags (comma-separated)</label><input class="admin-form-input" id="pf-tags" value="${(p.tags||[]).join(', ')}" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Abstract / Description</label><textarea class="admin-form-textarea" id="pf-desc">${p.description||''}</textarea></div>
      </div>
    `, async () => {
      const title = _v('pf-title');
      if (!title) { alert('Title is required'); return false; }

      const fileInput = document.getElementById('pf-file');
      let fileData = p.fileData || null;
      if (fileInput.files.length > 0) {
        fileData = await _readFileAsDataURL(fileInput.files[0]);
      }

      const entry = {
        id: p.id || `pdf_${Date.now()}`,
        title, author: _v('pf-author'), year: _v('pf-year'),
        category: _v('pf-category'), icon: _v('pf-icon'),
        url: fileData ? null : _v('pf-url'),
        fileData,
        tags: _v('pf-tags').split(',').map(x=>x.trim()).filter(Boolean),
        description: _v('pf-desc')
      };

      const allPDFs = _load(LS.PDFS) || [];
      if (isNew) allPDFs.push(entry);
      else allPDFs[idx] = entry;
      _save(LS.PDFS, allPDFs);
      PDFLibraryModule.refresh();
      renderPDFsTab(document.getElementById('admin-content-body'));
      showToast('✅ PDF saved');
      return true;
    });
  }

  function _readFileAsDataURL(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: SETTINGS
  // ─────────────────────────────────────────────────────────────
  function renderSettingsTab(body) {
    const settings = _load(LS.SETTINGS) || {};
    body.innerHTML = `
      <!-- Site Settings -->
      <div class="admin-settings-card">
        <div class="admin-settings-card-title">🌐 Site Identity</div>
        <div class="admin-form-grid">
          <div class="admin-form-group"><label class="admin-form-label">Nav Tagline</label><input class="admin-form-input" id="st-tagline" value="${settings.navTagline||'MENA · AI · SOVEREIGNTY · RIGHTS'}" /></div>
        </div>
        <div class="admin-form-group full"><label class="admin-form-label">Vision Statement</label><textarea class="admin-form-textarea" id="st-vision">${settings.vision||''}</textarea></div>
        <div class="admin-form-group full"><label class="admin-form-label">Mission Statement</label><textarea class="admin-form-textarea" id="st-mission">${settings.mission||''}</textarea></div>
        <button class="btn btn-primary" id="save-settings-btn" style="margin-top:var(--sp-4)">Save Settings</button>
      </div>

      <!-- Password -->
      <div class="admin-settings-card">
        <div class="admin-settings-card-title">🔑 Change Admin Password</div>
        <div class="admin-form-grid">
          <div class="admin-form-group"><label class="admin-form-label">Current Password</label><input class="admin-form-input" id="pw-current" type="password" /></div>
          <div class="admin-form-group"></div>
          <div class="admin-form-group"><label class="admin-form-label">New Password</label><input class="admin-form-input" id="pw-new" type="password" /></div>
          <div class="admin-form-group"><label class="admin-form-label">Confirm New</label><input class="admin-form-input" id="pw-confirm" type="password" /></div>
        </div>
        <button class="btn btn-primary" id="save-pw-btn">Update Password</button>
      </div>

      <!-- Data Management -->
      <div class="admin-settings-card">
        <div class="admin-settings-card-title">💾 Data Management</div>
        <div style="display:flex;gap:var(--sp-3);flex-wrap:wrap">
          <button class="btn btn-ghost" id="export-all-data">⬇ Export All Data</button>
          <button class="btn btn-ghost" id="import-all-data-btn">⬆ Import Data</button>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="admin-settings-card admin-danger-zone">
        <div class="admin-settings-card-title" style="color:var(--accent-crimson)">⚠️ Danger Zone</div>
        <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:var(--sp-4)">Resetting will permanently erase all admin-saved content and restore factory defaults.</p>
        <button class="btn btn-danger" id="reset-all-btn">↺ Reset All to Defaults</button>
      </div>
    `;

    document.getElementById('save-settings-btn').onclick = () => {
      const s = { navTagline: _v('st-tagline'), vision: _v('st-vision'), mission: _v('st-mission') };
      _save(LS.SETTINGS, s);
      _applySettings(s);
      // Update vision/mission on literacy module if visible
      const vEl = document.querySelector('#module-literacy .info-card:first-child p');
      const mEl = document.querySelector('#module-literacy .info-card:last-child p');
      if (s.vision && vEl) vEl.textContent = s.vision;
      if (s.mission && mEl) mEl.textContent = s.mission;
      showToast('✅ Settings saved');
    };

    document.getElementById('save-pw-btn').onclick = () => {
      const current = document.getElementById('pw-current').value;
      const stored = localStorage.getItem(LS.PW) || DEFAULT_PW;
      if (current !== stored) { showToast('❌ Current password incorrect'); return; }
      const nw = document.getElementById('pw-new').value;
      const cf = document.getElementById('pw-confirm').value;
      if (!nw || nw.length < 6) { showToast('❌ Password must be 6+ chars'); return; }
      if (nw !== cf) { showToast('❌ Passwords do not match'); return; }
      localStorage.setItem(LS.PW, nw);
      document.getElementById('pw-current').value = '';
      document.getElementById('pw-new').value = '';
      document.getElementById('pw-confirm').value = '';
      showToast('✅ Password updated');
    };

    document.getElementById('export-all-data').onclick = exportAll;
    document.getElementById('import-all-data-btn').onclick = () => document.getElementById('admin-import-file').click();
    document.getElementById('reset-all-btn').onclick = () => {
      if (!confirm('This will reset ALL admin-saved content to factory defaults. Are you sure?')) return;
      Object.values(LS).forEach(key => { if (key !== LS.PW) localStorage.removeItem(key); });
      patchData();
      EthicsModule.refresh();
      LiteracyModule.refresh();
      PDFLibraryModule.refresh();
      showToast('↺ Reset to defaults');
    };
  }

  // ─────────────────────────────────────────────────────────────
  // Export / Import
  // ─────────────────────────────────────────────────────────────
  function exportAll() {
    const backup = {};
    Object.entries(LS).forEach(([key, storageKey]) => {
      if (storageKey === LS.PW) return;
      const val = localStorage.getItem(storageKey);
      if (val) backup[storageKey] = JSON.parse(val);
    });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `mara-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    showToast('✅ Backup exported');
  }

  function importAll(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        Object.entries(data).forEach(([key, val]) => localStorage.setItem(key, JSON.stringify(val)));
        patchData();
        EthicsModule.refresh();
        LiteracyModule.refresh();
        PDFLibraryModule.refresh();
        showToast('✅ Data imported');
      } catch(err) { alert('Invalid backup file: ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ─────────────────────────────────────────────────────────────
  // TAB: INVESTMENT GRAPH
  // ─────────────────────────────────────────────────────────────
  function renderNetworkTab(body) {
    body.innerHTML = `
      <div class="module-subnav" style="margin-bottom:var(--sp-5)">
        <button class="subnav-btn active" data-ntab="nodes">🚀 Entities (Nodes)</button>
        <button class="subnav-btn" data-ntab="edges">🔗 Connections (Edges)</button>
      </div>
      <div id="network-admin-pane"></div>
    `;
    document.querySelectorAll('.subnav-btn[data-ntab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.subnav-btn[data-ntab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderNetworkSubpane(btn.dataset.ntab);
      });
    });
    renderNetworkSubpane('nodes');
  }

  function renderNetworkSubpane(pane) {
    const container = document.getElementById('network-admin-pane');
    const graphData = NetworkModule.getGraphData();

    if (pane === 'nodes') {
      container.innerHTML = `
        <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
          <button class="btn btn-primary" id="admin-add-node">＋ Add Entity</button>
        </div>
        <div class="admin-list" id="admin-nodes-list"></div>
      `;
      const list = document.getElementById('admin-nodes-list');
      graphData.nodes.forEach((n, i) => {
        const type = NETWORK_NODE_TYPES[n.type] || { label: n.type, color: '#94A3B8', icon: '👤' };
        const item = document.createElement('div');
        item.className = 'admin-item-card';
        item.innerHTML = `
          <div class="admin-item-icon" style="color:${type.color}">${type.icon}</div>
          <div class="admin-item-info">
            <div class="admin-item-name">${n.flag || ''} ${n.label}</div>
            <div class="admin-item-meta">${type.label} · ${n.country || 'No Country'} ${n.aum ? `· AUM: ${n.aum}` : ''}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-item-btn edit" data-idx="${i}">✏️ Edit</button>
            <button class="admin-item-btn delete" data-node-id="${n.id}">🗑️</button>
          </div>
        `;
        list.appendChild(item);
      });

      list.querySelectorAll('.admin-item-btn.edit').forEach(btn => {
        btn.onclick = () => openNetworkNodeEditor(graphData.nodes[+btn.dataset.idx]);
      });
      list.querySelectorAll('.admin-item-btn.delete').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Delete entity? This will also remove all its connections.')) {
            NetworkModule.deleteNode(btn.dataset.nodeId);
            renderNetworkSubpane('nodes');
            showToast('🗑️ Entity deleted');
          }
        };
      });
      document.getElementById('admin-add-node').onclick = () => openNetworkNodeEditor(null);
    }
    else if (pane === 'edges') {
      container.innerHTML = `
        <div style="display:flex;justify-content:flex-end;margin-bottom:var(--sp-4)">
          <button class="btn btn-primary" id="admin-add-edge">＋ Add Connection</button>
        </div>
        <div class="admin-list" id="admin-edges-list"></div>
      `;
      const list = document.getElementById('admin-edges-list');
      if (graphData.edges.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="icon">🔗</div><p>No connections created yet.</p></div>';
        return;
      }
      const getNodeName = (id) => graphData.nodes.find(n => n.id === id)?.label || id;
      graphData.edges.forEach((e, i) => {
        const srcName = typeof e.source === 'object' ? e.source.label || e.source.id : getNodeName(e.source);
        const tgtName = typeof e.target === 'object' ? e.target.label || e.target.id : getNodeName(e.target);
        const amt = e.value ? ` · $${(e.value / 1e9).toFixed(1).replace(/\.0$/, '')}B` : '';
        const yr = e.year ? ` (${e.year})` : '';

        const item = document.createElement('div');
        item.className = 'admin-item-card';
        item.innerHTML = `
          <div class="admin-item-icon">🔗</div>
          <div class="admin-item-info">
            <div class="admin-item-name" style="font-size:12px;font-family:var(--font-mono)">${srcName} ➜ ${tgtName}</div>
            <div class="admin-item-meta">${e.label || 'Connection'}${amt}${yr}</div>
          </div>
          <div class="admin-item-actions">
            <button class="admin-item-btn delete" data-edge-id="${e.id}">🗑️ Delete</button>
          </div>
        `;
        list.appendChild(item);
      });

      list.querySelectorAll('.admin-item-btn.delete').forEach(btn => {
        btn.onclick = () => {
          if (confirm('Delete this connection?')) {
            NetworkModule.deleteEdge(btn.dataset.edgeId);
            renderNetworkSubpane('edges');
            showToast('🗑️ Connection deleted');
          }
        };
      });
      document.getElementById('admin-add-edge').onclick = () => openNetworkEdgeEditor();
    }
  }

  function openNetworkNodeEditor(node) {
    const isNew = !node;
    const n = isNew ? { id: '', label: '', type: 'startup', country: '', flag: '', size: 2, founded: '', aum: '', description: '', tags: [] } : node;

    const getTypeOptions = (selected = '') => {
      return Object.entries(NETWORK_NODE_TYPES).map(([key, t]) =>
        `<option value="${key}" ${key === selected ? 'selected' : ''}>${t.icon} ${t.label}</option>`
      ).join('');
    };

    openEditModal(`${isNew ? '＋ Add' : '✏️ Edit'} Graph Entity`, `
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="admin-form-label">Entity ID (slug) *</label><input class="admin-form-input" id="nf-node-id" value="${n.id}" placeholder="e.g. pif, g42, careem" ${!isNew ? 'readonly' : ''} /></div>
        <div class="admin-form-group"><label class="admin-form-label">Name *</label><input class="admin-form-input" id="nf-node-label" value="${n.label}" placeholder="e.g. Careem" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Type *</label><select class="admin-form-select" id="nf-node-type">${getTypeOptions(n.type)}</select></div>
        <div class="admin-form-group"><label class="admin-form-label">Country / Region</label><input class="admin-form-input" id="nf-node-country" value="${n.country || ''}" placeholder="e.g. UAE" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Flag Emoji</label><input class="admin-form-input" id="nf-node-flag" value="${n.flag || ''}" placeholder="🇦🇪" maxlength="4" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Importance Size (1–5)</label><input class="admin-form-input" id="nf-node-size" type="number" min="1" max="5" value="${n.size || 2}" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Founded Year</label><input class="admin-form-input" id="nf-node-founded" type="number" value="${n.founded || ''}" placeholder="2012" /></div>
        <div class="admin-form-group"><label class="admin-form-label">AUM / Fund Size</label><input class="admin-form-input" id="nf-node-aum" value="${n.aum || ''}" placeholder="e.g. $750B" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Tags (comma-separated)</label><input class="admin-form-input" id="nf-node-tags" value="${(n.tags || []).join(', ')}" placeholder="AI, Fintech, SWF" /></div>
        <div class="admin-form-group full"><label class="admin-form-label">Description</label><textarea class="admin-form-textarea" id="nf-node-desc">${n.description || ''}</textarea></div>
      </div>
    `, () => {
      const nodeId = isNew ? _v('nf-node-id').toLowerCase().replace(/\s+/g, '-') : n.id;
      const label = _v('nf-node-label');
      if (!nodeId || !label) { alert('Entity ID and Name are required.'); return false; }

      const data = {
        id: nodeId,
        label,
        type: _v('nf-node-type'),
        country: _v('nf-node-country'),
        flag: _v('nf-node-flag'),
        size: _v('nf-node-size'),
        founded: _v('nf-node-founded'),
        aum: _v('nf-node-aum'),
        tags: _v('nf-node-tags'),
        description: _v('nf-node-desc')
      };

      if (isNew) {
        NetworkModule.addNode(data);
      } else {
        NetworkModule.updateNode(n.id, data);
      }

      renderNetworkSubpane('nodes');
      showToast('✅ Entity saved');
      return true;
    });
  }

  function openNetworkEdgeEditor() {
    const graphData = NetworkModule.getGraphData();

    const getNodeOptions = () => {
      return graphData.nodes.map(n =>
        `<option value="${n.id}">${n.flag || ''} ${n.label}</option>`
      ).join('');
    };

    openEditModal(`＋ Add Connection`, `
      <div class="admin-form-group">
        <label class="admin-form-label">Source Entity (investor / creator)</label>
        <select class="admin-form-select" id="nf-edge-source">${getNodeOptions()}</select>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Target Entity (investee / partner)</label>
        <select class="admin-form-select" id="nf-edge-target">${getNodeOptions()}</select>
      </div>
      <div class="admin-form-grid">
        <div class="admin-form-group"><label class="admin-form-label">Connection Label</label><input class="admin-form-input" id="nf-edge-label" placeholder="e.g. Invested in, Lead Round" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Amount (USD billions)</label><input class="admin-form-input" id="nf-edge-value" type="number" step="0.1" placeholder="e.g. 1.5" /></div>
        <div class="admin-form-group"><label class="admin-form-label">Year</label><input class="admin-form-input" id="nf-edge-year" type="number" value="${new Date().getFullYear()}" /></div>
      </div>
    `, () => {
      const src = _v('nf-edge-source');
      const tgt = _v('nf-edge-target');
      if (src === tgt) { alert('Source and target must be different.'); return false; }

      const data = {
        source: src,
        target: tgt,
        label: _v('nf-edge-label'),
        value: _v('nf-edge-value'),
        year: _v('nf-edge-year')
      };

      NetworkModule.addEdge(data);
      renderNetworkSubpane('edges');
      showToast('✅ Connection added');
      return true;
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Shared: open / close edit modal
  // ─────────────────────────────────────────────────────────────
  function openEditModal(title, bodyHTML, onSave) {
    const overlay = document.getElementById('admin-edit-overlay');
    overlay.querySelector('.admin-edit-title').textContent = title;
    overlay.querySelector('.admin-edit-body').innerHTML = bodyHTML;
    overlay.classList.remove('hidden');

    const saveBtn   = overlay.querySelector('#admin-edit-save');
    const cancelBtn = overlay.querySelector('#admin-edit-cancel');
    const xBtn      = overlay.querySelector('#admin-edit-cancel-x');
    saveBtn.onclick = async () => {
      const ok = await onSave();
      if (ok !== false) closeEditModal();
    };
    cancelBtn.onclick = closeEditModal;
    if (xBtn) xBtn.onclick = closeEditModal;
    overlay.onclick = e => { if (e.target === overlay) closeEditModal(); };
  }
  function closeEditModal() {
    document.getElementById('admin-edit-overlay').classList.add('hidden');
  }

  // Helper: get value by ID
  function _v(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ─────────────────────────────────────────────────────────────
  // Toast notification
  // ─────────────────────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
  }

  // ── Run immediately ──────────────────────────────────────────
  patchData();

  return { init, openPanel, showToast };
})();
