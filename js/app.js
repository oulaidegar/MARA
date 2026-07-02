/* ============================================================
   MARA – Application Router & Nav
   ============================================================ */

const App = (() => {

  let currentModule = 'spatial';

  function init() {
    initNav();
    DossierModule.initTabs();
    EthicsModule.init();
    LiteracyModule.init();
    NetworkModule.init();
    PDFLibraryModule.init();
    PDFLibraryModule.initViewerControls();
    AdminModule.init();

    // Activate default module (map loads async)
    activateModule('spatial');

    // Map initialises after a small delay to ensure DOM is ready
    requestAnimationFrame(() => MapModule.init());
  }

  // ── Navigation ─────────────────────────────────────────────
  function initNav() {
    document.querySelectorAll('.nav-module-btn').forEach(btn => {
      btn.addEventListener('click', () => activateModule(btn.dataset.module));
    });
  }

  function activateModule(moduleId) {
    currentModule = moduleId;

    // Update nav buttons
    document.querySelectorAll('.nav-module-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.module === moduleId);
    });

    // Show/hide module panels
    document.querySelectorAll('.module-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `module-${moduleId}`);
    });

    // Update page title
    const titles = {
      spatial:  'MARA · Spatial Explorer',
      ethics:   'MARA · Ethics & Governance Hub',
      literacy: 'MARA · Literacy Portal',
      network:  'MARA · Investment Knowledge Graph',
      pdfs:     'MARA · Knowledge Library'
    };
    document.title = titles[moduleId] || 'MARA';
  }

  return { init };
})();

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
