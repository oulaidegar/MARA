/* ============================================================
   MARA – Ethics & Governance Hub Module (B)
   ============================================================ */

const EthicsModule = (() => {

  let currentSubpane = 'figures';
  let searchQuery = '';
  let activeFilter = 'all';

  function init() {
    renderFigures();
    renderPapers();
    renderOrgs();
    initSubnav();
    initSearch();
    initFilters();
  }

  // ── Sub-navigation ─────────────────────────────────────────
  function initSubnav() {
    document.querySelectorAll('#module-ethics .subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        document.querySelectorAll('#module-ethics .subnav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('#module-ethics .module-subpane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`ethics-pane-${target}`).classList.add('active');
        currentSubpane = target;
      });
    });
  }

  // ── Figures Directory ──────────────────────────────────────
  function initSearch() {
    const input = document.getElementById('figures-search');
    if (!input) return;
    input.addEventListener('input', () => {
      searchQuery = input.value.toLowerCase();
      renderFigureCards();
    });
  }

  function initFilters() {
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.dataset.filter;
        renderFigureCards();
      });
    });
  }

  function renderFigures() {
    const container = document.getElementById('figures-grid');
    if (!container) return;
    renderFigureCards();
  }

  function renderFigureCards() {
    const container = document.getElementById('figures-grid');
    if (!container) return;

    const figures = MARA_DATA.ethicsFigures.filter(f => {
      const matchSearch = !searchQuery ||
        f.name.toLowerCase().includes(searchQuery) ||
        f.affiliation.toLowerCase().includes(searchQuery) ||
        f.bio.toLowerCase().includes(searchQuery) ||
        f.focus.some(foc => foc.toLowerCase().includes(searchQuery));
      const matchFilter = activeFilter === 'all' ||
        (activeFilter === 'mena' && f.region === 'MENA') ||
        (activeFilter === 'global' && f.region === 'Global') ||
        f.focus.some(foc => foc.toLowerCase().includes(activeFilter.toLowerCase()));
      return matchSearch && matchFilter;
    });

    if (figures.length === 0) {
      container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><p>No figures match your search</p></div>`;
      return;
    }

    container.innerHTML = figures.map(f => `
      <div class="figure-card fade-in-up">
        <div class="figure-card-top">
          <div class="figure-initials">${f.initials}</div>
          <div class="figure-meta">
            <div class="figure-name">${f.name}</div>
            <div class="figure-affiliation">${f.affiliation}</div>
            <div class="figure-region">
              ${f.region === 'MENA' ? '🌍' : '🌐'} ${f.region}
              ${f.origin ? `· <em>${f.origin}</em>` : ''}
            </div>
          </div>
        </div>
        <div class="figure-bio">${f.bio}</div>
        <div class="figure-methods">
          ${f.methods.map(m => `<span class="tag">${m}</span>`).join('')}
        </div>
        <div class="figure-methods" style="margin-top:4px">
          ${f.focus.map(fc => `<span class="badge badge-teal">${fc}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // ── Paper Matrix ───────────────────────────────────────────
  function renderPapers() {
    const container = document.getElementById('papers-table-body');
    if (!container) return;
    container.innerHTML = MARA_DATA.policyPapers.map(p => `
      <tr>
        <td>
          <div class="pm-policy-name">${p.policy.name}</div>
          <div class="pm-year">${p.policy.body} · ${p.policy.year}</div>
          <div style="margin-top:6px">
            <span class="badge ${p.policy.type.includes('Binding') ? 'badge-green' : p.policy.type.includes('Non-binding') ? 'badge-amber' : 'badge-blue'}">${p.policy.type}</span>
          </div>
        </td>
        <td>
          <div class="pm-body">${p.summary}</div>
        </td>
        <td>
          <div class="pm-rebuttal">${p.rebuttal.claim}</div>
          <div class="pm-source">${p.rebuttal.source}</div>
        </td>
      </tr>
    `).join('');
  }

  // ── Organization Index ─────────────────────────────────────
  function renderOrgs() {
    const container = document.getElementById('orgs-grid');
    if (!container) return;
    const typeColors = { Research: 'badge-violet', Civil_Society: 'badge-blue', Advocacy: 'badge-teal', Watchdog: 'badge-amber', Intergovernmental: 'badge-green', 'Multi-stakeholder': 'badge-gray' };
    container.innerHTML = MARA_DATA.organizations.map(org => `
      <div class="org-card">
        <div class="org-icon-wrap">${org.icon}</div>
        <div class="org-content">
          <div class="org-name">${org.name}</div>
          <div class="org-type">${org.type} · ${org.region}</div>
          <div class="org-desc">${org.desc}</div>
          <div class="org-url">🔗 ${org.url}</div>
        </div>
      </div>
    `).join('');
  }

  function refresh() {
    renderFigureCards();
    renderPapers();
    renderOrgs();
  }

  return { init, refresh };
})();
