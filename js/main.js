/* Matrix rain */
(function initMatrix() {
  const canvas = document.getElementById('rain');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, cols, drops;
  const chars = 'アイウエオカキクケコサシスセソ01アイウエオ';

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.floor(w / 16);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#00ff66';
    ctx.font = '14px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 16, drops[i] * 16);
      if (drops[i] * 16 > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();

/* Render projects from JSON */
async function loadProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Failed to load projects');
    const projects = await res.json();

    if (!projects.length) {
      container.innerHTML = '<p class="empty-note">No projects yet.</p>';
      return;
    }

    container.innerHTML = projects.map(p => `
      <article class="proj">
        <div class="proj-top">
          <h3>${escapeHtml(p.title)}</h3>
          ${p.url ? `<a class="link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener">${escapeHtml(p.linkLabel || p.url.replace(/^https?:\/\//, ''))}</a>` : ''}
        </div>
        <p>${escapeHtml(p.description)}</p>
        ${p.stack ? `<div class="stack">${escapeHtml(p.stack)}</div>` : ''}
        ${p.status ? `<div class="status">${escapeHtml(p.status)}</div>` : ''}
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="empty-note">Could not load projects. Check data/projects.json.</p>';
  }
}

/* Render research from JSON */
async function loadResearch() {
  const container = document.getElementById('research-list');
  const emptyNote = document.getElementById('research-empty');
  if (!container) return;

  try {
    const res = await fetch('data/research.json');
    if (!res.ok) throw new Error('Failed to load research');
    const items = await res.json();

    if (!items.length) {
      container.innerHTML = '';
      if (emptyNote) emptyNote.hidden = false;
      return;
    }

    if (emptyNote) emptyNote.hidden = true;
    container.innerHTML = items.map(r => `
      <article class="proj">
        <div class="proj-top">
          <h3>${escapeHtml(r.title)}</h3>
          ${r.url ? `<a class="link" href="${escapeAttr(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.linkLabel || 'view')}</a>` : ''}
        </div>
        <p>${escapeHtml(r.description)}</p>
        ${r.type || r.year ? `<div class="stack">${escapeHtml([r.type, r.year].filter(Boolean).join(' · '))}</div>` : ''}
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '';
    if (emptyNote) {
      emptyNote.hidden = false;
      emptyNote.textContent = 'Could not load research entries. Check data/research.json.';
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, '&#39;');
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadResearch();
});
