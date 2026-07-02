/* ============================================================
   MARA – PDF Knowledge Library (Module E)
   Public-facing PDF grid + full-screen PDF viewer
   ============================================================ */

const PDFLibraryModule = (() => {

  const LS_KEY = 'mara-pdfs';
  let activeFilter = 'all';

  function loadPDFs() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
    catch(e) { return []; }
  }

  function init() {
    _setupFilterPills();
    refresh();
  }

  function refresh() {
    renderGrid(loadPDFs());
  }

  function _setupFilterPills() {
    document.querySelectorAll('.pdf-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.pdf-filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeFilter = pill.dataset.filter;
        renderGrid(loadPDFs());
      });
    });
  }

  function renderGrid(pdfs) {
    const grid = document.getElementById('pdf-library-grid');
    if (!grid) return;

    const filtered = activeFilter === 'all' ? pdfs : pdfs.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="icon">📄</div>
          <p>${pdfs.length === 0 ? 'No documents in the library yet. Ask the admin to upload PDFs.' : 'No documents in this category.'}</p>
        </div>`;
      return;
    }

    const catColors = {
      Policy:   { bg: 'rgba(96,165,250,0.12)',  color: '#60A5FA' },
      Research: { bg: 'rgba(0,212,170,0.12)',   color: 'var(--accent-teal)' },
      Legal:    { bg: 'rgba(245,200,66,0.12)',  color: 'var(--accent-gold)' },
      Opinion:  { bg: 'rgba(167,139,250,0.12)',  color: '#A78BFA' },
      Report:   { bg: 'rgba(251,146,60,0.12)',  color: '#FB923C' },
      Academic: { bg: 'rgba(52,211,153,0.12)',  color: '#34D399' },
    };

    grid.innerHTML = filtered.map(pdf => {
      const cat = catColors[pdf.category] || catColors.Research;
      return `
        <div class="pdf-card fade-in-up" data-pdf-id="${pdf.id}" role="button" tabindex="0">
          <div class="pdf-card-header">
            <div class="pdf-card-icon">${pdf.icon || '📄'}</div>
            <span class="badge" style="background:${cat.bg};color:${cat.color};border-color:${cat.color}44;white-space:nowrap">${pdf.category || 'Document'}</span>
          </div>
          <div class="pdf-card-title">${pdf.title}</div>
          <div class="pdf-card-author">${pdf.author ? `By ${pdf.author}` : ''} ${pdf.year ? `· ${pdf.year}` : ''}</div>
          <div class="pdf-card-desc">${pdf.description || ''}</div>
          ${pdf.tags?.length ? `<div style="display:flex;flex-wrap:wrap;gap:4px">${pdf.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join('')}</div>` : ''}
          <div class="pdf-card-footer">
            <div class="pdf-card-open">Open PDF →</div>
            ${pdf.url ? `<a href="${pdf.url}" target="_blank" rel="noopener" style="font-size:11px;color:var(--text-faint)" onclick="event.stopPropagation()">↗ Original</a>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Bind click events
    grid.querySelectorAll('.pdf-card').forEach(card => {
      const handler = () => {
        const pdf = filtered.find(p => p.id === card.dataset.pdfId);
        if (pdf) openViewer(pdf);
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
    });
  }

  function openViewer(pdf) {
    const modal = document.getElementById('pdf-viewer-modal');
    const frame = document.getElementById('pdf-viewer-frame');
    const titleEl = document.getElementById('pdf-viewer-title');
    const metaEl  = document.getElementById('pdf-viewer-meta');
    const extLink = document.getElementById('pdf-viewer-ext-link');

    titleEl.textContent = pdf.title;
    metaEl.textContent  = [pdf.author, pdf.year, pdf.category].filter(Boolean).join(' · ');

    // Determine source
    if (pdf.fileData) {
      // Uploaded file: use blob URL
      frame.src = pdf.fileData;
    } else if (pdf.url) {
      // URL: append toolbar param for better UX
      frame.src = pdf.url + (pdf.url.includes('?') ? '&' : '#') + 'toolbar=1';
    } else {
      frame.src = 'about:blank';
    }

    if (extLink) {
      if (pdf.url) {
        extLink.href = pdf.url;
        extLink.style.display = 'inline-flex';
      } else {
        extLink.style.display = 'none';
      }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeViewer() {
    const modal = document.getElementById('pdf-viewer-modal');
    modal.classList.add('hidden');
    document.getElementById('pdf-viewer-frame').src = 'about:blank';
    document.body.style.overflow = '';
  }

  function initViewerControls() {
    document.getElementById('pdf-viewer-close').addEventListener('click', closeViewer);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !document.getElementById('pdf-viewer-modal').classList.contains('hidden')) {
        closeViewer();
      }
    });
  }

  return { init, refresh, openViewer, closeViewer, initViewerControls };
})();
