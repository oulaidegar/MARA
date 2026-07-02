/* ============================================================
   MARA – Network Knowledge Graph Module (D)
   Obsidian-style force-directed investment map
   ============================================================ */

const NetworkModule = (() => {

  // ── State ───────────────────────────────────────────────────
  let graphData = { nodes: [], edges: [] };
  let simulation = null;
  let svgEl, gEl, edgeG, edgeLabelG, nodeG, labelG;
  let linkSel, linkHoverSel, nodeSel, labelSel, edgeLabelSel;
  let zoomBehavior;
  let selectedNodeId = null;
  let connectFromNode = null;        // "connect from here" mode
  let activeTypeFilters = new Set(Object.keys(NETWORK_NODE_TYPES));
  let searchQuery = '';
  let W = 0, H = 0;

  // ── Init ────────────────────────────────────────────────────
  function init() {
    loadData();
    updateStats();
    setupSVG();
    renderGraph();
    setupToolbar();
    setupModals();
    setupLegend();
    setupZoomControls();
    setupWindowResize();
    document.addEventListener('click', hideContextMenu);
  }

  // ── Data Persistence ────────────────────────────────────────
  function loadData() {
    const stored = localStorage.getItem('mara-network-data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.nodes && parsed.edges) { graphData = parsed; return; }
      } catch(e) { /* fall through */ }
    }
    graphData = JSON.parse(JSON.stringify(DEFAULT_NETWORK_DATA));
  }

  function saveData() {
    // Strip D3 simulation properties (x, y, vx, vy, index, fx, fy)
    const clean = {
      nodes: graphData.nodes.map(n => {
        const { x, y, vx, vy, index, fx, fy, ...rest } = n; return rest;
      }),
      edges: graphData.edges.map(e => ({
        ...e,
        source: typeof e.source === 'object' ? e.source.id : e.source,
        target: typeof e.target === 'object' ? e.target.id : e.target
      }))
    };
    localStorage.setItem('mara-network-data', JSON.stringify(clean));
  }

  // ── SVG Setup ───────────────────────────────────────────────
  function setupSVG() {
    const container = document.getElementById('network-canvas');
    W = container.clientWidth;
    H = container.clientHeight;

    svgEl = d3.select('#network-svg').attr('width', W).attr('height', H);
    svgEl.selectAll('*').remove();

    // Defs
    const defs = svgEl.append('defs');

    // Arrow marker
    defs.append('marker')
      .attr('id', 'net-arrow')
      .attr('viewBox', '0 -4 8 8')
      .attr('refX', 8).attr('refY', 0)
      .attr('markerWidth', 5).attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-4L8,0L0,4Z')
      .attr('fill', 'rgba(90, 110, 140, 0.45)');

    // Glow filters per type
    Object.entries(NETWORK_NODE_TYPES).forEach(([key, t]) => {
      const f = defs.append('filter')
        .attr('id', `ng-${key}`)
        .attr('x', '-60%').attr('y', '-60%')
        .attr('width', '220%').attr('height', '220%');
      f.append('feColorMatrix').attr('type', 'matrix')
        .attr('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6`);
      const blur = f.append('feGaussianBlur').attr('stdDeviation', 5).attr('in', 'SourceGraphic').attr('result', 'blur');
      const merge = f.append('feMerge');
      merge.append('feMergeNode').attr('in', 'blur');
      merge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Background (click to deselect)
    svgEl.append('rect')
      .attr('width', W).attr('height', H).attr('fill', 'transparent')
      .on('click', (e) => {
        if (connectFromNode) { exitConnectMode(); return; }
        deselectNode();
        hideContextMenu();
      })
      .on('contextmenu', e => e.preventDefault());

    // Main group
    gEl = svgEl.append('g').attr('class', 'net-root');
    edgeG = gEl.append('g').attr('class', 'edge-layer');
    edgeLabelG = gEl.append('g').attr('class', 'edge-label-layer');
    nodeG = gEl.append('g').attr('class', 'node-layer');
    labelG = gEl.append('g').attr('class', 'label-layer');

    // Zoom
    zoomBehavior = d3.zoom()
      .scaleExtent([0.05, 5])
      .on('zoom', e => gEl.attr('transform', e.transform));

    svgEl.call(zoomBehavior).on('dblclick.zoom', null);
    // Initial transform: center, slight zoom-out
    svgEl.call(zoomBehavior.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.55));
  }

  // ── Render / Update Graph ────────────────────────────────────
  function renderGraph() {
    // Resolve edge source/target strings to node objects before simulation
    const nodeMap = Object.fromEntries(graphData.nodes.map(n => [n.id, n]));

    const visibleNodes = graphData.nodes.filter(n => activeTypeFilters.has(n.type));
    const visibleIds = new Set(visibleNodes.map(n => n.id));

    const visibleEdges = graphData.edges
      .map(e => ({
        ...e,
        source: typeof e.source === 'object' ? e.source.id : e.source,
        target: typeof e.target === 'object' ? e.target.id : e.target
      }))
      .filter(e => visibleIds.has(e.source) && visibleIds.has(e.target));

    // Degree map (for sizing)
    const degree = {};
    visibleEdges.forEach(e => {
      degree[e.source] = (degree[e.source] || 0) + 1;
      degree[e.target] = (degree[e.target] || 0) + 1;
    });

    // Stop existing simulation
    if (simulation) simulation.stop();

    // Clone nodes for simulation (prevent mutation issues)
    const simNodes = visibleNodes.map(n => ({ ...n }));
    const simNodeMap = Object.fromEntries(simNodes.map(n => [n.id, n]));
    const simEdges = visibleEdges.map(e => ({ ...e, source: simNodeMap[e.source], target: simNodeMap[e.target] }));

    // Simulation
    simulation = d3.forceSimulation(simNodes)
      .force('link', d3.forceLink(simEdges).id(d => d.id)
        .distance(d => {
          const big = ['swf','bigtech','ai'].includes(d.source.type) && ['swf','bigtech','ai'].includes(d.target.type);
          return big ? 160 : 100;
        }).strength(0.25))
      .force('charge', d3.forceManyBody().strength(n => -(200 + (degree[n.id] || 0) * 35 + getNodeRadius(n) * 5)))
      .force('collision', d3.forceCollide().radius(n => getNodeRadius(n) + 12).strength(0.8))
      .force('x', d3.forceX(0).strength(0.04))
      .force('y', d3.forceY(0).strength(0.04))
      .alpha(0.8)
      .alphaDecay(0.025);

    // ── Edges (Visible Lines) ──────────────────────────────────
    linkSel = edgeG.selectAll('.network-edge')
      .data(simEdges, d => d.id)
      .join(
        enter => enter.append('line').attr('class', 'network-edge')
          .attr('stroke', 'rgba(90, 110, 140, 0.28)')
          .attr('stroke-width', d => d.value > 1000000000 ? 2.5 : 1.2)
          .attr('marker-end', 'url(#net-arrow)'),
        update => update
          .attr('stroke', 'rgba(90, 110, 140, 0.28)')
          .attr('stroke-width', d => d.value > 1000000000 ? 2.5 : 1.2),
        exit => exit.remove()
      );

    // ── Edge Labels ───────────────────────────────────────────
    edgeLabelSel = edgeLabelG.selectAll('.network-edge-text')
      .data(simEdges, d => d.id)
      .join(
        enter => enter.append('text')
          .attr('class', 'network-edge-text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('font-size', '8px')
          .attr('font-family', 'var(--font-mono)')
          .attr('fill', 'var(--text-muted)')
          .attr('pointer-events', 'none')
          .attr('opacity', 0)
          .text(d => {
            const fmt = d.value > 0 ? ` ($${(d.value / 1e9).toFixed(1).replace(/\.0$/, '')}B)` : '';
            return `${d.label}${fmt}`;
          }),
        update => update
          .text(d => {
            const fmt = d.value > 0 ? ` ($${(d.value / 1e9).toFixed(1).replace(/\.0$/, '')}B)` : '';
            return `${d.label}${fmt}`;
          }),
        exit => exit.remove()
      );

    // ── Edges (Thick Invisible Hover Overlay) ──────────────────
    linkHoverSel = edgeG.selectAll('.network-edge-hover')
      .data(simEdges, d => d.id)
      .join(
        enter => enter.append('line').attr('class', 'network-edge-hover')
          .attr('stroke', 'transparent')
          .attr('stroke-width', 10)
          .attr('cursor', 'pointer')
          .on('mouseover', (e, d) => {
            showEdgeTooltip(e, d);
            linkSel.attr('stroke', el => el.id === d.id ? 'var(--accent-teal)' : 'rgba(90, 110, 140, 0.12)')
              .attr('stroke-width', el => el.id === d.id ? (el.value > 1000000000 ? 3.5 : 2.2) : (el.value > 1000000000 ? 2.5 : 1.2));
            edgeLabelSel.attr('opacity', el => el.id === d.id ? 0.95 : 0);
          })
          .on('mouseout', () => {
            hideTooltip();
            resetHighlight();
          }),
        update => update,
        exit => exit.remove()
      );

    // ── Nodes ─────────────────────────────────────────────────
    nodeSel = nodeG.selectAll('.network-node')
      .data(simNodes, d => d.id)
      .join(
        enter => {
          const g = enter.append('g').attr('class', 'network-node-g').attr('cursor', 'pointer');

          // Outer glow ring
          g.append('circle').attr('class', 'node-ring')
            .attr('r', d => getNodeRadius(d) + 5)
            .attr('fill', 'none')
            .attr('stroke', d => NETWORK_NODE_TYPES[d.type]?.color || '#60A5FA')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.15);

          // Main circle
          g.append('circle').attr('class', 'node-circle')
            .attr('r', d => getNodeRadius(d))
            .attr('fill', d => NETWORK_NODE_TYPES[d.type]?.color || '#60A5FA')
            .attr('fill-opacity', 0.82)
            .attr('stroke', d => NETWORK_NODE_TYPES[d.type]?.color || '#60A5FA')
            .attr('stroke-width', 1.5)
            .attr('stroke-opacity', 0.7)
            .attr('filter', d => `url(#ng-${d.type})`);

          // Emoji icon in center
          g.append('text').attr('class', 'node-icon')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', d => Math.max(8, getNodeRadius(d) * 0.75))
            .attr('pointer-events', 'none')
            .text(d => NETWORK_NODE_TYPES[d.type]?.icon || '⬡');

          // Interaction
          g.call(d3.drag()
            .on('start', dragStart)
            .on('drag', dragging)
            .on('end', dragEnd))
            .on('click', (e, d) => {
              e.stopPropagation();
              if (connectFromNode && connectFromNode.id !== d.id) {
                openConnectModal(connectFromNode, d);
                exitConnectMode();
              } else {
                selectNode(d);
              }
            })
            .on('contextmenu', (e, d) => { e.preventDefault(); e.stopPropagation(); showContextMenu(e, d); })
            .on('mouseover', (e, d) => { highlightConnected(d, simEdges, simNodes); showNodeTooltip(e, d); })
            .on('mouseout', () => { resetHighlight(); hideTooltip(); });

          return g;
        },
        update => {
          update.select('.node-circle')
            .attr('r', d => getNodeRadius(d))
            .attr('fill', d => NETWORK_NODE_TYPES[d.type]?.color || '#60A5FA')
            .attr('stroke', d => NETWORK_NODE_TYPES[d.type]?.color || '#60A5FA');
          update.select('.node-ring').attr('r', d => getNodeRadius(d) + 5);
          update.select('.node-icon').attr('font-size', d => Math.max(8, getNodeRadius(d) * 0.75)).text(d => NETWORK_NODE_TYPES[d.type]?.icon || '⬡');
          return update;
        },
        exit => exit.remove()
      );

    nodeSel = nodeG.selectAll('.network-node-g');

    // ── Labels ────────────────────────────────────────────────
    labelSel = labelG.selectAll('.network-label')
      .data(simNodes, d => d.id)
      .join(
        enter => enter.append('text')
          .attr('class', 'network-label')
          .attr('text-anchor', 'middle')
          .attr('dy', d => getNodeRadius(d) + 13)
          .attr('font-size', d => `${8 + (d.size || 2) * 1}px`)
          .attr('font-weight', d => d.size >= 4 ? '700' : '500')
          .attr('font-family', 'Inter, sans-serif')
          .attr('fill', 'rgba(15,23,41,0.7)')
          .attr('pointer-events', 'none')
          .text(d => d.label),
        update => update
          .attr('dy', d => getNodeRadius(d) + 13)
          .attr('font-size', d => `${8 + (d.size || 2) * 1}px`)
          .attr('font-weight', d => d.size >= 4 ? '700' : '500')
          .text(d => d.label),
        exit => exit.remove()
      );

    // ── Tick ──────────────────────────────────────────────────
    simulation.on('tick', () => {
      linkSel
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => getEdgeX2(d)).attr('y2', d => getEdgeY2(d));

      if (linkHoverSel) {
        linkHoverSel
          .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
          .attr('x2', d => getEdgeX2(d)).attr('y2', d => getEdgeY2(d));
      }

      if (edgeLabelSel) {
        edgeLabelSel
          .attr('x', d => (d.source.x + d.target.x) / 2)
          .attr('y', d => (d.source.y + d.target.y) / 2);
      }

      nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
      labelSel.attr('x', d => d.x).attr('y', d => d.y);

      // Sync simNode positions back to graphData
      simNodes.forEach(sn => {
        const orig = graphData.nodes.find(n => n.id === sn.id);
        if (orig) { orig.x = sn.x; orig.y = sn.y; }
      });
    });

    // Reapply selection highlight after re-render
    if (selectedNodeId) {
      const sel = simNodes.find(n => n.id === selectedNodeId);
      if (sel) applySelectionHighlight(selectedNodeId);
    }
  }

  function getNodeRadius(d) {
    const base = NETWORK_NODE_TYPES[d.type]?.baseSize || 10;
    const sizeBoost = d.size ? (d.size - 1) * 2.5 : 0;
    return base + sizeBoost;
  }

  // Shorten edge endpoint so arrow doesn't overlap node
  function getEdgeX2(d) {
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const r = getNodeRadius(d.target) + 8;
    return d.target.x - (dx / dist) * r;
  }
  function getEdgeY2(d) {
    const dx = d.target.x - d.source.x;
    const dy = d.target.y - d.source.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const r = getNodeRadius(d.target) + 8;
    return d.target.y - (dy / dist) * r;
  }

  // ── Drag ─────────────────────────────────────────────────────
  function dragStart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  }
  function dragging(event, d) { d.fx = event.x; d.fy = event.y; }
  function dragEnd(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null; d.fy = null;
    saveData();
  }

  // ── Selection ────────────────────────────────────────────────
  function selectNode(d) {
    selectedNodeId = d.id;
    applySelectionHighlight(d.id);
    openDetailPanel(d);
    zoomToNode(d);
  }
  function deselectNode() {
    selectedNodeId = null;
    nodeSel.select('.node-ring').attr('stroke-opacity', 0.15).attr('stroke-width', 1);
    closeDetailPanel();
  }
  function applySelectionHighlight(id) {
    nodeSel.select('.node-ring')
      .attr('stroke-opacity', n => n.id === id ? 0.9 : 0.1)
      .attr('stroke-width', n => n.id === id ? 2.5 : 1);
  }

  // ── Hover highlight ──────────────────────────────────────────
  function highlightConnected(d, edges, nodes) {
    const connected = new Set();
    edges.forEach(e => {
      const src = e.source?.id ?? e.source;
      const tgt = e.target?.id ?? e.target;
      if (src === d.id) connected.add(tgt);
      if (tgt === d.id) connected.add(src);
    });

    nodeSel.select('.node-circle').attr('fill-opacity', n => n.id === d.id || connected.has(n.id) ? 0.95 : 0.18);
    nodeSel.select('.node-ring').attr('stroke-opacity', n => n.id === d.id ? 0.8 : 0.05);
    labelSel.attr('fill', n => n.id === d.id || connected.has(n.id) ? 'rgba(15,23,41,0.95)' : 'rgba(15,23,41,0.12)');
    labelSel.attr('font-weight', n => n.id === d.id || connected.has(n.id) ? '700' : '500');

    linkSel.attr('stroke', e => {
      const src = e.source?.id ?? e.source;
      const tgt = e.target?.id ?? e.target;
      if (src === d.id || tgt === d.id) return NETWORK_NODE_TYPES[d.type]?.color || '#00A688';
      return 'rgba(90, 110, 140, 0.05)';
    }).attr('stroke-opacity', e => {
      const src = e.source?.id ?? e.source;
      const tgt = e.target?.id ?? e.target;
      return (src === d.id || tgt === d.id) ? 0.95 : 0.04;
    });

    if (edgeLabelSel) {
      edgeLabelSel.attr('opacity', e => {
        const src = e.source?.id ?? e.source;
        const tgt = e.target?.id ?? e.target;
        return (src === d.id || tgt === d.id) ? 0.95 : 0;
      }).attr('fill', e => {
        const src = e.source?.id ?? e.source;
        const tgt = e.target?.id ?? e.target;
        return (src === d.id || tgt === d.id) ? 'var(--text-primary)' : 'var(--text-muted)';
      });
    }
  }
  function resetHighlight() {
    nodeSel.select('.node-circle').attr('fill-opacity', 0.82);
    labelSel.attr('fill', 'rgba(15,23,41,0.7)').attr('font-weight', n => n.size >= 4 ? '700' : '500');
    linkSel.attr('stroke', 'rgba(90, 110, 140, 0.28)').attr('stroke-opacity', 1);
    if (edgeLabelSel) {
      edgeLabelSel.attr('opacity', 0);
    }
    if (selectedNodeId) applySelectionHighlight(selectedNodeId);
  }

  // ── Tooltip ──────────────────────────────────────────────────
  const tooltip = document.getElementById('network-tooltip');
  function showNodeTooltip(event, d) {
    const type = NETWORK_NODE_TYPES[d.type];
    tooltip.innerHTML = `
      <div class="ntt-name">${d.flag || ''} ${d.label}</div>
      <div class="ntt-type">${type?.icon || ''} ${type?.label || d.type} · ${d.country || ''}</div>
      ${d.aum ? `<div class="ntt-amount">AUM: ${d.aum}</div>` : ''}
      ${d.founded ? `<div style="font-size:11px;color:var(--text-faint);margin-top:3px">Est. ${d.founded}</div>` : ''}
    `;
    tooltip.classList.add('visible');
    positionTooltip(event);
  }
  function showEdgeTooltip(event, d) {
    const fmt = d.value > 0 ? `$${(d.value / 1e9).toFixed(1).replace(/\.0$/, '')}B` : '';
    tooltip.innerHTML = `
      <div class="ntt-name" style="font-size:12px">${d.label || 'Connection'}</div>
      <div class="ntt-type">${d.source?.label ?? d.source} → ${d.target?.label ?? d.target}</div>
      ${fmt ? `<div class="ntt-amount">${fmt}</div>` : ''}
      ${d.year ? `<div style="font-size:11px;color:var(--text-faint);margin-top:3px">${d.year}</div>` : ''}
    `;
    tooltip.classList.add('visible');
    positionTooltip(event);
  }
  function positionTooltip(e) {
    const x = e.clientX + 14;
    const y = e.clientY - 12;
    tooltip.style.left = `${Math.min(x, window.innerWidth - 280)}px`;
    tooltip.style.top  = `${Math.max(10, Math.min(y, window.innerHeight - 120))}px`;
  }
  function hideTooltip() { tooltip.classList.remove('visible'); }

  // ── Detail Panel ─────────────────────────────────────────────
  function openDetailPanel(d) {
    const panel = document.getElementById('network-detail-panel');
    const type = NETWORK_NODE_TYPES[d.type];

    // Get connections
    const inbound = graphData.edges.filter(e => {
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return tgt === d.id;
    });
    const outbound = graphData.edges.filter(e => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      return src === d.id;
    });
    const getNodeLabel = id => graphData.nodes.find(n => n.id === id)?.label || id;
    const getNodeType  = id => graphData.nodes.find(n => n.id === id)?.type || 'startup';

    const renderConnChip = (e, dir) => {
      const peerId = dir === 'in' ? (typeof e.source === 'object' ? e.source.id : e.source) : (typeof e.target === 'object' ? e.target.id : e.target);
      const peerLabel = getNodeLabel(peerId);
      const peerType  = getNodeType(peerId);
      const color = NETWORK_NODE_TYPES[peerType]?.color || '#60A5FA';
      const fmt = e.value > 0 ? ` · $${(e.value / 1e9).toFixed(1).replace(/\.0$/, '')}B` : '';
      return `
        <div class="ndp-conn-item" data-node="${peerId}" role="button" tabindex="0">
          <div class="ndp-conn-dot" style="background:${color}"></div>
          <span class="ndp-conn-direction">${dir === 'in' ? 'FROM' : 'TO'}</span>
          <span class="ndp-conn-name">${peerLabel}</span>
          <span class="ndp-conn-label">${e.label || ''}${fmt}</span>
        </div>`;
    };

    document.getElementById('ndp-content').innerHTML = `
      <div class="ndp-header">
        <div class="ndp-header-top">
          <div>
            <div class="ndp-type-icon">${type?.icon || '⬡'}</div>
            <div class="ndp-name">${d.flag || ''} ${d.label}</div>
            <div class="ndp-meta">
              <span class="badge" style="background:${type?.color}22;color:${type?.color};border-color:${type?.color}44">${type?.label || d.type}</span>
              ${d.country ? `<span class="badge badge-gray">${d.country}</span>` : ''}
              ${d.founded ? `<span class="badge badge-gray">Est. ${d.founded}</span>` : ''}
            </div>
          </div>
          <button class="ndp-close" id="ndp-close-btn">✕</button>
        </div>
        <div class="ndp-actions">
          <button class="btn btn-sm btn-primary" id="ndp-edit-btn">✏️ Edit</button>
          <button class="btn btn-sm btn-ghost" id="ndp-connect-btn">🔗 Connect from here</button>
          <button class="btn btn-sm btn-danger" id="ndp-delete-btn">🗑️ Delete</button>
        </div>
      </div>
      <div class="ndp-body">
        ${d.description ? `
          <div class="ndp-section">
            <div class="ndp-section-title">📝 About</div>
            <div class="ndp-desc">${d.description}</div>
          </div>
        ` : ''}

        ${(d.aum || d.founded || d.size) ? `
          <div class="ndp-section">
            <div class="ndp-section-title">📊 Key Metrics</div>
            <div class="ndp-kv-grid">
              ${d.aum ? `<div class="ndp-kv"><div class="ndp-kv-label">AUM / Size</div><div class="ndp-kv-value" style="color:var(--accent-gold)">${d.aum}</div></div>` : ''}
              ${d.founded ? `<div class="ndp-kv"><div class="ndp-kv-label">Founded</div><div class="ndp-kv-value">${d.founded}</div></div>` : ''}
            </div>
          </div>
        ` : ''}

        ${d.tags?.length ? `
          <div class="ndp-section">
            <div class="ndp-section-title">🏷️ Tags</div>
            <div class="ndp-tags">
              ${d.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <div class="ndp-section">
          <div class="ndp-section-title">🔗 Connections (${inbound.length + outbound.length})</div>
          <div class="ndp-conn-list">
            ${outbound.map(e => renderConnChip(e, 'out')).join('')}
            ${inbound.map(e => renderConnChip(e, 'in')).join('')}
            ${inbound.length + outbound.length === 0 ? '<div style="font-size:var(--text-sm);color:var(--text-faint);padding:8px 0">No connections yet</div>' : ''}
          </div>
        </div>
      </div>
    `;

    panel.classList.add('open');

    // Bind panel buttons
    document.getElementById('ndp-close-btn').onclick = () => { deselectNode(); };
    document.getElementById('ndp-edit-btn').onclick   = () => openEditNodeModal(d);
    document.getElementById('ndp-delete-btn').onclick = () => deleteNode(d.id);
    document.getElementById('ndp-connect-btn').onclick = () => { enterConnectMode(d); closeDetailPanel(); };

    // Chip click → navigate to that node
    document.querySelectorAll('.ndp-conn-item[data-node]').forEach(chip => {
      chip.addEventListener('click', () => {
        const target = graphData.nodes.find(n => n.id === chip.dataset.node);
        if (target) { selectNode(target); zoomToNode(target); }
      });
    });
  }

  function closeDetailPanel() {
    document.getElementById('network-detail-panel').classList.remove('open');
    selectedNodeId = null;
  }

  function zoomToNode(node) {
    if (!node.x || !node.y) return;
    const scale = 1.4;
    svgEl.transition().duration(600).ease(d3.easeCubicInOut)
      .call(zoomBehavior.transform, d3.zoomIdentity
        .translate(W / 2 - node.x * scale, H / 2 - node.y * scale)
        .scale(scale));
  }

  // ── Connect Mode ─────────────────────────────────────────────
  function enterConnectMode(node) {
    connectFromNode = node;
    const banner = document.getElementById('connect-mode-banner');
    banner.textContent = `Connecting from: ${node.flag || ''} ${node.label} — Click target node…  [Esc to cancel]`;
    banner.classList.add('active');
    svgEl.style.cursor = 'crosshair';
    // ESC cancels
    document.addEventListener('keydown', handleConnectEsc, { once: true });
  }
  function exitConnectMode() {
    connectFromNode = null;
    document.getElementById('connect-mode-banner').classList.remove('active');
    svgEl.style.cursor = '';
  }
  function handleConnectEsc(e) { if (e.key === 'Escape') exitConnectMode(); }

  // ── Context Menu ──────────────────────────────────────────────
  const ctxMenu = document.getElementById('network-context-menu');
  let ctxTarget = null;
  function showContextMenu(event, d) {
    ctxTarget = d;
    ctxMenu.querySelector('.ctx-menu-header').textContent = d.label;
    ctxMenu.style.left = `${event.clientX}px`;
    ctxMenu.style.top  = `${Math.min(event.clientY, window.innerHeight - 200)}px`;
    ctxMenu.classList.add('visible');
  }
  function hideContextMenu() { ctxMenu.classList.remove('visible'); ctxTarget = null; }

  // ── CRUD – Nodes ─────────────────────────────────────────────
  function addNode(data) {
    const newNode = {
      id: data.id || `node_${Date.now()}`,
      label: data.label,
      type: data.type || 'startup',
      country: data.country || '',
      flag: data.flag || '',
      size: parseInt(data.size) || 2,
      description: data.description || '',
      aum: data.aum || '',
      founded: data.founded ? parseInt(data.founded) : null,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    };
    graphData.nodes.push(newNode);
    saveData();
    renderGraph();
    updateStats();
  }

  function deleteNode(nodeId) {
    if (!confirm(`Delete "${graphData.nodes.find(n=>n.id===nodeId)?.label}"?\n\nAll its connections will also be removed.`)) return;
    graphData.nodes = graphData.nodes.filter(n => n.id !== nodeId);
    graphData.edges = graphData.edges.filter(e => {
      const src = typeof e.source === 'object' ? e.source.id : e.source;
      const tgt = typeof e.target === 'object' ? e.target.id : e.target;
      return src !== nodeId && tgt !== nodeId;
    });
    saveData();
    deselectNode();
    renderGraph();
    updateStats();
  }

  function updateNode(nodeId, data) {
    const idx = graphData.nodes.findIndex(n => n.id === nodeId);
    if (idx === -1) return;
    graphData.nodes[idx] = {
      ...graphData.nodes[idx],
      label:       data.label || graphData.nodes[idx].label,
      type:        data.type  || graphData.nodes[idx].type,
      country:     data.country !== undefined ? data.country : graphData.nodes[idx].country,
      flag:        data.flag   !== undefined ? data.flag   : graphData.nodes[idx].flag,
      size:        parseInt(data.size) || graphData.nodes[idx].size,
      description: data.description !== undefined ? data.description : graphData.nodes[idx].description,
      aum:         data.aum !== undefined ? data.aum : graphData.nodes[idx].aum,
      founded:     data.founded ? parseInt(data.founded) : graphData.nodes[idx].founded,
      tags:        data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : graphData.nodes[idx].tags
    };
    saveData();
    renderGraph();
    updateStats();
  }

  // ── CRUD – Edges ─────────────────────────────────────────────
  function addEdge(data) {
    const edge = {
      id:     `edge_${Date.now()}`,
      source: data.source,
      target: data.target,
      label:  data.label || '',
      value:  data.value ? parseFloat(data.value) * 1e9 : 0,
      year:   data.year ? parseInt(data.year) : null
    };
    graphData.edges.push(edge);
    saveData();
    renderGraph();
    updateStats();
  }

  function deleteEdge(edgeId) {
    graphData.edges = graphData.edges.filter(e => e.id !== edgeId);
    saveData();
    renderGraph();
    updateStats();
  }

  // ── Stats ────────────────────────────────────────────────────
  function updateStats() {
    const el = document.getElementById('network-stats-body');
    if (!el) return;
    el.innerHTML = `
      <div class="nstat-row"><span>Entities</span><strong>${graphData.nodes.length}</strong></div>
      <div class="nstat-row"><span>Connections</span><strong>${graphData.edges.length}</strong></div>
    `;
  }

  // ── Search ───────────────────────────────────────────────────
  function applySearch(q) {
    searchQuery = q.toLowerCase();
    if (!searchQuery) { resetHighlight(); return; }
    const matched = new Set(graphData.nodes.filter(n =>
      n.label.toLowerCase().includes(searchQuery) ||
      n.country?.toLowerCase().includes(searchQuery) ||
      n.tags?.some(t => t.toLowerCase().includes(searchQuery)) ||
      n.type?.toLowerCase().includes(searchQuery)
    ).map(n => n.id));

    nodeSel.select('.node-circle').attr('fill-opacity', n => matched.has(n.id) ? 0.95 : 0.12);
    labelSel.attr('fill', n => matched.has(n.id) ? 'rgba(15,23,41,0.95)' : 'rgba(15,23,41,0.1)');
    linkSel.attr('stroke-opacity', 0.06);
  }

  // ── Toolbar & Controls ────────────────────────────────────────
  function setupToolbar() {
    // Search
    document.getElementById('net-search').addEventListener('input', e => applySearch(e.target.value));

    // Add node
    document.getElementById('ntb-add-node').addEventListener('click', () => openAddNodeModal());

    // Add connection
    document.getElementById('ntb-add-conn').addEventListener('click', () => openAddConnectionModal());

    // Export
    document.getElementById('ntb-export').addEventListener('click', exportJSON);

    // Import
    document.getElementById('ntb-import').addEventListener('click', () => document.getElementById('net-import-input').click());
    document.getElementById('net-import-input').addEventListener('change', importJSON);

    // Reset
    document.getElementById('ntb-reset').addEventListener('click', () => {
      if (confirm('Reset graph to default pre-seeded data? All your additions will be lost.')) {
        localStorage.removeItem('mara-network-data');
        loadData();
        deselectNode();
        renderGraph();
        updateStats();
      }
    });
  }

  // ── Zoom controls ─────────────────────────────────────────────
  function setupZoomControls() {
    document.getElementById('nzoom-in').addEventListener('click',    () => svgEl.transition().duration(300).call(zoomBehavior.scaleBy, 1.5));
    document.getElementById('nzoom-out').addEventListener('click',   () => svgEl.transition().duration(300).call(zoomBehavior.scaleBy, 0.67));
    document.getElementById('nzoom-reset').addEventListener('click', () => {
      svgEl.transition().duration(500).call(zoomBehavior.transform, d3.zoomIdentity.translate(W/2, H/2).scale(0.55));
    });
  }

  // ── Legend ───────────────────────────────────────────────────
  function setupLegend() {
    const container = document.getElementById('network-legend-items');
    container.innerHTML = Object.entries(NETWORK_NODE_TYPES).map(([key, t]) => `
      <div class="nleg-item" data-type="${key}" title="Click to toggle">
        <div class="nleg-dot" style="background:${t.color};color:${t.color}"></div>
        <span>${t.icon} ${t.label}</span>
      </div>
    `).join('');

    container.querySelectorAll('.nleg-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        if (activeTypeFilters.has(type)) {
          activeTypeFilters.delete(type);
          item.classList.add('inactive');
        } else {
          activeTypeFilters.add(type);
          item.classList.remove('inactive');
        }
        renderGraph();
        updateStats();
      });
    });
  }

  // ── Modals ────────────────────────────────────────────────────
  function getTypeOptions(selected = '') {
    return Object.entries(NETWORK_NODE_TYPES).map(([key, t]) =>
      `<option value="${key}" ${key === selected ? 'selected' : ''}>${t.icon} ${t.label}</option>`
    ).join('');
  }

  function getNodeOptions(selectedId = '') {
    return graphData.nodes.map(n =>
      `<option value="${n.id}" ${n.id === selectedId ? 'selected' : ''}>${n.flag || ''} ${n.label}</option>`
    ).join('');
  }

  function setupModals() {
    // Context menu items
    document.getElementById('ctx-edit').onclick   = () => { if (ctxTarget) openEditNodeModal(ctxTarget); hideContextMenu(); };
    document.getElementById('ctx-delete').onclick = () => { if (ctxTarget) deleteNode(ctxTarget.id); hideContextMenu(); };
    document.getElementById('ctx-connect').onclick = () => { if (ctxTarget) { enterConnectMode(ctxTarget); } hideContextMenu(); };
    document.getElementById('ctx-zoom').onclick   = () => { if (ctxTarget) { selectNode(ctxTarget); zoomToNode(ctxTarget); } hideContextMenu(); };
  }

  function openAddNodeModal(prefill = {}) {
    const modal = document.getElementById('add-node-modal');
    modal.querySelector('#node-form-title').textContent = '+ Add New Entity';
    modal.querySelector('#nf-label').value       = prefill.label || '';
    modal.querySelector('#nf-type').innerHTML    = getTypeOptions(prefill.type || 'startup');
    modal.querySelector('#nf-country').value     = prefill.country || '';
    modal.querySelector('#nf-flag').value        = prefill.flag || '';
    modal.querySelector('#nf-size').value        = prefill.size || 2;
    modal.querySelector('#nf-aum').value         = prefill.aum || '';
    modal.querySelector('#nf-founded').value     = prefill.founded || '';
    modal.querySelector('#nf-desc').value        = prefill.description || '';
    modal.querySelector('#nf-tags').value        = prefill.tags?.join(', ') || '';

    modal.classList.remove('hidden');
    modal.querySelector('#nf-label').focus();

    modal.querySelector('#node-form-cancel').onclick = () => modal.classList.add('hidden');
    modal.querySelector('#node-form-submit').onclick = () => {
      const label = modal.querySelector('#nf-label').value.trim();
      if (!label) { alert('Entity name is required.'); return; }
      addNode({
        label, type: modal.querySelector('#nf-type').value,
        country: modal.querySelector('#nf-country').value.trim(),
        flag:    modal.querySelector('#nf-flag').value.trim(),
        size:    modal.querySelector('#nf-size').value,
        aum:     modal.querySelector('#nf-aum').value.trim(),
        founded: modal.querySelector('#nf-founded').value.trim(),
        description: modal.querySelector('#nf-desc').value.trim(),
        tags:    modal.querySelector('#nf-tags').value
      });
      modal.classList.add('hidden');
    };
    // Close on overlay click
    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
  }

  function openEditNodeModal(node) {
    const modal = document.getElementById('add-node-modal');
    modal.querySelector('#node-form-title').textContent = `✏️ Edit — ${node.label}`;
    modal.querySelector('#nf-label').value   = node.label || '';
    modal.querySelector('#nf-type').innerHTML = getTypeOptions(node.type);
    modal.querySelector('#nf-country').value = node.country || '';
    modal.querySelector('#nf-flag').value    = node.flag || '';
    modal.querySelector('#nf-size').value    = node.size || 2;
    modal.querySelector('#nf-aum').value     = node.aum || '';
    modal.querySelector('#nf-founded').value = node.founded || '';
    modal.querySelector('#nf-desc').value    = node.description || '';
    modal.querySelector('#nf-tags').value    = node.tags?.join(', ') || '';

    modal.classList.remove('hidden');
    modal.querySelector('#node-form-cancel').onclick = () => modal.classList.add('hidden');
    modal.querySelector('#node-form-submit').onclick = () => {
      const label = modal.querySelector('#nf-label').value.trim();
      if (!label) { alert('Entity name is required.'); return; }
      updateNode(node.id, {
        label, type: modal.querySelector('#nf-type').value,
        country: modal.querySelector('#nf-country').value.trim(),
        flag:    modal.querySelector('#nf-flag').value.trim(),
        size:    modal.querySelector('#nf-size').value,
        aum:     modal.querySelector('#nf-aum').value.trim(),
        founded: modal.querySelector('#nf-founded').value.trim(),
        description: modal.querySelector('#nf-desc').value.trim(),
        tags:    modal.querySelector('#nf-tags').value
      });
      modal.classList.add('hidden');
      // Reopen detail with updated data
      const updated = graphData.nodes.find(n => n.id === node.id);
      if (updated) openDetailPanel(updated);
    };
    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
  }

  function openAddConnectionModal(prefillSource = null, prefillTarget = null) {
    const modal = document.getElementById('add-conn-modal');
    modal.querySelector('#conn-source').innerHTML = getNodeOptions(prefillSource?.id || '');
    modal.querySelector('#conn-target').innerHTML = getNodeOptions(prefillTarget?.id || '');
    modal.querySelector('#conn-label').value  = '';
    modal.querySelector('#conn-value').value  = '';
    modal.querySelector('#conn-year').value   = new Date().getFullYear();

    modal.classList.remove('hidden');
    modal.querySelector('#conn-label').focus();

    modal.querySelector('#conn-form-cancel').onclick = () => modal.classList.add('hidden');
    modal.querySelector('#conn-form-submit').onclick = () => {
      const src = modal.querySelector('#conn-source').value;
      const tgt = modal.querySelector('#conn-target').value;
      if (!src || !tgt || src === tgt) { alert('Please select different source and target nodes.'); return; }
      addEdge({
        source: src, target: tgt,
        label:  modal.querySelector('#conn-label').value.trim(),
        value:  modal.querySelector('#conn-value').value.trim(),
        year:   modal.querySelector('#conn-year').value.trim()
      });
      modal.classList.add('hidden');
    };
    modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
  }

  function openConnectModal(source, target) {
    openAddConnectionModal(source, target);
  }

  // ── Export / Import ───────────────────────────────────────────
  function exportJSON() {
    const clean = {
      nodes: graphData.nodes.map(n => { const { x,y,vx,vy,index,fx,fy,...r } = n; return r; }),
      edges: graphData.edges.map(e => ({
        ...e,
        source: typeof e.source === 'object' ? e.source.id : e.source,
        target: typeof e.target === 'object' ? e.target.id : e.target
      }))
    };
    const blob = new Blob([JSON.stringify(clean, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'mara-network.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.nodes || !data.edges) throw new Error('Invalid format');
        const merge = confirm('Merge with existing graph? (Cancel = replace all)');
        if (merge) {
          const existingIds = new Set(graphData.nodes.map(n => n.id));
          data.nodes.forEach(n => { if (!existingIds.has(n.id)) graphData.nodes.push(n); });
          const existingEdgeIds = new Set(graphData.edges.map(e => e.id));
          data.edges.forEach(e => { if (!existingEdgeIds.has(e.id)) graphData.edges.push(e); });
        } else {
          graphData = data;
        }
        saveData();
        renderGraph();
        updateStats();
      } catch(err) { alert('Invalid JSON file: ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ── Window Resize ────────────────────────────────────────────
  function setupWindowResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const container = document.getElementById('network-canvas');
        if (!container) return;
        W = container.clientWidth;
        H = container.clientHeight;
        svgEl.attr('width', W).attr('height', H);
        svgEl.select('rect').attr('width', W).attr('height', H);
      }, 200);
    });
  }

  return {
    init,
    getGraphData: () => graphData,
    addNode,
    deleteNode,
    updateNode,
    addEdge,
    deleteEdge
  };
})();
