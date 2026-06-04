/* Atlas guided tour — drop-in.
 * A page opts in by defining window.atlasTourSteps before loading this file:
 *   window.atlasTourId = 'home';
 *   window.atlasTourSteps = [{title, body, sel?}, ...];   // sel omitted = centered
 * This injects its own CSS, adds a floating "Tour" button, and runs the steps
 * (spotlight + tooltip, Back/Next/Skip, dots). Self-contained, reduced-motion safe.
 */
(function () {
  function init() {
    var STEPS = window.atlasTourSteps;
    if (!STEPS || !STEPS.length) return;
    var TID = window.atlasTourId || location.pathname;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    var css = ''
      + '.at-fab{position:fixed;right:16px;bottom:16px;z-index:9990;font-family:inherit;font-size:13px;font-weight:600;'
      + 'color:#0a0a14;background:#b8c0ff;border:0;border-radius:999px;padding:11px 17px;cursor:pointer;'
      + 'box-shadow:0 6px 22px rgba(0,0,0,0.4);transition:transform .15s,filter .15s;}'
      + '.at-fab:hover{transform:translateY(-2px);filter:brightness(1.06);}'
      + '.at-ov{position:fixed;inset:0;z-index:9995;display:none;}'
      + '.at-ov.dim{background:rgba(8,8,16,0.8);}'
      + '.at-spot{position:fixed;border-radius:14px;border:2px solid #b8c0ff;box-shadow:0 0 0 9999px rgba(8,8,16,0.8),0 0 22px rgba(184,192,255,0.5);'
      + 'pointer-events:none;opacity:0;transition:all .26s cubic-bezier(0.22,1,0.36,1);}'
      + '.at-card{position:fixed;z-index:9997;max-width:320px;width:calc(100vw - 32px);background:#13132a;border:1px solid rgba(184,192,255,0.4);'
      + 'border-radius:16px;padding:18px 18px 14px;box-shadow:0 18px 50px rgba(0,0,0,0.55);color:#f1efe6;font-family:inherit;}'
      + '.at-card .t{font-size:16px;font-weight:700;margin-bottom:7px;line-height:1.25;}'
      + '.at-card .b{font-size:13.5px;line-height:1.5;color:#cfcce0;}'
      + '.at-card .b b{color:#f3d59a;}'
      + '.at-card .nav{display:flex;align-items:center;justify-content:space-between;margin-top:15px;gap:10px;}'
      + '.at-card .dots{display:flex;gap:5px;}'
      + '.at-card .dots .d{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.22);}'
      + '.at-card .dots .d.on{background:#b8c0ff;}'
      + '.at-card .btns{display:flex;gap:7px;}'
      + '.at-card button{font-family:inherit;font-size:13px;font-weight:600;border-radius:9px;padding:8px 14px;cursor:pointer;border:1px solid rgba(255,255,255,0.18);background:transparent;color:#cfcce0;}'
      + '.at-card .nx{background:#b8c0ff;color:#0a0a14;border-color:#b8c0ff;}'
      + '.at-card .skip{position:absolute;top:12px;right:14px;font-size:11px;color:#8a8aa8;background:none;border:0;cursor:pointer;padding:2px;}'
      + '@media(prefers-reduced-motion:reduce){.at-spot{transition:none;}.at-fab{transition:none;}}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var fab = document.createElement('button');
    fab.className = 'at-fab'; fab.type = 'button';
    fab.innerHTML = '? Tour'; fab.setAttribute('aria-label', 'Take a guided tour');
    fab.addEventListener('click', start);
    document.body.appendChild(fab);

    var idx = 0, ov, spot, card;
    function build() {
      ov = document.createElement('div'); ov.className = 'at-ov';
      spot = document.createElement('div'); spot.className = 'at-spot';
      card = document.createElement('div'); card.className = 'at-card';
      ov.appendChild(spot); ov.appendChild(card); document.body.appendChild(ov);
    }
    function onKey(e) { if (e.key === 'Escape') end(); else if (e.key === 'ArrowRight') next(); else if (e.key === 'ArrowLeft') prev(); }
    function start() { idx = 0; if (!ov) build(); ov.style.display = 'block'; fab.style.display = 'none'; document.addEventListener('keydown', onKey); show(); }
    function end() { if (ov) ov.style.display = 'none'; fab.style.display = ''; document.removeEventListener('keydown', onKey); try { localStorage.setItem('atlas.tour.' + TID, '1'); } catch (e) {} }
    function next() { if (idx < STEPS.length - 1) { idx++; show(); } else end(); }
    function prev() { if (idx > 0) { idx--; show(); } }

    function renderCard() {
      var s = STEPS[idx];
      var dots = STEPS.map(function (_, i) { return '<span class="d' + (i === idx ? ' on' : '') + '"></span>'; }).join('');
      card.innerHTML = '<div class="t">' + s.title + '</div><div class="b">' + s.body + '</div>'
        + '<div class="nav"><div class="dots">' + dots + '</div><div class="btns">'
        + (idx > 0 ? '<button class="bk" type="button">Back</button>' : '')
        + '<button class="nx" type="button">' + (idx === STEPS.length - 1 ? 'Done' : 'Next') + '</button></div></div>'
        + '<button class="skip" type="button">Skip</button>';
      card.querySelector('.nx').addEventListener('click', next);
      var bk = card.querySelector('.bk'); if (bk) bk.addEventListener('click', prev);
      card.querySelector('.skip').addEventListener('click', end);
    }
    function placeCard(rect) {
      var cw = card.offsetWidth, ch = card.offsetHeight;
      if (!rect) { card.style.left = '50%'; card.style.top = '50%'; card.style.transform = 'translate(-50%,-50%)'; return; }
      card.style.transform = 'none';
      var top = rect.bottom + 14;
      if (top + ch > innerHeight - 10) top = Math.max(10, rect.top - ch - 14);
      var left = Math.min(Math.max(10, rect.left), innerWidth - cw - 10);
      card.style.left = left + 'px'; card.style.top = top + 'px';
    }
    function show() {
      var s = STEPS[idx];
      var el = s.sel ? document.querySelector(s.sel) : null;
      renderCard();
      if (el) {
        ov.classList.remove('dim');
        el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        setTimeout(function () {
          var r = el.getBoundingClientRect(), p = 8;
          spot.style.opacity = '1';
          spot.style.left = (r.left - p) + 'px'; spot.style.top = (r.top - p) + 'px';
          spot.style.width = (r.width + p * 2) + 'px'; spot.style.height = (r.height + p * 2) + 'px';
          placeCard(r);
        }, reduce ? 0 : 280);
      } else {
        spot.style.opacity = '0'; ov.classList.add('dim'); placeCard(null);
      }
    }
    window.startAtlasTour = start;
    if (window.atlasTourAuto) { try { if (!localStorage.getItem('atlas.tour.' + TID)) setTimeout(start, 1000); } catch (e) {} }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
