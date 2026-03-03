'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── SPA nav ────────────────────────────── */
  const pages    = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item[data-p]');
  const tbTitle  = document.getElementById('tb-title');
  const tbCrumb  = document.getElementById('tb-crumb');

  const meta = {
    home:           ['Home',            'Portfolio / Home'],
    about:          ['About Me',        'Portfolio / About'],
    skills:         ['Skills',          'Portfolio / Skills'],
    internships:    ['Internships',     'Portfolio / Internships'],
    projects:       ['Projects',        'Portfolio / Projects'],
    education:      ['Education',       'Portfolio / Education'],
    certifications: ['Certifications',  'Portfolio / Certifications'],
    contact:        ['Contact',         'Portfolio / Contact'],
  };

  function gotoPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const pg  = document.getElementById('pg-' + id);
    const nav = document.querySelector(`.nav-item[data-p="${id}"]`);
    if (pg)  { pg.classList.add('active'); doReveal(pg); }
    if (nav) nav.classList.add('active');
    if (meta[id]) {
      tbTitle.textContent = meta[id][0];
      tbCrumb.textContent = meta[id][1];
    }
    if (id === 'skills')  triggerSkills();
    if (id === 'home')    triggerCounters();
    document.querySelector('.main').scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('.sidebar').classList.remove('open');
  }

  navItems.forEach(n => n.addEventListener('click', () => gotoPage(n.dataset.p)));
  document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => gotoPage(b.dataset.goto)));

  gotoPage('home');

  /* ── Mobile sidebar ─────────────────────── */
  const mob = document.querySelector('.mob-btn');
  const sb  = document.querySelector('.sidebar');
  mob?.addEventListener('click', () => sb.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!sb.contains(e.target) && e.target !== mob) sb.classList.remove('open');
  });

  /* ── Reveal animation ───────────────────── */
  function doReveal(parent) {
    parent.querySelectorAll('.rv').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.055}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('in'));
      });
    });
  }

  /* ── Skill bars ─────────────────────────── */
  let skillsDone = false;
  function triggerSkills() {
    if (skillsDone) return; skillsDone = true;
    document.querySelectorAll('.skill-fill').forEach((f, i) => setTimeout(() => f.classList.add('go'), i * 55));
  }

  /* ── Counters ───────────────────────────── */
  let cntDone = false;
  function triggerCounters() {
    if (cntDone) return; cntDone = true;
    document.querySelectorAll('[data-cnt]').forEach(el => {
      const end = +el.dataset.cnt, suf = el.dataset.suf || '';
      let v = 0, step = Math.max(1, Math.ceil(end / 70));
      const t = setInterval(() => { v = Math.min(v+step, end); el.textContent = v+suf; if(v>=end)clearInterval(t); }, 18);
    });
  }

  /* ── Contact form ───────────────────────── */
  const form = document.querySelector('#cf');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const r = await fetch('/contact/', { method:'POST', body:new FormData(form), headers:{'X-Requested-With':'XMLHttpRequest'} });
      toast(r.ok ? "Message sent! I'll reply within 24 hours ✓" : 'Something went wrong.', r.ok ? 'ok' : 'err');
      if (r.ok) form.reset();
    } catch { toast('Network error. Please email directly.', 'err'); }
    finally { btn.textContent = orig; btn.disabled = false; }
  });

  /* ── Toast ──────────────────────────────── */
  function toast(msg, type) {
    const t = document.createElement('div');
    const ok = type === 'ok';
    Object.assign(t.style, {
      position:'fixed', bottom:'24px', right:'24px', zIndex:'9999',
      padding:'13px 20px', borderRadius:'12px',
      background: ok ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)',
      border: `1px solid ${ok ? 'rgba(5,150,105,0.3)' : 'rgba(220,38,38,0.3)'}`,
      color: ok ? '#059669' : '#dc2626',
      fontSize:'.855rem', fontWeight:'600',
      backdropFilter:'blur(16px)',
      boxShadow:'0 6px 28px rgba(0,0,0,0.09)',
      opacity:'0', transform:'translateY(14px)',
      transition:'all .35s cubic-bezier(.4,0,.2,1)',
    });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity='1'; t.style.transform='translateY(0)'; });
    setTimeout(() => { t.style.opacity='0'; t.style.transform='translateY(14px)'; setTimeout(()=>t.remove(), 360); }, 4000);
  }

  /* ── Cert modal ─────────────────────────── */
  document.querySelectorAll('.cert-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src  = btn.dataset.src;
      const type = btn.dataset.type; // 'image' or 'pdf'
      const name = btn.dataset.name;
      openModal(src, type, name);
    });
  });

  function openModal(src, type, name) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:1000;
      background:rgba(30,27,75,0.7);backdrop-filter:blur(8px);
      display:flex;align-items:center;justify-content:center;padding:20px;
      animation:fadeIn .25s ease;
    `;
    const box = document.createElement('div');
    box.style.cssText = `
      background:white;border-radius:20px;max-width:820px;width:100%;
      max-height:90vh;overflow:hidden;display:flex;flex-direction:column;
      box-shadow:0 30px 80px rgba(0,0,0,0.3);
    `;
    const header = document.createElement('div');
    header.style.cssText = 'padding:18px 24px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;';
    header.innerHTML = `<span style="font-family:var(--font-h);font-weight:700;color:#1e1b4b;font-size:1rem">${name}</span>
      <button onclick="this.closest('[style]').remove()" style="background:#f3f4f6;border:none;width:32px;height:32px;border-radius:8px;font-size:1.1rem;cursor:pointer">✕</button>`;

    const body = document.createElement('div');
    body.style.cssText = 'flex:1;overflow:auto;padding:20px;display:flex;align-items:center;justify-content:center;';

    if (type === 'image') {
      body.innerHTML = `<img src="${src}" style="max-width:100%;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1)"/>`;
    } else if (type === 'pdf') {
      body.innerHTML = `<iframe src="${src}" style="width:100%;height:70vh;border:none;border-radius:10px"></iframe>`;
    } else {
      body.innerHTML = `<p style="color:#6b7280;text-align:center">No preview available.<br><a href="${src}" download style="color:#7c3aed;font-weight:600">Download Certificate</a></p>`;
    }

    const foot = document.createElement('div');
    foot.style.cssText = 'padding:14px 24px;border-top:1px solid #e5e7eb;display:flex;gap:10px;justify-content:flex-end;';
    foot.innerHTML = `<a href="${src}" download style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#4338ca);color:white;font-size:.82rem;font-weight:600;text-decoration:none;box-shadow:0 4px 14px rgba(109,40,217,0.3)">⬇ Download</a>`;

    box.append(header, body, foot);
    overlay.appendChild(box);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  /* ── Page load ──────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .4s ease';
  requestAnimationFrame(() => document.body.style.opacity = '1');

});
