/* atlas-fx.js — shared Atlas visual layer
 * Adds: 3D particle constellation background, tile tilt, entrance stagger,
 *       PWA service-worker registration.
 * Self-contained, idempotent — safe to drop into any Atlas page.
 */
(function () {
  if (window.__atlasFx) return;
  window.__atlasFx = true;

  // ─────────────────────── CSS injection ───────────────────────
  const css = `
    #bg-canvas {
      position: fixed; inset: 0; width: 100%; height: 100%;
      z-index: 0; pointer-events: none; opacity: 0.85;
    }
    @keyframes atlasEntry {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .tile, .section-header { animation-fill-mode: forwards; }
    .section-header {
      opacity: 0;
      animation-name: atlasEntry;
      animation-duration: 0.45s;
      animation-timing-function: ease-out;
    }
    .tile {
      opacity: 0;
      animation-name: atlasEntry;
      animation-duration: 0.55s;
      animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
      transform-style: preserve-3d;
      will-change: transform;
    }
    @media (prefers-reduced-motion: reduce) {
      #bg-canvas { display: none; }
      .tile, .section-header { opacity: 1 !important; animation: none !important; }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-atlas-fx', '');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─────────────────────── Canvas element ───────────────────────
  function ensureCanvas() {
    if (document.getElementById('bg-canvas')) return;
    const c = document.createElement('canvas');
    c.id = 'bg-canvas';
    document.body.insertBefore(c, document.body.firstChild);
  }

  // ─────────────────────── Stagger + tilt ───────────────────────
  function applyStaggerAndTilt() {
    let delay = 0.04;
    const STEP = 0.07;
    document.querySelectorAll('.section-header, .tile').forEach((el) => {
      if (el.style.animationDelay) return; // honor inline-set delay (e.g. index.html)
      el.style.animationDelay = delay.toFixed(2) + 's';
      delay += STEP;
    });

    const reduce = matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const MAX_DEG = 5;
    document.querySelectorAll('.tile').forEach((tile) => {
      if (tile.classList.contains('add')) return;
      if (tile._atlasTiltAttached) return;
      tile._atlasTiltAttached = true;
      tile.addEventListener('mousemove', (e) => {
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tile.style.transform = `perspective(700px) rotateY(${x * MAX_DEG}deg) rotateX(${-y * MAX_DEG}deg) translateY(-3px)`;
      });
      tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
    });
  }

  function whenReady(cb, tries) {
    tries = (tries == null) ? 20 : tries;
    if (document.querySelector('.tile, .section-header')) return cb();
    if (tries <= 0) return cb();
    setTimeout(() => whenReady(cb, tries - 1), 50);
  }

  // ─────────────────────── 3D background ───────────────────────
  function startBackground() {
    if (matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || canvas._atlasInited) return;
    canvas._atlasInited = true;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const isMobile = matchMedia('(max-width: 700px)').matches;
    const N = isMobile ? 80 : 140;
    const RANGE_X = 90, RANGE_Y = 60, RANGE_Z = 40;
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * RANGE_X;
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE_Y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE_Z;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.025;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.025;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pg, new THREE.PointsMaterial({
      color: 0x9ca3ff, size: 0.55, transparent: true, opacity: 0.9,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    scene.add(points);

    const LINE_DIST = isMobile ? 11 : 14;
    const MAX_CONN = N * 5;
    const linePos = new Float32Array(MAX_CONN * 2 * 3);
    const lineCol = new Float32Array(MAX_CONN * 2 * 3);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lg.setAttribute('color', new THREE.BufferAttribute(lineCol, 3));
    const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending,
    }));
    scene.add(lines);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener('mousemove', (e) => {
      mouse.tx = (e.clientX / innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / innerHeight - 0.5) * 2;
    });
    function resize() {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    }
    addEventListener('resize', resize);
    resize();

    let visible = true;
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

    function animate() {
      requestAnimationFrame(animate);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 3;
      camera.position.y = -mouse.y * 2;
      camera.lookAt(0, 0, 0);

      const mWX = mouse.x * 50, mWY = -mouse.y * 28;
      const AR = 18, AF = 0.055;
      const pos = pg.attributes.position.array;
      for (let i = 0; i < N; i++) {
        pos[i * 3]     += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];
        if (Math.abs(pos[i * 3])     > RANGE_X / 2) velocities[i * 3]     *= -1;
        if (Math.abs(pos[i * 3 + 1]) > RANGE_Y / 2) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pos[i * 3 + 2]) > RANGE_Z / 2) velocities[i * 3 + 2] *= -1;
        const dx = mWX - pos[i * 3], dy = mWY - pos[i * 3 + 1];
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < AR && d > 0.5) {
          const k = (1 - d / AR) * AF;
          pos[i * 3]     += (dx / d) * k;
          pos[i * 3 + 1] += (dy / d) * k;
        }
      }
      pg.attributes.position.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (li >= MAX_CONN) break;
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINE_DIST * LINE_DIST) {
            const a = 1 - Math.sqrt(d2) / LINE_DIST;
            linePos[li * 6 + 0] = pos[i * 3];
            linePos[li * 6 + 1] = pos[i * 3 + 1];
            linePos[li * 6 + 2] = pos[i * 3 + 2];
            linePos[li * 6 + 3] = pos[j * 3];
            linePos[li * 6 + 4] = pos[j * 3 + 1];
            linePos[li * 6 + 5] = pos[j * 3 + 2];
            for (let k = 0; k < 2; k++) {
              lineCol[li * 6 + k * 3 + 0] = 0.42 * a;
              lineCol[li * 6 + k * 3 + 1] = 0.72 * a;
              lineCol[li * 6 + k * 3 + 2] = 0.95 * a;
            }
            li++;
          }
        }
      }
      lg.setDrawRange(0, li * 2);
      lg.attributes.position.needsUpdate = true;
      lg.attributes.color.needsUpdate = true;
      points.rotation.z += 0.0003;
      lines.rotation.z = points.rotation.z;
      renderer.render(scene, camera);
    }
    animate();
  }

  function loadThreeAndStart() {
    if (typeof THREE !== 'undefined') return startBackground();
    if (document.querySelector('script[data-atlas-three]')) return; // already loading
    const s = document.createElement('script');
    s.dataset.atlasThree = '';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = startBackground;
    s.onerror = () => console.warn('atlas-fx: Three.js failed to load — background skipped');
    document.head.appendChild(s);
  }

  // ─────────────────────── PWA service worker ───────────────────────
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') return;
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // ─────────────────────── Boot ───────────────────────
  function boot() {
    ensureCanvas();
    whenReady(applyStaggerAndTilt);
    loadThreeAndStart();
    registerSW();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
